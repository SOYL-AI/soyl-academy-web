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

@description('Key Vault secret references: [{ secretName, envName, apps: [api|worker] }]. Only listed when the secrets exist (SOYL_KV_SECRET_REFS).')
param secretRefs array
param keyVaultUri string

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

// mcr.microsoft.com/k8se/quickstart:latest pinned by digest (listens on port 80, no probes).
var placeholderImage = 'mcr.microsoft.com/k8se/quickstart@sha256:d278e30de23a1b5b5f4c987e830dbd915f9fafc1e2e574022eadf7e7ce1c05fb'
var apiPlaceholder = empty(apiImage)
var workerPlaceholder = empty(workerImage)
var migratePlaceholder = empty(migrateImage)

var apiSecretRefs = filter(secretRefs, s => contains(s.apps, 'api'))
var workerSecretRefs = filter(secretRefs, s => contains(s.apps, 'worker'))

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
      value: 'postgresql://${apiIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=require'
    }
    {
      name: 'REDIS_USERNAME'
      value: apiIdentity.principalId
    }
  ],
  map(apiSecretRefs, s => {
    name: s.envName
    secretRef: s.secretName
  })
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
      value: 'postgresql://${workerIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=require'
    }
    {
      name: 'REDIS_USERNAME'
      value: workerIdentity.principalId
    }
  ],
  map(workerSecretRefs, s => {
    name: s.envName
    secretRef: s.secretName
  })
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
          env: migratePlaceholder
            ? []
            : [
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
                  value: 'require'
                }
                {
                  name: 'DATABASE_URL'
                  value: 'postgresql://${migratorIdentity.name}@${pgHost}:5432/${pgDatabase}?sslmode=require'
                }
                {
                  // Entra principals the bootstrap step creates and grants soyl_app (platform/db/README.md "Roles").
                  name: 'PG_APP_PRINCIPALS'
                  value: '${apiIdentity.name},${workerIdentity.name}'
                }
              ]
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
