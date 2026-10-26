// SOYL Academy Learning Platform - one environment (dev | stg | prod) in its own resource group
// rg-soyl-platform-<env>, Central India (ARCHITECTURE section 13, INFRA-9).
//
//   az deployment group create -g rg-soyl-platform-stg \
//     -f platform/infra/main.bicep -p platform/infra/params/stg.bicepparam
//
// The shared container registry lives in rg-soyl-platform-shared (shared.bicep, ADR-010).
// No secrets are parameters: workloads use managed identities, secret VALUES live in Key Vault
// and are referenced by name only (GEN-1, INFRA-6). Security requirement ids (INFRA-n, GEN-n)
// from docs/platform/security/requirements-for-m1.md are cited where each control is implemented.

targetScope = 'resourceGroup'

@allowed([
  'dev'
  'stg'
  'prod'
])
param env string

@description('Region for every stateful resource (INFRA-9).')
@allowed([
  'centralindia'
])
param location string

@description('Region for the Azure AI accounts. Must stay in India (ADR-008); default centralindia.')
@allowed([
  'centralindia'
  'southindia'
  'westindia'
])
param aiLocation string

// ---------- network ----------
param vnetAddressPrefix string
param acaSubnetPrefix string
param peSubnetPrefix string

// ---------- shared registry (ADR-010) ----------
@description('Shared Azure Container Registry name (created by shared.bicep).')
param acrName string

@description('Resource group of the shared registry.')
param acrResourceGroup string

// ---------- images (empty = pinned placeholder; set by the deploy workflow) ----------
param apiImage string
param workerImage string
param migrateImage string

// ---------- Container Apps sizing ----------
param acaZoneRedundant bool
param apiCpu string
param apiMemory string
@minValue(0)
param apiMinReplicas int
param apiMaxReplicas int
param apiConcurrentRequests int
param workerCpu string
param workerMemory string
@minValue(0)
param workerMinReplicas int
param workerMaxReplicas int
@description('Optional working-hours window for the worker: { timezone, start, end } (cron). {} = always per min/max.')
param workerActiveWindow object

// ---------- PostgreSQL ----------
param pgSkuName string
param pgTier string
param pgStorageGb int
param pgHaMode string
param pgBackupRetentionDays int
param pgGeoRedundantBackup string
@description('Optional break-glass Entra admin group (object id + name). Read from CI variables, never committed.')
param pgOwnerAdminGroupObjectId string
param pgOwnerAdminGroupName string

// ---------- Redis ----------
param redisSku string
param redisHighAvailability bool
param redisAofPersistence bool

// ---------- Storage ----------
param storageSku string
param uploadCorsOrigins array

// ---------- Key Vault ----------
@description('Temporary IP allow-list for the owner to set secrets (azure-bootstrap.md). Empty = no public access.')
param keyVaultAllowedIps array

@description('Reference Key Vault secrets from the apps. false only for the very first deploy, before the secrets exist.')
param kvSecretRefs bool

@description('Key Vault secrets exposed to the apps as env vars: [{ secretName, envName, apps }]. Names only, never values.')
param appSecrets array

// ---------- AI (ADR-008) ----------
@description('Create the Azure OpenAI / Speech / Content Safety accounts (and their private endpoints). false = AI off (M4); the AZURE_* env vars are then empty.')
param deployAi bool
param aiPublicNetworkAccess string
@description('Operator IPs allowed to reach the AI accounts while publicNetworkAccess is Disabled (content pipeline runs). Empty = none.')
param aiAllowedIps array
param aoaiDeployModels bool
param aoaiDeployments array

// ---------- CDN ----------
@description('Create Front Door for the public-assets container (diagrams/audio). Not needed until public assets are published.')
param deployFrontDoor bool

// ---------- email (D-031: Azure Communication Services Email, email OTP only) ----------
@description('CustomerManaged (prod, soylai.com) or AzureManaged (dev/stg: free azurecomm.net domain, sender DoNotReply).')
@allowed([
  'CustomerManaged'
  'AzureManaged'
])
param emailDomainManagement string
@description('Customer-managed sending domain (the owner adds the DNS records from the emailDnsRecords output).')
param emailDomain string
@description('Sender local part: <emailSenderUsername>@<emailDomain>.')
param emailSenderUsername string
param emailSenderDisplayName string
@description('ACS data location (data at rest).')
param acsDataLocation string
@description('Role definition GUID that lets the API identity send email (see modules/communication.bicep).')
param acsSenderRoleId string
@description('Link the verified domain to the Communication Services resource (second deploy, after DNS verification).')
param acsLinkDomain bool

// ---------- monitoring / alerts ----------
@minValue(180)
param logRetentionDays int
param logDailyCapGb int
@description('Alert/budget e-mail. Read from the SOYL_ALERT_EMAIL environment variable by the params file; never committed.')
param alertEmail string
param alertEvaluationFrequency string
param otpSendsPerHourThreshold int
param otpVerifyFailuresPerHourThreshold int
param edgeAuthFailuresPer15MinThreshold int
param queueBacklogThreshold int

// ---------- budgets (INFRA-13) ----------
@description('Monthly budget for the whole resource group, in the billing currency (INR).')
param budgetAmount int
@description('Monthly budget for the Azure OpenAI account alone (content generation is metered separately, ADR-008).')
param aiBudgetAmount int
param budgetStartDate string = '${utcNow('yyyy-MM')}-01'

// ---------- app settings (non-secret, ARCHITECTURE section 19) ----------
@description('Plain app settings, e.g. PLATFORM_ENABLED, BILLING_ENABLED, AI_DAILY_SPEND_CAP_INR, WEB_ORIGIN.')
param appSettings object

var tags = {
  app: 'soyl-platform'
  env: env
  managedBy: 'bicep'
  repo: 'SOYL-AI/soyl-academy-web'
}
var databaseName = 'soyl'

module ids 'modules/identities.bicep' = {
  name: 'identities'
  params: {
    env: env
    location: location
    tags: tags
  }
}

module monitoring 'modules/monitoring.bicep' = {
  name: 'monitoring'
  params: {
    env: env
    location: location
    tags: tags
    retentionInDays: logRetentionDays
    dailyCapGb: logDailyCapGb
    alertEmail: alertEmail
    publisherPrincipalIds: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
    ]
  }
}

module network 'modules/network.bicep' = {
  name: 'network'
  params: {
    env: env
    location: location
    tags: tags
    addressPrefix: vnetAddressPrefix
    acaSubnetPrefix: acaSubnetPrefix
    peSubnetPrefix: peSubnetPrefix
  }
}

module kv 'modules/keyvault.bicep' = {
  name: 'keyvault'
  params: {
    env: env
    location: location
    tags: tags
    peSubnetId: network.outputs.peSubnetId
    privateDnsZoneId: network.outputs.zoneIds.keyVault
    workspaceId: monitoring.outputs.workspaceId
    allowedIps: keyVaultAllowedIps
    secretReaderPrincipalIds: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
    ]
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    env: env
    location: location
    tags: tags
    peSubnetId: network.outputs.peSubnetId
    privateDnsZoneId: network.outputs.zoneIds.blob
    workspaceId: monitoring.outputs.workspaceId
    migratorPrincipalId: ids.outputs.migrator.principalId
    skuName: storageSku
    uploadRetentionDays: 30
    uploadCorsOrigins: uploadCorsOrigins
    apiPrincipalId: ids.outputs.api.principalId
    workerPrincipalId: ids.outputs.worker.principalId
    frontDoorPrincipalId: ids.outputs.frontdoor.principalId
  }
}

module postgres 'modules/postgres.bicep' = {
  name: 'postgres'
  params: {
    env: env
    location: location
    tags: tags
    peSubnetId: network.outputs.peSubnetId
    privateDnsZoneId: network.outputs.zoneIds.postgres
    workspaceId: monitoring.outputs.workspaceId
    skuName: pgSkuName
    tier: pgTier
    storageSizeGB: pgStorageGb
    haMode: pgHaMode
    backupRetentionDays: pgBackupRetentionDays
    geoRedundantBackup: pgGeoRedundantBackup
    adminPrincipalId: ids.outputs.migrator.principalId
    adminPrincipalName: ids.outputs.migrator.name
    ownerAdminGroupObjectId: pgOwnerAdminGroupObjectId
    ownerAdminGroupName: pgOwnerAdminGroupName
    databaseName: databaseName
  }
}

module redis 'modules/redis.bicep' = {
  name: 'redis'
  params: {
    env: env
    location: location
    tags: tags
    peSubnetId: network.outputs.peSubnetId
    privateDnsZoneId: network.outputs.zoneIds.redis
    workspaceId: monitoring.outputs.workspaceId
    skuName: redisSku
    highAvailability: redisHighAvailability
    aofPersistence: redisAofPersistence
    dataPrincipals: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
    ]
  }
}

module ai 'modules/ai.bicep' = if (deployAi) {
  name: 'ai'
  params: {
    env: env
    location: aiLocation
    vnetLocation: location
    tags: tags
    peSubnetId: network.outputs.peSubnetId
    openAiZoneId: network.outputs.zoneIds.openai
    cognitiveZoneId: network.outputs.zoneIds.cognitive
    workspaceId: monitoring.outputs.workspaceId
    publicNetworkAccess: aiPublicNetworkAccess
    allowedIps: aiAllowedIps
    deployModels: aoaiDeployModels
    deployments: aoaiDeployments
    openAiUserPrincipalIds: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
    ]
    cognitiveUserPrincipalIds: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
    ]
  }
}

module frontDoor 'modules/frontdoor.bicep' = if (deployFrontDoor) {
  name: 'frontdoor'
  params: {
    env: env
    tags: tags
    identityId: ids.outputs.frontdoor.id
    blobHost: storage.outputs.blobHost
    workspaceId: monitoring.outputs.workspaceId
  }
}

module communication 'modules/communication.bicep' = {
  name: 'communication'
  params: {
    env: env
    tags: tags
    domainManagement: emailDomainManagement
    domainName: emailDomain
    senderUsername: emailSenderUsername
    senderDisplayName: emailSenderDisplayName
    dataLocation: acsDataLocation
    senderPrincipalIds: [
      ids.outputs.api.principalId
    ]
    senderRoleDefinitionId: acsSenderRoleId
    linkDomain: acsLinkDomain
  }
}

module acrPull 'modules/acrPull.bicep' = {
  name: 'acr-pull-${env}'
  scope: resourceGroup(acrResourceGroup)
  params: {
    acrName: acrName
    principalIds: [
      ids.outputs.api.principalId
      ids.outputs.worker.principalId
      ids.outputs.migrator.principalId
    ]
  }
}

// Deployment names per tier (models.ts maps tiers to these env vars, ARCHITECTURE section 10/19).
var deploymentNameByTier = toObject(aoaiDeployments, d => d.tier, d => d.name)

var commonEnv = concat(
  [
    {
      name: 'APP_ENV'
      value: env
    }
    {
      name: 'NODE_ENV'
      value: 'production'
    }
    {
      name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
      value: monitoring.outputs.appInsightsConnectionString
    }
    {
      name: 'APPLICATIONINSIGHTS_AUTH'
      value: 'entra'
    }
    {
      name: 'DATABASE_AUTH'
      value: 'entra'
    }
    {
      name: 'PGHOST'
      value: postgres.outputs.host
    }
    {
      name: 'PGPORT'
      value: '5432'
    }
    {
      name: 'PGDATABASE'
      value: databaseName
    }
    {
      name: 'PGSSLMODE'
      value: 'verify-full'
    }
    {
      name: 'REDIS_URL'
      value: 'rediss://${redis.outputs.host}:${redis.outputs.port}'
    }
    {
      name: 'REDIS_AUTH'
      value: 'entra'
    }
    {
      name: 'BLOB_ACCOUNT_URL'
      value: storage.outputs.blobEndpoint
    }
    {
      name: 'CDN_BASE_URL'
      value: deployFrontDoor ? 'https://${frontDoor!.outputs.hostName}' : ''
    }
    {
      name: 'AZURE_KEY_VAULT_URL'
      value: kv.outputs.uri
    }
    {
      name: 'AZURE_OPENAI_ENDPOINT'
      value: deployAi ? ai!.outputs.openAiEndpoint : ''
    }
    {
      name: 'AZURE_OPENAI_DEPLOYMENT_SMALL'
      value: deploymentNameByTier.?small ?? ''
    }
    {
      name: 'AZURE_OPENAI_DEPLOYMENT_MID'
      value: deploymentNameByTier.?mid ?? ''
    }
    {
      name: 'AZURE_OPENAI_DEPLOYMENT_VERIFY'
      value: deploymentNameByTier.?verify ?? ''
    }
    {
      name: 'AZURE_OPENAI_DEPLOYMENT_BATCH'
      value: deploymentNameByTier.?batch ?? ''
    }
    {
      name: 'AZURE_OPENAI_MODELS_DEPLOYED'
      value: string(deployAi && aoaiDeployModels)
    }
    {
      name: 'AZURE_SPEECH_REGION'
      value: deployAi ? ai!.outputs.aiLocation : ''
    }
    {
      name: 'AZURE_SPEECH_ENDPOINT'
      value: deployAi ? ai!.outputs.speechEndpoint : ''
    }
    {
      name: 'AZURE_SPEECH_RESOURCE_ID'
      value: deployAi ? ai!.outputs.speechId : ''
    }
    {
      name: 'AZURE_CONTENT_SAFETY_ENDPOINT'
      value: deployAi ? ai!.outputs.contentSafetyEndpoint : ''
    }
  ],
  map(items(appSettings), s => {
    name: s.key
    value: string(s.value)
  })
)

module apps 'modules/containerApps.bicep' = {
  name: 'container-apps'
  params: {
    env: env
    location: location
    tags: tags
    infrastructureSubnetId: network.outputs.acaSubnetId
    workspaceId: monitoring.outputs.workspaceId
    zoneRedundant: acaZoneRedundant
    acrLoginServer: acrPull.outputs.loginServer
    apiImage: apiImage
    workerImage: workerImage
    migrateImage: migrateImage
    apiIdentity: ids.outputs.api
    workerIdentity: ids.outputs.worker
    migratorIdentity: ids.outputs.migrator
    commonEnv: commonEnv
    secretRefs: kvSecretRefs ? appSecrets : []
    keyVaultUri: kv.outputs.uri
    apiCpu: apiCpu
    apiMemory: apiMemory
    apiMinReplicas: apiMinReplicas
    apiMaxReplicas: apiMaxReplicas
    apiConcurrentRequests: apiConcurrentRequests
    workerCpu: workerCpu
    workerMemory: workerMemory
    workerMinReplicas: workerMinReplicas
    workerMaxReplicas: workerMaxReplicas
    workerActiveWindow: workerActiveWindow
    pgHost: postgres.outputs.host
    pgDatabase: databaseName
    blobAccountUrl: storage.outputs.blobEndpoint
    apiExtraEnv: [
      {
        // D-031: the API sends sign-in codes through ACS Email with its managed identity.
        name: 'ACS_ENDPOINT'
        value: communication.outputs.endpoint
      }
      {
        // The ACS sender username of the verified domain (noreply@soylai.com).
        name: 'EMAIL_FROM'
        value: communication.outputs.senderAddress
      }
    ]
  }
}

module alerts 'modules/alerts.bicep' = {
  name: 'alerts'
  params: {
    env: env
    location: location
    tags: tags
    workspaceId: monitoring.outputs.workspaceId
    actionGroupId: monitoring.outputs.actionGroupId
    postgresId: postgres.outputs.id
    evaluationFrequency: alertEvaluationFrequency
    otpSendsPerHourThreshold: otpSendsPerHourThreshold
    otpVerifyFailuresPerHourThreshold: otpVerifyFailuresPerHourThreshold
    edgeAuthFailuresPer15MinThreshold: edgeAuthFailuresPer15MinThreshold
    queueBacklogThreshold: queueBacklogThreshold
  }
}

module budget 'modules/budget.bicep' = {
  name: 'budget'
  params: {
    name: 'budget-soyl-platform-${env}'
    amount: budgetAmount
    startDate: budgetStartDate
    actionGroupId: monitoring.outputs.actionGroupId
    contactEmails: empty(alertEmail) ? [] : [alertEmail]
  }
}

module aiBudget 'modules/budget.bicep' = if (deployAi) {
  name: 'budget-ai'
  params: {
    name: 'budget-soyl-platform-${env}-openai'
    amount: aiBudgetAmount
    startDate: budgetStartDate
    actionGroupId: monitoring.outputs.actionGroupId
    contactEmails: empty(alertEmail) ? [] : [alertEmail]
    resourceIdFilter: [
      ai!.outputs.openAiId
    ]
  }
}

// Read by the deploy workflow (az deployment group show ... --query properties.outputs).
output apiAppName string = apps.outputs.apiName
output apiFqdn string = apps.outputs.apiFqdn
output workerAppName string = apps.outputs.workerName
output migrateJobName string = apps.outputs.migrateJobName
output releaseJobName string = apps.outputs.releaseJobName
output keyVaultName string = kv.outputs.name
output keyVaultUri string = kv.outputs.uri
output storageAccountName string = storage.outputs.name
output cdnHostName string = deployFrontDoor ? frontDoor!.outputs.hostName : ''
output postgresHost string = postgres.outputs.host
output openAiEndpoint string = deployAi ? ai!.outputs.openAiEndpoint : ''
output acsName string = communication.outputs.acsName
output acsEndpoint string = communication.outputs.endpoint
output emailServiceName string = communication.outputs.emailServiceName
output emailSenderAddress string = communication.outputs.senderAddress
@description('DNS records for the owner (Domain TXT, SPF TXT, DKIM + DKIM2 CNAME; DMARC is advisory).')
output emailDnsRecords object = communication.outputs.dnsRecords
output emailDomainVerification object = communication.outputs.domainVerificationStates
output logAnalyticsWorkspaceName string = monitoring.outputs.workspaceName
