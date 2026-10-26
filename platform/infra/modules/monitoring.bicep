// Log Analytics + workspace-based Application Insights + the environment's action group.
// INFRA-9: workspace in Central India. INFRA-11: retention >= 180 days for security-relevant logs
// (CERT-In ICT-log direction); App Insights is keyless (DisableLocalAuth) so telemetry is sent with
// the apps' managed identities (role "Monitoring Metrics Publisher", assigned in main.bicep).

@description('Short environment name: dev | stg | prod.')
param env string

@description('Region for the workspace (INFRA-9: centralindia).')
param location string

param tags object

@description('Workspace retention in days. INFRA-11 requires >= 180.')
@minValue(180)
@maxValue(730)
param retentionInDays int

@description('Daily ingestion cap in GB; -1 = no cap. Dev/stg are capped to protect the budget; prod is not capped so security logs are never dropped.')
param dailyCapGb int

@description('Alert e-mail address (empty = only subscription Owners are notified through the ARM role receiver).')
param alertEmail string

@description('Identities that send telemetry (Monitoring Metrics Publisher on App Insights; keyless ingestion).')
param publisherPrincipalIds array

resource law 'Microsoft.OperationalInsights/workspaces@2025-02-01' = {
  name: 'log-soyl-${env}'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: retentionInDays
    workspaceCapping: {
      dailyQuotaGb: dailyCapGb
    }
    features: {
      enableLogAccessUsingOnlyResourcePermissions: true
      // Keyless: Container Apps ship logs through diagnostic settings ("azure-monitor" destination),
      // so no workspace shared key is ever read or stored.
      disableLocalAuth: true
    }
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource appi 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi-soyl-${env}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: law.id
    IngestionMode: 'LogAnalytics'
    // Keyless ingestion: the OpenTelemetry exporter must authenticate with the app's managed identity.
    DisableLocalAuth: true
    // Client IPs stay masked (default) - INFRA-11 / data minimisation.
    DisableIpMasking: false
  }
}

resource actionGroup 'Microsoft.Insights/actionGroups@2023-01-01' = {
  name: 'ag-soyl-${env}'
  location: 'global'
  tags: tags
  properties: {
    groupShortName: 'soyl-${env}'
    enabled: true
    emailReceivers: empty(alertEmail)
      ? []
      : [
          {
            name: 'platform-owner'
            emailAddress: alertEmail
            useCommonAlertSchema: true
          }
        ]
    armRoleReceivers: [
      {
        // Built-in "Owner" role: always notify subscription owners, even when no e-mail is configured.
        name: 'subscription-owners'
        roleId: '8e3af657-a8ff-443c-a75c-2fe8c4bcb635'
        useCommonAlertSchema: true
      }
    ]
  }
}

var metricsPublisherRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')

resource publishers 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in publisherPrincipalIds: {
    name: guid(appi.id, p, metricsPublisherRoleId)
    scope: appi
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: metricsPublisherRoleId
    }
  }
]

output workspaceId string = law.id
output workspaceName string = law.name
output appInsightsId string = appi.id
output appInsightsName string = appi.name
#disable-next-line outputs-should-not-contain-secrets // A connection string with DisableLocalAuth=true carries no credential: ingestion still requires an Entra token.
output appInsightsConnectionString string = appi.properties.ConnectionString
output actionGroupId string = actionGroup.id
