// One private endpoint + its private DNS zone group (INFRA-1, INFRA-3, INFRA-4, INFRA-5, INFRA-6).

param name string
param location string
param tags object
param subnetId string

@description('Resource id of the service the endpoint connects to.')
param targetResourceId string

@description('Private-link sub-resource, e.g. postgresqlServer, redisEnterprise, blob, vault, account.')
param groupId string

param privateDnsZoneId string

resource pe 'Microsoft.Network/privateEndpoints@2024-07-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    subnet: {
      id: subnetId
    }
    privateLinkServiceConnections: [
      {
        name: name
        properties: {
          privateLinkServiceId: targetResourceId
          groupIds: [
            groupId
          ]
        }
      }
    ]
  }
}

resource zoneGroup 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2024-07-01' = {
  parent: pe
  name: 'default'
  properties: {
    privateDnsZoneConfigs: [
      {
        name: 'zone'
        properties: {
          privateDnsZoneId: privateDnsZoneId
        }
      }
    ]
  }
}

output id string = pe.id
