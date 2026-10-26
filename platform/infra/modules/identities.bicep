// User-assigned managed identities, one per workload (INFRA-2, INFRA-5, INFRA-6, INFRA-7).
// Names match platform/db/README.md "Roles": the Postgres Entra principals are created with these
// exact names (pgaadauth_create_principal('id-soyl-api-<env>', ...)).

param env string
param location string
param tags object

var workloads = [
  'api'
  'worker'
  'migrator'
  'frontdoor'
]

resource ids 'Microsoft.ManagedIdentity/userAssignedIdentities@2024-11-30' = [
  for w in workloads: {
    name: 'id-soyl-${w}-${env}'
    location: location
    tags: tags
  }
]

output api object = {
  id: ids[0].id
  name: ids[0].name
  principalId: ids[0].properties.principalId
  clientId: ids[0].properties.clientId
}
output worker object = {
  id: ids[1].id
  name: ids[1].name
  principalId: ids[1].properties.principalId
  clientId: ids[1].properties.clientId
}
output migrator object = {
  id: ids[2].id
  name: ids[2].name
  principalId: ids[2].properties.principalId
  clientId: ids[2].properties.clientId
}
output frontdoor object = {
  id: ids[3].id
  name: ids[3].name
  principalId: ids[3].properties.principalId
  clientId: ids[3].properties.clientId
}
