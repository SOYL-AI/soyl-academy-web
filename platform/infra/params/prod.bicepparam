// prod: zone-redundant HA everywhere it exists, api min 2, PITR 14 days, no log cap (security logs are
// never dropped), AI private only. Deployed only through the approval-gated `production` environment.
// No secrets here (GEN-1): identities are managed identities; secret VALUES live in Key Vault.
// Values that must not be committed (e-mail, object ids) and the image tags come from environment
// variables set by the deploy workflow (repo variables) or the operator's shell.
using '../main.bicep'

param env = 'prod'
param location = 'centralindia'
param aiLocation = 'centralindia'

param vnetAddressPrefix = '10.30.0.0/16'
param acaSubnetPrefix = '10.30.0.0/23'
param peSubnetPrefix = '10.30.4.0/24'

param acrName = readEnvironmentVariable('SOYL_ACR_NAME', 'crsoylplatform')
param acrResourceGroup = 'rg-soyl-platform-shared'

param apiImage = readEnvironmentVariable('SOYL_API_IMAGE', '')
param workerImage = readEnvironmentVariable('SOYL_WORKER_IMAGE', '')
param migrateImage = readEnvironmentVariable('SOYL_MIGRATE_IMAGE', '')

param acaZoneRedundant = true
param apiCpu = '1.0'
param apiMemory = '2Gi'
param apiMinReplicas = 2
param apiMaxReplicas = 20
param apiConcurrentRequests = 80
param workerCpu = '1.0'
param workerMemory = '2Gi'
param workerMinReplicas = 1
param workerMaxReplicas = 6
param workerActiveWindow = {}

param pgSkuName = 'Standard_D2ds_v5'
param pgTier = 'GeneralPurpose'
param pgStorageGb = 128
param pgHaMode = 'ZoneRedundant'
param pgBackupRetentionDays = 14
param pgGeoRedundantBackup = 'Enabled'
param pgOwnerAdminGroupObjectId = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_ID', '')
param pgOwnerAdminGroupName = readEnvironmentVariable('SOYL_PG_ADMIN_GROUP_NAME', '')

param redisSku = 'Balanced_B3'
param redisHighAvailability = true
param redisAofPersistence = true

param storageSku = 'Standard_ZRS'
// The production web origin (API-1, AUTH-12). Never soylacademy.com (not owned by SOYL).
param uploadCorsOrigins = [
  'https://www.soylai.com'
]

param keyVaultAllowedIps = empty(readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')) ? [] : [readEnvironmentVariable('SOYL_KV_ALLOWED_IP', '')]
param kvSecretRefs = bool(readEnvironmentVariable('SOYL_KV_SECRET_REFS', 'true'))
param appSecrets = [
  { secretName: 'edge-secret-current', envName: 'EDGE_SECRET_CURRENT', apps: ['api'] }
  { secretName: 'edge-secret-previous', envName: 'EDGE_SECRET_PREVIOUS', apps: ['api'] }
  { secretName: 'otp-pepper', envName: 'OTP_PEPPER', apps: ['api'] }
  { secretName: 'auth-secret', envName: 'AUTH_SECRET', apps: ['api'] }
]

// AI services reachable only through private endpoints (INFRA-5); the pipeline runs as a job in the VNet.
param aiPublicNetworkAccess = 'Disabled'
param aiAllowedIps = []
// OA-02: flip to true once model names/versions/quota are confirmed (ADR-008).
param aoaiDeployModels = bool(readEnvironmentVariable('SOYL_AOAI_DEPLOY_MODELS', 'false'))
param aoaiDeployments = [
  { tier: 'small', name: 'small', model: 'gpt-6-luna', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'mid', name: 'mid', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'verify', name: 'verify', model: 'gpt-6-astra', version: 'OA-02', skuName: 'Standard', capacity: 10 }
  { tier: 'batch', name: 'mid-batch', model: 'gpt-6.1-sol', version: 'OA-02', skuName: 'GlobalBatch', capacity: 100 }
]

param logRetentionDays = 180
param logDailyCapGb = -1
param alertEmail = readEnvironmentVariable('SOYL_ALERT_EMAIL', '')
param alertEvaluationFrequency = 'PT5M'
param otpSendsPerHourThreshold = 1000
param otpVerifyFailuresPerHourThreshold = 300
param edgeAuthFailuresPer15MinThreshold = 100
param queueBacklogThreshold = 2000

// Production budget: owner to confirm (COSTS.md). AI budget is a placeholder until AI_DAILY_SPEND_CAP_INR is set.
param budgetAmount = 150000
param aiBudgetAmount = 100000

param appSettings = {
  PLATFORM_ENABLED: 'false'
  BILLING_ENABLED: 'false'
  AI_DAILY_SPEND_CAP_INR: '3000'
  CONTENT_BUDGET_INR: '0'
  WEB_ORIGIN: 'https://www.soylai.com'
}
