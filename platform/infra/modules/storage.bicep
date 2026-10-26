// Blob storage (INFRA-4).
// - allowBlobPublicAccess=false, allowSharedKeyAccess=false (no account keys, so no account-key SAS;
//   only Entra auth and user-delegation SAS), TLS 1.2 minimum, HTTPS only, blob + container soft delete 7 days.
// - Containers: uploads-quarantine, uploads (lifecycle: deleted after 30 days), content-releases
//   (private: releases contain answers, F-006), public-assets (the ONLY container Front Door reads).
// - Public network access stays enabled because (a) browsers upload directly with a short-lived,
//   write-only user-delegation SAS (D-018, F-013) and (b) Front Door Standard has no Private Link
//   origin support. Every request is still authenticated (no anonymous access, no shared key).
//   The apps reach Blob through the private endpoint.

param env string
param location string
param tags object
param peSubnetId string
param privateDnsZoneId string
param workspaceId string

@allowed([
  'Standard_LRS'
  'Standard_ZRS'
  'Standard_GZRS'
])
param skuName string

@description('Days after creation when uploads (and quarantined uploads) are deleted. INFRA-4 / ARCHITECTURE section 15: 30.')
@minValue(1)
@maxValue(30)
param uploadRetentionDays int

@description('Origins allowed to PUT uploads directly with a user-delegation SAS (D-018), e.g. https://www.soylai.com.')
param uploadCorsOrigins array

@description('Principal ids per access need.')
param apiPrincipalId string
param workerPrincipalId string
param frontDoorPrincipalId string

var saName = 'stsoyl${env}${take(uniqueString(resourceGroup().id), 8)}'
var roles = {
  blobDataReader: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '2a2b9908-6ea1-4ae2-8e65-a410df84e7d1')
  blobDataContributor: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'ba92f5b4-2d11-453d-a403-e96b0029c9fe')
  blobDelegator: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'db58b8e5-c6ad-4a2a-8342-4190687cbf4a')
}

resource sa 'Microsoft.Storage/storageAccounts@2025-01-01' = {
  name: saName
  location: location
  tags: tags
  kind: 'StorageV2'
  sku: {
    name: skuName
  }
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    defaultToOAuthAuthentication: true
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    publicNetworkAccess: 'Enabled'
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
    encryption: {
      keySource: 'Microsoft.Storage'
      requireInfrastructureEncryption: true
      services: {
        blob: {
          enabled: true
          keyType: 'Account'
        }
      }
    }
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2025-01-01' = {
  parent: sa
  name: 'default'
  properties: {
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    cors: {
      corsRules: empty(uploadCorsOrigins)
        ? []
        : [
            {
              allowedOrigins: uploadCorsOrigins
              allowedMethods: [
                'PUT'
                'OPTIONS'
              ]
              allowedHeaders: [
                'content-type'
                'x-ms-blob-type'
                'x-ms-version'
                'x-ms-date'
                'x-ms-client-request-id'
              ]
              exposedHeaders: [
                'x-ms-request-id'
              ]
              maxAgeInSeconds: 600
            }
          ]
    }
  }
}

resource cQuarantine 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: 'uploads-quarantine'
  properties: {
    publicAccess: 'None'
  }
}

resource cUploads 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: 'uploads'
  properties: {
    publicAccess: 'None'
  }
}

resource cReleases 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: 'content-releases'
  properties: {
    publicAccess: 'None'
  }
}

resource cPublic 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: 'public-assets'
  properties: {
    // Still 'None': Front Door reads it with its managed identity (modules/frontdoor.bicep).
    publicAccess: 'None'
  }
}

resource lifecycle 'Microsoft.Storage/storageAccounts/managementPolicies@2025-01-01' = {
  parent: sa
  name: 'default'
  properties: {
    policy: {
      rules: [
        {
          name: 'expire-uploads'
          enabled: true
          type: 'Lifecycle'
          definition: {
            filters: {
              blobTypes: [
                'blockBlob'
              ]
              prefixMatch: [
                'uploads/'
                'uploads-quarantine/'
              ]
            }
            actions: {
              baseBlob: {
                delete: {
                  daysAfterCreationGreaterThan: uploadRetentionDays
                }
              }
            }
          }
        }
      ]
    }
  }
}

// --- RBAC (least privilege, container scope where possible) ---
// API: issue user-delegation SAS for direct uploads (Delegator, account scope), write quarantine, read uploads/releases.
resource apiDelegator 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(sa.id, apiPrincipalId, roles.blobDelegator)
  scope: sa
  properties: {
    principalId: apiPrincipalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: roles.blobDelegator
  }
}

resource apiQuarantine 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(cQuarantine.id, apiPrincipalId, roles.blobDataContributor)
  scope: cQuarantine
  properties: {
    principalId: apiPrincipalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: roles.blobDataContributor
  }
}

resource apiUploads 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(cUploads.id, apiPrincipalId, roles.blobDataReader)
  scope: cUploads
  properties: {
    principalId: apiPrincipalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: roles.blobDataReader
  }
}

resource apiReleases 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(cReleases.id, apiPrincipalId, roles.blobDataReader)
  scope: cReleases
  properties: {
    principalId: apiPrincipalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: roles.blobDataReader
  }
}

// Worker: scans/moves uploads, publishes releases and public assets (pipeline stage 9, TTS).
var workerContainerNames = [
  'uploads-quarantine'
  'uploads'
  'content-releases'
  'public-assets'
]

resource workerScopes 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' existing = [
  for c in workerContainerNames: {
    parent: blobService
    name: c
  }
]

resource workerContainers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for (c, i) in workerContainerNames: {
    name: guid(sa.id, c, workerPrincipalId, roles.blobDataContributor)
    scope: workerScopes[i]
    properties: {
      principalId: workerPrincipalId
      principalType: 'ServicePrincipal'
      roleDefinitionId: roles.blobDataContributor
    }
    dependsOn: [
      cQuarantine
      cUploads
      cReleases
      cPublic
    ]
  }
]

// Front Door: read public-assets only (INFRA-4: the only container behind the CDN).
resource fdPublic 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(cPublic.id, frontDoorPrincipalId, roles.blobDataReader)
  scope: cPublic
  properties: {
    principalId: frontDoorPrincipalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: roles.blobDataReader
  }
}

module pe 'privateEndpoint.bicep' = {
  name: 'pe-blob-${env}'
  params: {
    name: 'pe-${saName}-blob'
    location: location
    tags: tags
    subnetId: peSubnetId
    targetResourceId: sa.id
    groupId: 'blob'
    privateDnsZoneId: privateDnsZoneId
  }
}

resource diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: blobService
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
        category: 'Transaction'
        enabled: true
      }
    ]
  }
}

output name string = sa.name
output id string = sa.id
output blobEndpoint string = sa.properties.primaryEndpoints.blob
output blobHost string = '${sa.name}.blob.${environment().suffixes.storage}'
