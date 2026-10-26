// stg: small, prod-shaped (private networking, AI private only), min 1 replica. Live-mock load tests
// (ARCHITECTURE 16) need the database scaled up first: runbooks/deploy-rollback.md "Load-test window".
// No secrets here (GEN-1): identities are managed identities; secret VALUES live in Key Vault.
// Values that must not be committed (e-mail, object ids) and the image tags come from environment
// variables set by the deploy workflow (repo variables) or the operator's shell.
using '../main.bicep'

param env = 'stg'
param location = 'centralindia'
param aiLocation = 'centralindia'

param vnetAddressPrefix = '10.20.0.0/16'
param acaSubnetPrefix = '10.20.0.0/23'
param peSubnetPrefix = '10.20.4.0/24'

param acrName = readEnvironmentVariable('SOYL_ACR_NAME', 'crsoylplatform')
param acrResourceGroup = 'rg-soyl-platform-shared'

param apiImage = readEnvironmentVariable('SOYL_API_IMAGE', '')
param workerImage = readEnvironmentVariable('SOYL_WORKER_IMAGE', '')
param migrateImage = readEnvironmentVariable('SOYL_MIGRATE_IMAGE', '')

param acaZoneRedundant = false
param apiCpu = '0.5'
param apiMemory = '1Gi'
param apiMinReplicas = 1
param apiMaxReplicas = 5
param apiConcurrentRequests = 50
param workerCpu = '0.5'
param workerMemory = '1Gi'
param workerMinReplicas = 1
param workerMaxReplicas = 3
param workerActiveWindow = {}

param pgSkuName = 'Standard_B2s'
param pgTier = 'Burstable'
param pgStorageGb = 64
param pgHaMode = 'Disabled'
param pgBackupRetentionDays = 7
param pgGeoRedundantBackup = 'Disabled'
param pgOwnerAdminGroupObjectId = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_ID', '')
param pgOwnerAdminGroupName = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_NAME', '')

param redisSku = 'Balanced_B1'
param redisHighAvailability = false
param redisAofPersistence = false

param storageSku = 'Standard_LRS'
// Staging web origin (Vercel preview/staging host, OA-09) from a repo variable; never a wildcard (AUTH-12).
param uploadCorsOrigins = empty(readEnvironmentVariable('SOYL_STG_WEB_ORIGIN', '')) ? [] : [readEnvironmentVariable('SOYL_STG_WEB_ORIGIN', '')]

param keyVaultAllowedIps = empty(readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')) ? [] : [readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')]
param kvSecretRefs = bool(readEnvironmentVariable('SOYL_KV_SECRET_REFS', 'true'))
param appSecrets = [
  { secretName: 'edge-secret-current', envName: 'EDGE_SECRET_CURRENT', apps: ['api'] }
  { secretName: 'edge-secret-previous', envName: 'EDGE_SECRET_PREVIOUS', apps: ['api'] }
  { secretName: 'otp-pepper', envName: 'OTP_PEPPER', apps: ['api'] }
  { secretName: 'auth-secret', envName: 'AUTH_SECRET', apps: ['api'] }
  { secretName: 'mfa-encryption-key', envName: 'MFA_ENCRYPTION_KEY', apps: ['api'] }
]

// AI services reachable only through private endpoints (INFRA-5); the pipeline runs as a job in the VNet.
param deployAi = true
param aiPublicNetworkAccess = 'Disabled'
param aiAllowedIps = empty(readEnvironmentVariable('SOYL_AI_ALLOWED_IP', '')) ? [] : [readEnvironmentVariable('SOYL_AI_ALLOWED_IP', '')]
// OA-02: flip to true once model names/versions/quota are confirmed (ADR-008).
param aoaiDeployModels = bool(readEnvironmentVariable('SOYL_AOAI_DEPLOY_MODELS', 'false'))
param aoaiDeployments = [
  { tier: 'small', name: 'small', model: 'gpt-6-luna', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'mid', name: 'mid', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'verify', name: 'verify', model: 'gpt-6-astra', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'batch', name: 'mid-batch', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'GlobalBatch', capacity: 100 }
]

param deployFrontDoor = true

// Email (D-031): a free Azure-managed domain (DoNotReply@<guid>.azurecomm.net) outside production.
param emailDomainManagement = 'AzureManaged'
param emailDomain = 'soylai.com'
param emailSenderUsername = 'noreply'
param emailSenderDisplayName = 'SOYL Academy (stg)'
param acsDataLocation = 'India'
// Contributor on the ACS resource only, unless the "Communication and Email Service Owner" GUID is given.
param acsSenderRoleId = readEnvironmentVariable('SOYL_ACS_SENDER_ROLE_ID', 'b24988ac-6181-4c74-a15b-b2e1ee7d7cc3')
param acsLinkDomain = true

param logRetentionDays = 180
param logDailyCapGb = 2
param alertEmail = readEnvironmentVariable('SOYL_ALERT_EMAIL', '')
param alertEvaluationFrequency = 'PT5M'
param otpSendsPerHourThreshold = 50
param otpVerifyFailuresPerHourThreshold = 50
param edgeAuthFailuresPer15MinThreshold = 50
param queueBacklogThreshold = 500

// dev + stg + shared <= INR 50,000/month (owner budget; COSTS.md).
param budgetAmount = 29000
param aiBudgetAmount = 4000

param appSettings = {
  PLATFORM_ENABLED: 'true'
  BILLING_ENABLED: 'false'
  AI_DAILY_SPEND_CAP_INR: '300'
  CONTENT_BUDGET_INR: '0'
  EMAIL_PROVIDER: 'acs'
  WEB_ORIGIN: readEnvironmentVariable('SOYL_STG_WEB_ORIGIN', '')
}
