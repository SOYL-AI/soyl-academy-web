// Azure Managed Redis (Microsoft.Cache/redisEnterprise) - INFRA-3.
// - Private: publicNetworkAccess Disabled + private endpoint + privatelink.redis.azure.net.
// - TLS only (clientProtocol Encrypted, TLS 1.2 minimum).
// - Keyless: accessKeysAuthentication Disabled; the api/worker managed identities get the
//   "default" data access policy (Entra token as the password, username = identity object id).
// - evictionPolicy NoEviction: credit reservations and rate-limit counters must never be evicted
//   silently (AC-07). Clustering policy EnterpriseCluster keeps a single-endpoint view for
//   non-cluster-aware clients; multi-key Lua scripts must still use one hash tag (README).
// Tier choice: docs/platform/adr/011-redis-tier.md.

param env string
param location string
param tags object
param peSubnetId string
param privateDnsZoneId string
param workspaceId string

@description('Azure Managed Redis SKU, e.g. Balanced_B0 (dev), Balanced_B1 (stg), Balanced_B3 (prod).')
param skuName string

param highAvailability bool

@description('AOF persistence (prod): survive a node restart without losing reservations.')
param aofPersistence bool

@description('Principal ids of identities that get the "default" data access policy.')
param dataPrincipals array

var redisName = 'redis-soyl-${env}-${take(uniqueString(resourceGroup().id), 6)}'

resource redis 'Microsoft.Cache/redisEnterprise@2025-07-01' = {
  name: redisName
  location: location
  tags: tags
  sku: {
    name: skuName
  }
  properties: {
    minimumTlsVersion: '1.2'
    highAvailability: highAvailability ? 'Enabled' : 'Disabled'
    publicNetworkAccess: 'Disabled'
  }
}

resource db 'Microsoft.Cache/redisEnterprise/databases@2025-07-01' = {
  parent: redis
  name: 'default'
  properties: {
    clientProtocol: 'Encrypted'
    port: 10000
    clusteringPolicy: 'EnterpriseCluster'
    evictionPolicy: 'NoEviction'
    accessKeysAuthentication: 'Disabled'
    persistence: aofPersistence
      ? {
          aofEnabled: true
          aofFrequency: '1s'
        }
      : {
          aofEnabled: false
          rdbEnabled: false
        }
  }
}

@batchSize(1)
resource access 'Microsoft.Cache/redisEnterprise/databases/accessPolicyAssignments@2025-07-01' = [
  for (p, i) in dataPrincipals: {
    parent: db
    name: 'app${i}'
    properties: {
      accessPolicyName: 'default'
      user: {
        objectId: p
      }
    }
  }
]

module pe 'privateEndpoint.bicep' = {
  name: 'pe-redis-${env}'
  params: {
    name: 'pe-${redisName}'
    location: location
    tags: tags
    subnetId: peSubnetId
    targetResourceId: redis.id
    groupId: 'redisEnterprise'
    privateDnsZoneId: privateDnsZoneId
  }
  dependsOn: [
    db
  ]
}

resource diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: redis
  properties: {
    workspaceId: workspaceId
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
  }
}

output id string = redis.id
output host string = redis.properties.hostName
output port int = db.properties.port
