// VNet, subnets, NSGs and private DNS zones (INFRA-1, INFRA-3, INFRA-4, INFRA-5, INFRA-6).
// - snet-aca: Container Apps environment (workload-profiles, Consumption profile), delegated to Microsoft.App/environments.
// - snet-pe:  private endpoints for Postgres, Redis, Blob, Key Vault and the AI services.
// Every data store resolves to a private IP inside this VNet through the zones below.

param env string
param location string
param tags object

@description('VNet address space, e.g. 10.20.0.0/16.')
param addressPrefix string

@description('Container Apps infrastructure subnet (>= /27 for workload-profile environments; /23 leaves room to grow).')
param acaSubnetPrefix string

@description('Private-endpoint subnet.')
param peSubnetPrefix string

var privateDnsZoneNames = {
  postgres: 'privatelink.postgres.database.azure.com'
  redis: 'privatelink.redis.azure.net'
  blob: 'privatelink.blob.${environment().suffixes.storage}'
  keyVault: 'privatelink.vaultcore.azure.net'
  openai: 'privatelink.openai.azure.com'
  cognitive: 'privatelink.cognitiveservices.azure.com'
}

resource nsgAca 'Microsoft.Network/networkSecurityGroups@2024-07-01' = {
  name: 'nsg-soyl-aca-${env}'
  location: location
  tags: tags
  properties: {
    securityRules: [
      {
        // The API app has external ingress (INFRA-7). HTTPS only; port 80 is allowed solely so the
        // Container Apps edge can answer with its HTTPS redirect (allowInsecure=false on the app).
        name: 'allow-https-inbound'
        properties: {
          priority: 100
          direction: 'Inbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourceAddressPrefix: 'Internet'
          sourcePortRange: '*'
          destinationAddressPrefix: acaSubnetPrefix
          destinationPortRanges: [
            '443'
            '80'
          ]
        }
      }
    ]
  }
}

resource nsgPe 'Microsoft.Network/networkSecurityGroups@2024-07-01' = {
  name: 'nsg-soyl-pe-${env}'
  location: location
  tags: tags
  properties: {
    securityRules: [
      {
        // Private endpoints only need traffic from inside the VNet (the Container Apps subnet).
        name: 'deny-internet-inbound'
        properties: {
          priority: 4000
          direction: 'Inbound'
          access: 'Deny'
          protocol: '*'
          sourceAddressPrefix: 'Internet'
          sourcePortRange: '*'
          destinationAddressPrefix: '*'
          destinationPortRange: '*'
        }
      }
    ]
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2024-07-01' = {
  name: 'vnet-soyl-${env}'
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [
        addressPrefix
      ]
    }
    subnets: [
      {
        name: 'snet-aca'
        properties: {
          addressPrefix: acaSubnetPrefix
          networkSecurityGroup: {
            id: nsgAca.id
          }
          delegations: [
            {
              name: 'aca'
              properties: {
                serviceName: 'Microsoft.App/environments'
              }
            }
          ]
        }
      }
      {
        name: 'snet-pe'
        properties: {
          addressPrefix: peSubnetPrefix
          networkSecurityGroup: {
            id: nsgPe.id
          }
          privateEndpointNetworkPolicies: 'Enabled'
        }
      }
    ]
  }
}

resource zones 'Microsoft.Network/privateDnsZones@2024-06-01' = [
  for z in items(privateDnsZoneNames): {
    name: z.value
    location: 'global'
    tags: tags
  }
]

resource links 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2024-06-01' = [
  for (z, i) in items(privateDnsZoneNames): {
    parent: zones[i]
    name: 'link-${vnet.name}'
    location: 'global'
    tags: tags
    properties: {
      registrationEnabled: false
      virtualNetwork: {
        id: vnet.id
      }
    }
  }
]

// items() sorts keys alphabetically: blob, cognitive, keyVault, openai, postgres, redis.
output zoneIds object = {
  blob: zones[0].id
  cognitive: zones[1].id
  keyVault: zones[2].id
  openai: zones[3].id
  postgres: zones[4].id
  redis: zones[5].id
}
output vnetId string = vnet.id
output acaSubnetId string = vnet.properties.subnets[0].id
output peSubnetId string = vnet.properties.subnets[1].id
