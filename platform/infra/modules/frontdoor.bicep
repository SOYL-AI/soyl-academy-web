// Azure Front Door Standard in front of the public-assets container ONLY (INFRA-4, threat model 5.7).
// - Front Door authenticates to Blob with its user-assigned managed identity (origin
//   authentication), which has Storage Blob Data Reader on public-assets and nothing else, so
//   the storage account keeps allowBlobPublicAccess=false.
// - originPath pins every route to /public-assets; there is no route to uploads or content-releases.
// - HTTPS only (HTTP redirected), caching + compression for diagrams/audio.
// Front Door is a global service (INFRA-9 exception, docs/platform/adr/012-front-door-standard.md):
// it caches public, non-personal assets at the edge; the origin stays in Central India.

param env string
param tags object
param identityId string
param blobHost string
param workspaceId string

resource profile 'Microsoft.Cdn/profiles@2025-06-01' = {
  name: 'afd-soyl-${env}'
  location: 'global'
  tags: tags
  sku: {
    name: 'Standard_AzureFrontDoor'
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${identityId}': {}
    }
  }
  properties: {
    originResponseTimeoutSeconds: 60
  }
}

resource endpoint 'Microsoft.Cdn/profiles/afdEndpoints@2025-06-01' = {
  parent: profile
  name: 'soyl-assets-${env}'
  location: 'global'
  tags: tags
  properties: {
    enabledState: 'Enabled'
  }
}

resource originGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  parent: profile
  name: 'public-assets'
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
      additionalLatencyInMilliseconds: 50
    }
    // Single origin: health probes are unnecessary (and would be unauthenticated HEADs).
    sessionAffinityState: 'Disabled'
    authentication: {
      type: 'UserAssignedIdentity'
      userAssignedIdentity: {
        id: identityId
      }
      scope: 'https://storage.azure.com/.default'
    }
  }
}

resource origin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: originGroup
  name: 'blob'
  properties: {
    hostName: blobHost
    originHostHeader: blobHost
    httpsPort: 443
    httpPort: 80
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
    enforceCertificateNameCheck: true
  }
}

resource route 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: endpoint
  name: 'public-assets'
  properties: {
    originGroup: {
      id: originGroup.id
    }
    originPath: '/public-assets'
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/*'
    ]
    forwardingProtocol: 'HttpsOnly'
    httpsRedirect: 'Enabled'
    linkToDefaultDomain: 'Enabled'
    enabledState: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'IgnoreQueryString'
      compressionSettings: {
        isCompressionEnabled: true
        contentTypesToCompress: [
          'image/svg+xml'
          'application/json'
          'text/plain'
          'text/css'
          'application/javascript'
        ]
      }
    }
  }
  dependsOn: [
    origin
  ]
}

resource diag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: profile
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
  }
}

output hostName string = endpoint.properties.hostName
output profileId string = profile.id
