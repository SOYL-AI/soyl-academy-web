// Shared resources for all environments, in rg-soyl-platform-shared (Central India): the container
// registry (ADR-010: build once, promote the same image digest stg -> prod), its action group and
// budget.
//
//   az deployment group create -g rg-soyl-platform-shared \
//     -f platform/infra/shared.bicep -p platform/infra/params/shared.bicepparam

targetScope = 'resourceGroup'

@allowed([
  'centralindia'
])
param location string

@description('Globally unique registry name (5-50 alphanumerics).')
@minLength(5)
@maxLength(50)
param acrName string

@allowed([
  'Basic'
  'Standard'
  'Premium'
])
param acrSku string

param alertEmail string

@minValue(1)
param budgetAmount int
param budgetStartDate string = '${utcNow('yyyy-MM')}-01'

var tags = {
  app: 'soyl-platform'
  env: 'shared'
  managedBy: 'bicep'
  repo: 'SOYL-AI/soyl-academy-web'
}

resource acr 'Microsoft.ContainerRegistry/registries@2025-04-01' = {
  name: acrName
  location: location
  tags: tags
  sku: {
    name: acrSku
  }
  properties: {
    // INFRA-7: no admin user; pulls use AcrPull on managed identities, CI pushes with OIDC (AcrPush).
    adminUserEnabled: false
    anonymousPullEnabled: false
    // GitHub-hosted runners push over the public endpoint (Entra auth only). Private endpoints
    // need the Premium SKU (~2.5x the price); revisit with self-hosted runners.
    publicNetworkAccess: 'Enabled'
    zoneRedundancy: 'Disabled'
    dataEndpointEnabled: false
    policies: {
      // Premium-only policies (retention, trust) are not set; old tags are purged by the
      // deploy workflow's cleanup step instead (runbooks/deploy-rollback.md).
      azureADAuthenticationAsArmPolicy: {
        status: 'enabled'
      }
    }
  }
}

resource actionGroup 'Microsoft.Insights/actionGroups@2023-01-01' = {
  name: 'ag-soyl-shared'
  location: 'global'
  tags: tags
  properties: {
    groupShortName: 'soyl-shared'
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
        name: 'subscription-owners'
        roleId: '8e3af657-a8ff-443c-a75c-2fe8c4bcb635'
        useCommonAlertSchema: true
      }
    ]
  }
}

module budget 'modules/budget.bicep' = {
  name: 'budget'
  params: {
    name: 'budget-soyl-platform-shared'
    amount: budgetAmount
    startDate: budgetStartDate
    actionGroupId: actionGroup.id
    contactEmails: empty(alertEmail) ? [] : [alertEmail]
  }
}

output acrName string = acr.name
output acrLoginServer string = acr.properties.loginServer
output acrId string = acr.id
