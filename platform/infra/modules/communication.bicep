// Azure Communication Services Email for sign-in codes (D-031: email OTP only, sender noreply@soylai.com).
// - Email Communication Service + customer-managed domain (soylai.com, the owner adds the DNS records
//   output below) + sender username `noreply` (display name "SOYL Academy").
// - Communication Services resource linked to the domain; the API sends through its REST endpoint
//   (POST https://<host>/emails:send) with a managed-identity token for https://communication.azure.com.
// - Keyless: the API identity gets an RBAC role on the Communication Services resource; the resource's
//   access keys exist (they cannot be disabled) but are never read by the platform.
// - Data at rest: dataLocation 'India' (ACS stores data in India; the services themselves are
//   'global' resources, INFRA-9 exception documented in the prod runbook).
// - User engagement tracking (open/click tracking) is OFF on the domain; the app also disables it
//   per message (no tracking pixels, F-004 spirit).

param env string
param tags object

@description('CustomerManaged: domainName (prod: soylai.com, DNS records added by the owner). AzureManaged: a free *.azurecomm.net domain with the fixed sender DoNotReply (dev/stg).')
@allowed([
  'CustomerManaged'
  'AzureManaged'
])
param domainManagement string

@description('Customer-managed sending domain, e.g. soylai.com (ignored for AzureManaged).')
param domainName string

@description('Local part of the sender address (noreply@<domain>).')
param senderUsername string

@description('Display name shown to recipients.')
param senderDisplayName string

@description('ACS data location (where data at rest is stored). India keeps it in-country.')
param dataLocation string

@description('Principal ids allowed to send email (the API managed identity).')
param senderPrincipalIds array

@description('Role definition GUID granted to the senders on the Communication Services resource. Preferred: the built-in "Communication and Email Service Owner" (look it up: az role definition list --name "Communication and Email Service Owner" --query "[0].name" -o tsv). Fallback: Contributor (b24988ac-6181-4c74-a15b-b2e1ee7d7cc3), scoped to this one resource.')
param senderRoleDefinitionId string

@description('Link the domain to the Communication Services resource. false until the owner has added the DNS records and Azure shows the domain verified (linking an unverified domain fails).')
param linkDomain bool

var suffix = take(uniqueString(resourceGroup().id), 6)

resource emailService 'Microsoft.Communication/emailServices@2023-04-01' = {
  name: 'ecs-soyl-${env}-${suffix}'
  location: 'global'
  tags: tags
  properties: {
    dataLocation: dataLocation
  }
}

var customerManaged = domainManagement == 'CustomerManaged'

resource domain 'Microsoft.Communication/emailServices/domains@2023-04-01' = {
  parent: emailService
  name: customerManaged ? domainName : 'AzureManagedDomain'
  location: 'global'
  tags: tags
  properties: {
    domainManagement: domainManagement
    userEngagementTracking: 'Disabled'
  }
}

// Azure-managed domains only have the built-in DoNotReply sender.
resource sender 'Microsoft.Communication/emailServices/domains/senderUsernames@2023-04-01' = if (customerManaged) {
  parent: domain
  name: senderUsername
  properties: {
    username: senderUsername
    displayName: senderDisplayName
  }
}

resource acs 'Microsoft.Communication/communicationServices@2023-04-01' = {
  name: 'acs-soyl-${env}-${suffix}'
  location: 'global'
  tags: tags
  properties: {
    dataLocation: dataLocation
    // A custom domain can only be linked after it is verified (DNS records added by the owner). The
    // first deployment creates the domain; set acsLinkDomain=true and redeploy once Azure shows
    // Domain, SPF, DKIM and DKIM2 as Verified (runbook). Azure-managed domains are verified at creation.
    linkedDomains: (linkDomain || !customerManaged) ? [domain.id] : []
  }
  dependsOn: [
    sender
  ]
}

var senderRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', senderRoleDefinitionId)

resource senders 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for p in senderPrincipalIds: {
    name: guid(acs.id, p, senderRoleId)
    scope: acs
    properties: {
      principalId: p
      principalType: 'ServicePrincipal'
      roleDefinitionId: senderRoleId
    }
  }
]

output acsName string = acs.name
output emailServiceName string = emailService.name
output domainId string = domain.id
@description('ACS REST endpoint for ACS_ENDPOINT.')
output endpoint string = 'https://${acs.properties.hostName}'
output senderAddress string = customerManaged ? '${senderUsername}@${domainName}' : 'DoNotReply@${domain.properties.mailFromSenderDomain}'
@description('DNS records the owner adds at the soylai.com DNS host: Domain (TXT ownership), SPF (TXT), DKIM and DKIM2 (CNAME). Also shown by: az communication email domain show ... --query verificationRecords')
output dnsRecords object = domain.properties.verificationRecords
output domainVerificationStates object = domain.properties.verificationStates
