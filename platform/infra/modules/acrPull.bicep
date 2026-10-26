// AcrPull on the shared registry for an environment's workload identities (INFRA-7: no admin user,
// pull with managed identity). Deployed into the shared resource group's scope from main.bicep.

param acrName string
param principalIds array

var acrPullRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')

resource acr 'Microsoft.ContainerRegistry/registries@2025-04-01' existing = {
  name: acrName
}

resource pulls 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in principalIds: {
    name: guid(acr.id, p, acrPullRoleId)
    scope: acr
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: acrPullRoleId
    }
  }
]

output loginServer string = acr.properties.loginServer
