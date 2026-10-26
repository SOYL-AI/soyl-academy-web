// PostgreSQL Flexible Server 17 + pgvector (ARCHITECTURE section 6, 13).
// INFRA-1: public network access disabled in EVERY environment (dev included: migrations run as a
//          Container Apps job inside the VNet, so nobody needs to reach it from the internet);
//          private endpoint + private DNS; TLS required (require_secure_transport=on, TLS >= 1.2).
// INFRA-2: Entra-only authentication (password auth disabled, so there is no password to leak or
//          rotate). The migrator managed identity is the Entra administrator; it creates the Entra
//          principals for the api/worker identities and the soyl_migrator / soyl_app roles
//          (platform/db/README.md "Roles", DB-1) on every migration run (docker/migrate-entrypoint.sh).
// PITR: backupRetentionDays (prod 14). HA: zone-redundant in prod.

param env string
param location string
param tags object
param peSubnetId string
param privateDnsZoneId string
param workspaceId string

param skuName string

@allowed([
  'Burstable'
  'GeneralPurpose'
  'MemoryOptimized'
])
param tier string

@minValue(32)
param storageSizeGB int

@allowed([
  'Disabled'
  'ZoneRedundant'
  'SameZone'
])
param haMode string

@minValue(7)
@maxValue(35)
param backupRetentionDays int

@allowed([
  'Enabled'
  'Disabled'
])
param geoRedundantBackup string

@description('Entra administrator: the migrator managed identity.')
param adminPrincipalId string
param adminPrincipalName string

@description('Optional extra Entra administrator group for break-glass access (object id + display name). Empty = none. Never committed: passed from a CI variable.')
param ownerAdminGroupObjectId string
param ownerAdminGroupName string

@description('Application database name.')
param databaseName string

var serverName = 'psql-soyl-${env}-${take(uniqueString(resourceGroup().id), 6)}'

// Applied one at a time: concurrent configuration updates on one server conflict.
var serverParameters = [
  {
    // pgvector for tutor retrieval (ARCHITECTURE section 6) + the helpers the schema uses.
    name: 'azure.extensions'
    value: 'VECTOR,PGCRYPTO,CITEXT,PG_TRGM,UUID-OSSP,BTREE_GIN'
  }
  {
    name: 'require_secure_transport'
    value: 'on'
  }
  {
    name: 'ssl_min_protocol_version'
    value: 'TLSv1.2'
  }
  {
    // GEN-6: store and log in UTC.
    name: 'timezone'
    value: 'UTC'
  }
  {
    // Security-relevant DB logs (INFRA-11) for authentication events.
    name: 'log_connections'
    value: 'on'
  }
  {
    name: 'log_disconnections'
    value: 'on'
  }
]

resource pg 'Microsoft.DBforPostgreSQL/flexibleServers@2025-08-01' = {
  name: serverName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: tier
  }
  properties: {
    version: '17'
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Disabled'
      tenantId: tenant().tenantId
    }
    storage: {
      storageSizeGB: storageSizeGB
      autoGrow: 'Enabled'
    }
    backup: {
      backupRetentionDays: backupRetentionDays
      geoRedundantBackup: geoRedundantBackup
    }
    highAvailability: {
      mode: haMode
    }
    network: {
      publicNetworkAccess: 'Disabled'
    }
  }
}

@batchSize(1)
resource config 'Microsoft.DBforPostgreSQL/flexibleServers/configurations@2025-08-01' = [
  for p in serverParameters: {
    parent: pg
    name: p.name
    properties: {
      value: p.value
      source: 'user-override'
    }
  }
]

resource db 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2025-08-01' = {
  parent: pg
  name: databaseName
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
  dependsOn: [
    config
  ]
}

resource admin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2025-08-01' = {
  parent: pg
  name: adminPrincipalId
  properties: {
    principalType: 'ServicePrincipal'
    principalName: adminPrincipalName
    tenantId: tenant().tenantId
  }
  dependsOn: [
    db
  ]
}

resource ownerAdmin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2025-08-01' = if (!empty(ownerAdminGroupObjectId)) {
  parent: pg
  name: empty(ownerAdminGroupObjectId) ? 'none' : ownerAdminGroupObjectId
  properties: {
    principalType: 'Group'
    principalName: ownerAdminGroupName
    tenantId: tenant().tenantId
  }
  dependsOn: [
    admin
  ]
}

module pe 'privateEndpoint.bicep' = {
  name: 'pe-pg-${env}'
  params: {
    name: 'pe-${serverName}'
    location: location
    tags: tags
    subnetId: peSubnetId
    targetResourceId: pg.id
    groupId: 'postgresqlServer'
    privateDnsZoneId: privateDnsZoneId
  }
  dependsOn: [
    ownerAdmin
  ]
}

resource diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: pg
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
  }
}

output id string = pg.id
output name string = pg.name
output host string = pg.properties.fullyQualifiedDomainName
output databaseName string = db.name
