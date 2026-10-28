// Container Apps environment (VNet-integrated, workload profiles, Consumption profile only - no
// dedicated-plan management fee) + `api` app + `worker` app + migrations job.
// INFRA-7: api has external ingress, HTTPS only (allowInsecure=false); worker has NO ingress;
//          images are pulled from ACR with the app's managed identity (AcrPull), never admin creds.
// INFRA-6: secrets are Key Vault references resolved with the app's managed identity.
// D-022: services listen on PORT=8080 and expose /healthz and /readyz (API).
// When an image parameter is empty (services not built yet, or infra-only bootstrap), a pinned
// public placeholder image is used so the infrastructure can still be deployed.

param env string
param location string
param tags object
param infrastructureSubnetId string
param workspaceId string
param zoneRedundant bool

param acrLoginServer string

param apiImage string
param workerImage string
param migrateImage string

param apiIdentity object
param workerIdentity object
param migratorIdentity object

@description('Plain (non-secret) environment variables shared by api and worker.')
param commonEnv array

@description('Key Vault secret references: [{ secretName, envName, apps: [api|worker|billing] }]. Only listed when the secrets exist (SOYL_KV_SECRET_REFS; the Razorpay ones only with deployBilling).')
param secretRefs array
param keyVaultUri string

@description('Create the billing operator job caj-soyl-billing-<env> (Razorpay plan sync, reconcile, resync, replay; runbooks/billing-go-live.md). Only when billing is wired (main.bicep billingWired).')
param deployBillingJob bool

@description('Plain billing env vars (RAZORPAY_PROVIDER) for api, worker and the billing job; appended last so existing env entries keep their positions. Empty while billing is not wired.')
param billingEnv array

param apiCpu string
param apiMemory string
param apiMinReplicas int
param apiMaxReplicas int
param apiConcurrentRequests int

param workerCpu string
param workerMemory string
param workerMinReplicas int
param workerMaxReplicas int

@description('Optional working-hours window for the worker (dev saves cost): { timezone, start, end } cron expressions; empty object = none.')
param workerActiveWindow object

@description('Database settings for the migrations job.')
param pgHost string
param pgDatabase string

@description('API-only plain env vars (e.g. ACS_ENDPOINT from the Communication Services resource).')
param apiExtraEnv array

@description('Blob endpoint the release job publishes content releases to (D-026).')
param blobAccountUrl string

// mcr.microsoft.com/k8se/quickstart:latest pinned by digest (listens on port 80, no probes).
var placeholderImage = 'mcr.microsoft.com/k8se/quickstart@sha256:d278e30de23a1b5b5f4c987e830dbd915f9fafc1e2e574022eadf7e7ce1c05fb'
var apiPlaceholder = empty(apiImage)
var workerPlaceholder = empty(workerImage)
var migratePlaceholder = empty(migrateImage)

var apiSecretRefs = filter(secretRefs, s => contains(s.apps, 'api'))
var workerSecretRefs = filter(secretRefs, s => contains(s.apps, 'worker'))
var billingSecretRefs = filter(secretRefs, s => contains(s.apps, 'billing'))

resource cae 'Microsoft.App/managedEnvironments@2025-01-01' = {
  name: 'cae-soyl-${env}'
  location: location
  tags: tags
  properties: {
    // Logs go through diagnostic settings below (no workspace shared key in the template).
    appLogsConfiguration: {
      destination: 'azure-monitor'
    }
    vnetConfiguration: {
      infrastructureSubnetId: infrastructureSubnetId
      internal: false
    }
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]
    zoneRedundant: zoneRedundant
    peerTrafficConfiguration: {
      encryption: {
        enabled: true
      }
    }
  }
}

resource caeDiag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'to-log-analytics'
  scope: cae
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
  }
}

var apiEnv = concat(
  commonEnv,
  [
    {
      name: 'PORT'
      value: '8080'
    }
    {
      name: 'SERVICE_NAME'
      value: 'api'
    }
    {
      name: 'OTEL_SERVICE_NAME'
      value: 'soyl-api'
    }
    {
      name: 'AZURE_CLIENT_ID'
      value: apiIdentity.clientId
    }
    {
      name: 'PGUSER'
      value: apiIdentity.name
    }
    {
      name: 'DATABASE_URL'
      value: 'postgresql://${apiIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=verify-full'
    }
    {
      name: 'REDIS_USERNAME'
      value: apiIdentity.principalId
    }
  ],
  apiExtraEnv,
  map(apiSecretRefs, s => {
    name: s.envName
    secretRef: s.secretName
  }),
  billingEnv
)

var workerEnv = concat(
  commonEnv,
  [
    {
      name: 'PORT'
      value: '8080'
    }
    {
      name: 'SERVICE_NAME'
      value: 'worker'
    }
    {
      name: 'OTEL_SERVICE_NAME'
      value: 'soyl-worker'
    }
    {
      name: 'AZURE_CLIENT_ID'
      value: workerIdentity.clientId
    }
    {
      name: 'PGUSER'
      value: workerIdentity.name
    }
    {
      name: 'DATABASE_URL'
      value: 'postgresql://${workerIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=verify-full'
    }
    {
      name: 'REDIS_USERNAME'
      value: workerIdentity.principalId
    }
  ],
  map(workerSecretRefs, s => {
    name: s.envName
    secretRef: s.secretName
  }),
  billingEnv
)

resource api 'Microsoft.App/containerApps@2025-01-01' = {
  name: 'ca-soyl-api-${env}'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${apiIdentity.id}': {}
    }
  }
  properties: {
    environmentId: cae.id
    workloadProfileName: 'Consumption'
    configuration: {
      activeRevisionsMode: 'Single'
      maxInactiveRevisions: 20
      ingress: {
        external: true
        targetPort: apiPlaceholder ? 80 : 8080
        transport: 'http'
        allowInsecure: false
        traffic: [
          {
            latestRevision: true
            weight: 100
          }
        ]
      }
      registries: apiPlaceholder
        ? []
        : [
            {
              server: acrLoginServer
              identity: apiIdentity.id
            }
          ]
      secrets: apiPlaceholder
        ? []
        : map(apiSecretRefs, s => {
            name: s.secretName
            keyVaultUrl: '${keyVaultUri}secrets/${s.secretName}'
            identity: apiIdentity.id
          })
    }
    template: {
      containers: [
        {
          name: 'api'
          image: apiPlaceholder ? placeholderImage : apiImage
          resources: {
            cpu: json(apiCpu)
            memory: apiMemory
          }
          env: apiPlaceholder ? [] : apiEnv
          probes: apiPlaceholder
            ? []
            : [
                {
                  type: 'Startup'
                  httpGet: {
                    path: '/healthz'
                    port: 8080
                  }
                  periodSeconds: 5
                  failureThreshold: 24
                }
                {
                  type: 'Liveness'
                  httpGet: {
                    path: '/healthz'
                    port: 8080
                  }
                  periodSeconds: 15
                  failureThreshold: 3
                }
                {
                  type: 'Readiness'
                  httpGet: {
                    path: '/readyz'
                    port: 8080
                  }
                  periodSeconds: 10
                  failureThreshold: 3
                }
              ]
        }
      ]
      scale: {
        minReplicas: apiMinReplicas
        maxReplicas: apiMaxReplicas
        rules: [
          {
            name: 'http-concurrency'
            http: {
              metadata: {
                concurrentRequests: string(apiConcurrentRequests)
              }
            }
          }
        ]
      }
    }
  }
  dependsOn: [
    caeDiag
  ]
}

var workerCronRule = empty(workerActiveWindow)
  ? []
  : [
      {
        name: 'working-hours'
        custom: {
          type: 'cron'
          metadata: {
            timezone: workerActiveWindow.timezone
            start: workerActiveWindow.start
            end: workerActiveWindow.end
            desiredReplicas: '1'
          }
        }
      }
    ]

resource worker 'Microsoft.App/containerApps@2025-01-01' = {
  name: 'ca-soyl-worker-${env}'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${workerIdentity.id}': {}
    }
  }
  properties: {
    environmentId: cae.id
    workloadProfileName: 'Consumption'
    configuration: {
      activeRevisionsMode: 'Single'
      maxInactiveRevisions: 20
      // INFRA-7: no ingress at all for the worker.
      registries: workerPlaceholder
        ? []
        : [
            {
              server: acrLoginServer
              identity: workerIdentity.id
            }
          ]
      secrets: workerPlaceholder
        ? []
        : map(workerSecretRefs, s => {
            name: s.secretName
            keyVaultUrl: '${keyVaultUri}secrets/${s.secretName}'
            identity: workerIdentity.id
          })
    }
    template: {
      containers: [
        {
          name: 'worker'
          image: workerPlaceholder ? placeholderImage : workerImage
          resources: {
            cpu: json(workerCpu)
            memory: workerMemory
          }
          env: workerPlaceholder ? [] : workerEnv
        }
      ]
      scale: {
        minReplicas: workerMinReplicas
        maxReplicas: workerMaxReplicas
        rules: concat(workerCronRule, [
          {
            name: 'cpu'
            custom: {
              type: 'cpu'
              metadata: {
                type: 'Utilization'
                value: '70'
              }
            }
          }
        ])
      }
    }
  }
  dependsOn: [
    caeDiag
  ]
}

resource migrate 'Microsoft.App/jobs@2025-01-01' = {
  name: 'caj-soyl-migrate-${env}'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${migratorIdentity.id}': {}
    }
  }
  properties: {
    environmentId: cae.id
    workloadProfileName: 'Consumption'
    configuration: {
      triggerType: 'Manual'
      replicaTimeout: 1800
      replicaRetryLimit: 0
      manualTriggerConfig: {
        parallelism: 1
        replicaCompletionCount: 1
      }
      registries: migratePlaceholder
        ? []
        : [
            {
              server: acrLoginServer
              identity: migratorIdentity.id
            }
          ]
    }
    template: {
      containers: [
        {
          name: 'migrate'
          image: migratePlaceholder ? placeholderImage : migrateImage
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
          // No args: bootstrap + `db migrate up` + pg-boss schema install (migrate-entrypoint.mjs).
          env: migratePlaceholder ? [] : migrateJobEnv
        }
      ]
    }
  }
  dependsOn: [
    caeDiag
  ]
}

// Seeds the catalog and publishes the hand-authored content (D-026) with the migrations image:
// `migrate-entrypoint.mjs release` = bootstrap + `db seed catalog` + `content publish --authored`.
// Runs as the migrator identity (owns the schema through soyl_migrator; Blob Data Contributor on
// content-releases). Manual trigger, after the migrations job.
var migrateJobEnv = [
  {
    name: 'APP_ENV'
    value: env
  }
  {
    name: 'AZURE_CLIENT_ID'
    value: migratorIdentity.clientId
  }
  {
    name: 'PGHOST'
    value: pgHost
  }
  {
    name: 'PGPORT'
    value: '5432'
  }
  {
    name: 'PGDATABASE'
    value: pgDatabase
  }
  {
    name: 'PGUSER'
    value: migratorIdentity.name
  }
  {
    name: 'PGSSLMODE'
    value: 'verify-full'
  }
  {
    name: 'DATABASE_URL'
    value: 'postgresql://${migratorIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=verify-full'
  }
  {
    name: 'PG_APP_PRINCIPALS'
    value: '${apiIdentity.name},${workerIdentity.name}'
  }
]

resource release 'Microsoft.App/jobs@2025-01-01' = {
  name: 'caj-soyl-release-${env}'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${migratorIdentity.id}': {}
    }
  }
  properties: {
    environmentId: cae.id
    workloadProfileName: 'Consumption'
    configuration: {
      triggerType: 'Manual'
      replicaTimeout: 3600
      replicaRetryLimit: 0
      manualTriggerConfig: {
        parallelism: 1
        replicaCompletionCount: 1
      }
      registries: migratePlaceholder
        ? []
        : [
            {
              server: acrLoginServer
              identity: migratorIdentity.id
            }
          ]
    }
    template: {
      containers: [
        {
          name: 'release'
          image: migratePlaceholder ? placeholderImage : migrateImage
          args: migratePlaceholder
            ? []
            : [
                '/app/migrate-entrypoint.mjs'
                'release'
              ]
          resources: {
            cpu: json('1.0')
            memory: '2Gi'
          }
          env: migratePlaceholder
            ? []
            : concat(migrateJobEnv, [
                {
                  name: 'CONTENT_BLOB_ACCOUNT_URL'
                  value: blobAccountUrl
                }
                {
                  name: 'CONTENT_BLOB_CONTAINER'
                  value: 'content-releases'
                }
              ])
        }
      ]
    }
  }
  dependsOn: [
    caeDiag
  ]
}

// Billing operator job (ADR-016, runbooks/billing-go-live.md): the billing CLI from the migrations image
// (`migrate-entrypoint.mjs billing <command>`; the entrypoint skips the migrator bootstrap in this mode).
// It runs as the WORKER identity, which already reads the Razorpay secrets (reconciliation) and is
// soyl_app in the database (plans, orders, subscriptions, audit_log), so no new role assignment.
// Key Vault is private, so this is the only way to reach the live Razorpay account with the platform's
// keys. Default arguments are the safe dry run; a real run overrides them per execution:
//   az containerapp job start -g <rg> -n caj-soyl-billing-<env> --image <migrate image> --container-name billing \
//     --args "/app/migrate-entrypoint.mjs" "billing" "sync-plans"
var deployBillingJobNow = deployBillingJob && !migratePlaceholder
var billingJobName = 'caj-soyl-billing-${env}'
var billingJobEnv = concat(
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
      name: 'AZURE_CLIENT_ID'
      value: workerIdentity.clientId
    }
    {
      name: 'DATABASE_AUTH'
      value: 'entra'
    }
    {
      name: 'PGHOST'
      value: pgHost
    }
    {
      name: 'PGPORT'
      value: '5432'
    }
    {
      name: 'PGDATABASE'
      value: pgDatabase
    }
    {
      name: 'PGUSER'
      value: workerIdentity.name
    }
    {
      name: 'PGSSLMODE'
      value: 'verify-full'
    }
    {
      name: 'DATABASE_URL'
      value: 'postgresql://${workerIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=verify-full'
    }
  ],
  billingEnv,
  map(billingSecretRefs, s => {
    name: s.envName
    secretRef: s.secretName
  })
)

resource billingJob 'Microsoft.App/jobs@2025-01-01' = if (deployBillingJobNow) {
  name: billingJobName
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${workerIdentity.id}': {}
    }
  }
  properties: {
    environmentId: cae.id
    workloadProfileName: 'Consumption'
    configuration: {
      triggerType: 'Manual'
      replicaTimeout: 900
      // Never retried automatically: an operator reads the output of every run.
      replicaRetryLimit: 0
      manualTriggerConfig: {
        parallelism: 1
        replicaCompletionCount: 1
      }
      registries: [
        {
          server: acrLoginServer
          identity: workerIdentity.id
        }
      ]
      secrets: map(billingSecretRefs, s => {
        name: s.secretName
        keyVaultUrl: '${keyVaultUri}secrets/${s.secretName}'
        identity: workerIdentity.id
      })
    }
    template: {
      containers: [
        {
          name: 'billing'
          image: migrateImage
          // Safe default: report what sync-plans would change, write nothing (database or Razorpay).
          args: [
            '/app/migrate-entrypoint.mjs'
            'billing'
            'sync-plans'
            '--dry-run'
          ]
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
          env: billingJobEnv
        }
      ]
    }
  }
  dependsOn: [
    caeDiag
  ]
}

output environmentName string = cae.name
output environmentId string = cae.id
output apiName string = api.name
output apiFqdn string = api.properties.configuration.ingress.fqdn
output workerName string = worker.name
output migrateJobName string = migrate.name
output releaseJobName string = release.name
output billingJobName string = deployBillingJobNow ? billingJobName : ''
