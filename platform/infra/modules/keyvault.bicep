// Key Vault (INFRA-6): RBAC mode, soft delete + purge protection, one vault per environment,
// public network access disabled (private endpoint only) unless the owner temporarily allow-lists
// an IP to set secrets (runbooks/azure-bootstrap.md). Each app identity gets "Key Vault Secrets
// User" on this vault only. Secret VALUES are never in Bicep or git (GEN-1); the owner or the
// rotation runbook sets them.

param env string
param location string
param tags object
param peSubnetId string
param privateDnsZoneId string
param workspaceId string

@description('Public IPs/CIDRs allowed through the vault firewall (empty = public network access disabled).')
param allowedIps array

@description('Principal ids that may READ secrets (Key Vault Secrets User).')
param secretReaderPrincipalIds array

var kvName = 'kv-soyl-${env}-${take(uniqueString(resourceGroup().id), 6)}'
var secretsUserRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')

resource kv 'Microsoft.KeyVault/vaults@2024-11-01' = {
  name: kvName
  location: location
  tags: tags
  properties: {
    tenantId: tenant().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    enableRbacAuthorization: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enablePurgeProtection: true
    enabledForDeployment: false
    enabledForTemplateDeployment: false
    enabledForDiskEncryption: false
    publicNetworkAccess: empty(allowedIps) ? 'Disabled' : 'Enabled'
    networkAcls: {
      defaultAction: 'Deny'
      bypass: 'None'
      ipRules: [
        for ip in allowedIps: {
          value: ip
        }
      ]
      virtualNetworkRules: []
    }
  }
}

resource readers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in secretReaderPrincipalIds: {
    name: guid(kv.id, p, secretsUserRoleId)
    scope: kv
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: secretsUserRoleId
    }
  }
]

module pe 'privateEndpoint.bicep' = {
  name: 'pe-kv-${env}'
  params: {
    name: 'pe-${kvName}'
    location: location
    tags: tags
    subnetId: peSubnetId
    targetResourceId: kv.id
    groupId: 'vault'
    privateDnsZoneId: privateDnsZoneId
  }
}

resource diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: kv
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'audit'
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

output name string = kv.name
output id string = kv.id
output uri string = kv.properties.vaultUri
