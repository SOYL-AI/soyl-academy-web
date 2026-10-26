// dev: cheapest SKUs, API scales to zero, worker runs only in IST working hours.
// No secrets here (GEN-1): identities are managed identities; secret VALUES live in Key Vault.
// Values that must not be committed (e-mail, object ids) and the image tags come from environment
// variables set by the deploy workflow (repo variables) or the operator's shell.
using '../main.bicep'

param env = 'dev'
param location = 'centralindia'
param aiLocation = 'centralindia'

param vnetAddressPrefix = '10.10.0.0/16'
param acaSubnetPrefix = '10.10.0.0/23'
param peSubnetPrefix = '10.10.4.0/24'

param acrName = readEnvironmentVariable('SOYL_ACR_NAME', 'crsoylplatform')
param acrResourceGroup = 'rg-soyl-platform-shared'

param apiImage = readEnvironmentVariable('SOYL_API_IMAGE', '')
param workerImage = readEnvironmentVariable('SOYL_WORKER_IMAGE', '')
param migrateImage = readEnvironmentVariable('SOYL_MIGRATE_IMAGE', '')

param acaZoneRedundant = false
param apiCpu = '0.25'
param apiMemory = '0.5Gi'
param apiMinReplicas = 0
param apiMaxReplicas = 2
param apiConcurrentRequests = 50
param workerCpu = '0.25'
param workerMemory = '0.5Gi'
param workerMinReplicas = 0
param workerMaxReplicas = 1
param workerActiveWindow = {
  timezone: 'Asia/Kolkata'
  start: '0 9 * * 1-6'
  end: '0 21 * * 1-6'
}

param pgSkuName = 'Standard_B1ms'
param pgTier = 'Burstable'
param pgStorageGb = 32
param pgHaMode = 'Disabled'
param pgBackupRetentionDays = 7
param pgGeoRedundantBackup = 'Disabled'
param pgOwnerAdminGroupObjectId = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_ID', '')
param pgOwnerAdminGroupName = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_NAME', '')

param redisSku = 'Balanced_B0'
param redisHighAvailability = false
param redisAofPersistence = false

param storageSku = 'Standard_LRS'
param uploadCorsOrigins = [
  'http://localhost:3000'
]

param keyVaultAllowedIps = empty(readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')) ? [] : [readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')]
param kvSecretRefs = bool(readEnvironmentVariable('SOYL_KV_SECRET_REFS', 'true'))
param appSecrets = [
  { secretName: 'edge-secret-current', envName: 'EDGE_SECRET_CURRENT', apps: ['api'] }
  { secretName: 'edge-secret-previous', envName: 'EDGE_SECRET_PREVIOUS', apps: ['api'] }
  { secretName: 'otp-pepper', envName: 'OTP_PEPPER', apps: ['api'] }
  { secretName: 'auth-secret', envName: 'AUTH_SECRET', apps: ['api'] }
]

// dev keeps AI public network access (Entra-only, keys disabled) so the content pipeline can run
// from a developer machine (D-021). stg/prod: Disabled.
param aiPublicNetworkAccess = 'Enabled'
param aiAllowedIps = empty(readEnvironmentVariable('SOYL_AI_ALLOWED_IP', '')) ? [] : [readEnvironmentVariable('SOYL_AI_ALLOWED_IP', '')]
// OA-02: flip to true once model names/versions/quota are confirmed (ADR-008).
param aoaiDeployModels = bool(readEnvironmentVariable('SOYL_AOAI_DEPLOY_MODELS', 'false'))
param aoaiDeployments = [
  { tier: 'small', name: 'small', model: 'gpt-6-luna', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'mid', name: 'mid', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'verify', name: 'verify', model: 'gpt-6-astra', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'batch', name: 'mid-batch', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'GlobalBatch', capacity: 100 }
]

param logRetentionDays = 180
param logDailyCapGb = 1
param alertEmail = readEnvironmentVariable('SOYL_ALERT_EMAIL', '')
param alertEvaluationFrequency = 'PT15M'
param otpSendsPerHourThreshold = 50
param otpVerifyFailuresPerHourThreshold = 50
param edgeAuthFailuresPer15MinThreshold = 50
param queueBacklogThreshold = 500

// dev + stg + shared <= INR 50,000/month (owner budget; COSTS.md).
param budgetAmount = 17000
param aiBudgetAmount = 3000

param appSettings = {
  PLATFORM_ENABLED: 'true'
  BILLING_ENABLED: 'false'
  AI_DAILY_SPEND_CAP_INR: '100'
  CONTENT_BUDGET_INR: '0'
  WEB_ORIGIN: 'http://localhost:3000'
}
