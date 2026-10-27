// Azure OpenAI + Azure AI Speech + Azure AI Content Safety (INFRA-5, ADR-008).
// - disableLocalAuth=true on all three: API keys do not work; the api/worker identities call them
//   with Entra tokens (roles assigned below).
// - Private endpoints for all three. Public network access is a parameter: dev = Enabled (still
//   Entra-only) so the content pipeline can run from a developer machine (D-021); stg/prod = Disabled.
// - One region parameter per service, because no single Indian region offers all three (checked
//   2026-10-28 with az cognitiveservices model list and the Microsoft.CognitiveServices skus API):
//   Azure OpenAI (kind OpenAI) and the GPT-6 Luna / GPT-6.1 Sol models exist only in southindia,
//   Content Safety only in southindia, Speech only in centralindia. The private endpoints are created
//   next to the VNet (cross-region private endpoints are supported).
// - Azure OpenAI deployments (ADR-008): one entry per tier - small (GPT-6 Luna), mid (GPT-6.1 Sol;
//   the verify pass reuses it, D-033), embedding (text-embedding-3-small) - plus optional
//   small-batch / mid-batch entries for a GlobalBatch deployment. The deployment type decides where
//   prompts are PROCESSED (GlobalStandard: any Azure region); data at rest stays in the account's region.
// - Default content filters stay on (raiPolicyName Microsoft.DefaultV2).

param env string
@description('Region of the Azure OpenAI account (ADR-008: an Indian region).')
param openAiLocation string
@description('Region of the Speech account (ADR-008: an Indian region).')
param speechLocation string
@description('Region of the Content Safety account (ADR-008: an Indian region).')
param contentSafetyLocation string
@description('Region of the VNet (private endpoints live next to the VNet).')
param vnetLocation string
param tags object
param peSubnetId string
param openAiZoneId string
param cognitiveZoneId string
param workspaceId string

@allowed([
  'Enabled'
  'Disabled'
])
param publicNetworkAccess string

@description('Public IPs allowed when publicNetworkAccess is Disabled (e.g. the operator running the content pipeline; Entra auth still required). Empty = private endpoints only.')
param allowedIps array

@description('Create the model deployments. false until OA-02 confirms model names, versions and quota.')
param deployModels bool

@description('Model deployments: [{ tier, name, model, version, skuName, capacity }]. tier: small | mid | verify | embedding | small-batch | mid-batch; skuName per ADR-008 (GlobalStandard, DataZoneStandard, Standard, GlobalBatch); capacity in thousands of tokens per minute.')
param deployments array

@description('Principals allowed to call Azure OpenAI (Cognitive Services OpenAI User).')
param openAiUserPrincipalIds array

@description('Principals allowed to call Speech and Content Safety (Cognitive Services User / Speech User).')
param cognitiveUserPrincipalIds array

var suffix = take(uniqueString(resourceGroup().id), 6)
var aoaiName = 'oai-soyl-${env}-${suffix}'
var speechName = 'spch-soyl-${env}-${suffix}'
var safetyName = 'cs-soyl-${env}-${suffix}'
var roles = {
  openAiUser: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '5e0bd9bd-7b93-4f28-af87-19fc36ad61bd')
  cognitiveUser: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'a97b65f3-24c7-4388-baec-2e87135dc908')
  speechUser: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'f2dc8367-1007-4938-bd23-fe263f013447')
}
var effectivePublicAccess = (publicNetworkAccess == 'Enabled' || !empty(allowedIps)) ? 'Enabled' : 'Disabled'
var networkAcls = {
  defaultAction: publicNetworkAccess == 'Enabled' ? 'Allow' : 'Deny'
  ipRules: map(allowedIps, ip => { value: ip })
  virtualNetworkRules: []
}

resource aoai 'Microsoft.CognitiveServices/accounts@2025-06-01' = {
  name: aoaiName
  location: openAiLocation
  tags: tags
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: aoaiName
    disableLocalAuth: true
    publicNetworkAccess: effectivePublicAccess
    networkAcls: networkAcls
  }
}

@batchSize(1)
resource modelDeployments 'Microsoft.CognitiveServices/accounts/deployments@2025-06-01' = [
  for d in (deployModels ? deployments : []): {
    parent: aoai
    name: d.name
    sku: {
      name: d.skuName
      capacity: d.capacity
    }
    properties: {
      model: {
        format: 'OpenAI'
        name: d.model
        version: d.version
      }
      raiPolicyName: 'Microsoft.DefaultV2'
      versionUpgradeOption: 'NoAutoUpgrade'
    }
  }
]

resource speech 'Microsoft.CognitiveServices/accounts@2025-06-01' = {
  name: speechName
  location: speechLocation
  tags: tags
  kind: 'SpeechServices'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: speechName
    disableLocalAuth: true
    publicNetworkAccess: effectivePublicAccess
    networkAcls: networkAcls
  }
}

resource safety 'Microsoft.CognitiveServices/accounts@2025-06-01' = {
  name: safetyName
  location: contentSafetyLocation
  tags: tags
  kind: 'ContentSafety'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: safetyName
    disableLocalAuth: true
    publicNetworkAccess: effectivePublicAccess
    networkAcls: networkAcls
  }
}

resource aoaiUsers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in openAiUserPrincipalIds: {
    name: guid(aoai.id, p, roles.openAiUser)
    scope: aoai
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: roles.openAiUser
    }
  }
]

resource speechUsers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in cognitiveUserPrincipalIds: {
    name: guid(speech.id, p, roles.speechUser)
    scope: speech
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: roles.speechUser
    }
  }
]

resource safetyUsers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in cognitiveUserPrincipalIds: {
    name: guid(safety.id, p, roles.cognitiveUser)
    scope: safety
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: roles.cognitiveUser
    }
  }
]

module peAoai 'privateEndpoint.bicep' = {
  name: 'pe-aoai-${env}'
  params: {
    name: 'pe-${aoaiName}'
    location: vnetLocation
    tags: tags
    subnetId: peSubnetId
    targetResourceId: aoai.id
    groupId: 'account'
    privateDnsZoneId: openAiZoneId
  }
  dependsOn: [
    modelDeployments
  ]
}

module peSpeech 'privateEndpoint.bicep' = {
  name: 'pe-speech-${env}'
  params: {
    name: 'pe-${speechName}'
    location: vnetLocation
    tags: tags
    subnetId: peSubnetId
    targetResourceId: speech.id
    groupId: 'account'
    privateDnsZoneId: cognitiveZoneId
  }
}

module peSafety 'privateEndpoint.bicep' = {
  name: 'pe-safety-${env}'
  params: {
    name: 'pe-${safetyName}'
    location: vnetLocation
    tags: tags
    subnetId: peSubnetId
    targetResourceId: safety.id
    groupId: 'account'
    privateDnsZoneId: cognitiveZoneId
  }
  dependsOn: [
    peSpeech
  ]
}

resource diagAoai 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: aoai
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

resource diagSpeech 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: speech
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'audit'
        enabled: true
      }
    ]
  }
}

resource diagSafety 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: safety
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'audit'
        enabled: true
      }
    ]
  }
}

output openAiId string = aoai.id
output openAiEndpoint string = aoai.properties.endpoint
output speechId string = speech.id
output speechEndpoint string = speech.properties.endpoint
output contentSafetyEndpoint string = safety.properties.endpoint
output openAiLocation string = openAiLocation
@description('Speech region (AZURE_SPEECH_REGION).')
output speechRegion string = speechLocation
output contentSafetyLocation string = contentSafetyLocation
