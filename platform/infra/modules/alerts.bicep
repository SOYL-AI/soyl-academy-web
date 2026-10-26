// Alerts: ARCHITECTURE section 14 + INFRA-12.
// Log alerts query the workspace-based Application Insights tables (AppRequests, AppTraces,
// AppEvents, AppMetrics). The API/worker emit the events below (contract in platform/infra/README.md
// "Telemetry contract"); skipQueryValidation lets the rules exist before the first event arrives.
//
// | Alert                          | Source                                             | Requirement      |
// |--------------------------------|----------------------------------------------------|------------------|
// | 5xx > 1% for 5 min             | AppRequests                                        | ARCH 14          |
// | p95 > 1 s                      | AppRequests                                        | ARCH 14          |
// | AI spend 50/80/100%            | AppEvents name ai.spend.threshold, percent         | ARCH 14, INFRA-12|
// | webhook failures               | AppTraces event webhook_signature_failed / 5xx     | ARCH 14, INFRA-12|
// | queue backlog                  | AppMetrics name queue.depth                        | ARCH 14          |
// | DB CPU > 80%                   | Postgres metric cpu_percent                        | ARCH 14          |
// | OTP sends per hour             | AppTraces event otp_sent                           | INFRA-12         |
// | failed OTP verifies per hour   | AppTraces event otp_verify_failed                  | INFRA-12         |
// | 403s from missing edge secret  | AppTraces event edge_auth_failed                   | INFRA-12         |

param env string
param location string
param tags object
param workspaceId string
param actionGroupId string
param postgresId string

@description('How often log alerts run. PT5M in stg/prod; PT15M in dev (cheaper).')
param evaluationFrequency string

param otpSendsPerHourThreshold int
param otpVerifyFailuresPerHourThreshold int
param edgeAuthFailuresPer15MinThreshold int
param queueBacklogThreshold int

// Security events are structured logs with attributes `security` and `event` (API-15).
var securityEvent = 'AppTraces | extend event = tostring(Properties["event"])'

var logAlerts = [
  {
    name: 'http-5xx-rate'
    description: 'API 5xx responses above 1% of requests over 5 minutes (ARCHITECTURE 14).'
    severity: 1
    window: 'PT5M'
    query: 'AppRequests | where AppRoleName == "soyl-api" | summarize total = count(), failed = countif(toint(ResultCode) >= 500) | where total >= 20 and 100.0 * failed / total > 1'
  }
  {
    name: 'http-p95-latency'
    description: 'API p95 latency above 1 s over 5 minutes (ARCHITECTURE 14).'
    severity: 2
    window: 'PT5M'
    query: 'AppRequests | where AppRoleName == "soyl-api" and Name !has "/v1/ai/" | summarize total = count(), p95 = percentile(DurationMs, 95) | where total >= 20 and p95 > 1000'
  }
  {
    name: 'ai-spend-50'
    description: 'AI spend reached 50% of AI_DAILY_SPEND_CAP_INR (ARCHITECTURE 10, INFRA-12).'
    severity: 3
    window: 'PT15M'
    query: 'AppEvents | where Name == "ai.spend.threshold" | extend percent = toint(Properties["percent"]) | where percent >= 50 and percent < 80'
  }
  {
    name: 'ai-spend-80'
    description: 'AI spend reached 80% of AI_DAILY_SPEND_CAP_INR (ARCHITECTURE 10, INFRA-12).'
    severity: 2
    window: 'PT15M'
    query: 'AppEvents | where Name == "ai.spend.threshold" | extend percent = toint(Properties["percent"]) | where percent >= 80 and percent < 100'
  }
  {
    name: 'ai-spend-100'
    description: 'AI spend circuit-breaker tripped: 100% of AI_DAILY_SPEND_CAP_INR (ARCHITECTURE 10, INFRA-12).'
    severity: 1
    window: 'PT15M'
    query: 'AppEvents | where Name == "ai.spend.threshold" | extend percent = toint(Properties["percent"]) | where percent >= 100'
  }
  {
    name: 'webhook-failures'
    description: 'Razorpay webhook signature failures or 5xx on the webhook route (ARCHITECTURE 14, INFRA-12, AC-09).'
    severity: 1
    window: 'PT15M'
    query: 'union (${securityEvent} | where event == "webhook_signature_failed" | project TimeGenerated), (AppRequests | where Name has "/v1/webhooks/" and toint(ResultCode) >= 500 | project TimeGenerated)'
  }
  {
    name: 'queue-backlog'
    description: 'pg-boss queue depth above threshold (ARCHITECTURE 14).'
    severity: 2
    window: 'PT15M'
    query: 'AppMetrics | where Name == "queue.depth" | summarize depth = max(Max) | where depth > ${queueBacklogThreshold}'
  }
  {
    name: 'otp-sends-per-hour'
    description: 'OTP sends in the last hour above threshold: possible SMS pumping (INFRA-12, AC-02).'
    severity: 1
    window: 'PT1H'
    query: '${securityEvent} | where event == "otp_sent" | summarize n = count() | where n > ${otpSendsPerHourThreshold}'
  }
  {
    name: 'otp-verify-failures-per-hour'
    description: 'Failed OTP verifications in the last hour above threshold: possible brute force (INFRA-12, AC-01).'
    severity: 2
    window: 'PT1H'
    query: '${securityEvent} | where event == "otp_verify_failed" | summarize n = count() | where n > ${otpVerifyFailuresPerHourThreshold}'
  }
  {
    name: 'edge-auth-failures'
    description: '403s from a missing/invalid edge secret: traffic bypassing Vercel to the Container Apps FQDN (INFRA-12, API-2, AC-05).'
    severity: 2
    window: 'PT15M'
    query: '${securityEvent} | where event == "edge_auth_failed" | summarize n = count() | where n > ${edgeAuthFailuresPer15MinThreshold}'
  }
]

resource rules 'Microsoft.Insights/scheduledQueryRules@2023-12-01' = [
  for a in logAlerts: {
    name: 'alert-soyl-${env}-${a.name}'
    location: location
    tags: tags
    kind: 'LogAlert'
    properties: {
      displayName: 'SOYL ${env}: ${a.name}'
      description: a.description
      severity: a.severity
      enabled: true
      scopes: [
        workspaceId
      ]
      evaluationFrequency: evaluationFrequency
      // The window is never shorter than the evaluation frequency.
      windowSize: (a.window == 'PT5M' && evaluationFrequency != 'PT5M') ? evaluationFrequency : a.window
      criteria: {
        allOf: [
          {
            query: a.query
            timeAggregation: 'Count'
            operator: 'GreaterThan'
            threshold: 0
            failingPeriods: {
              numberOfEvaluationPeriods: 1
              minFailingPeriodsToAlert: 1
            }
          }
        ]
      }
      skipQueryValidation: true
      autoMitigate: true
      actions: {
        actionGroups: [
          actionGroupId
        ]
      }
    }
  }
]

resource dbCpu 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: 'alert-soyl-${env}-db-cpu'
  location: 'global'
  tags: tags
  properties: {
    description: 'PostgreSQL CPU above 80% (ARCHITECTURE 14).'
    severity: 2
    enabled: true
    scopes: [
      postgresId
    ]
    evaluationFrequency: 'PT5M'
    windowSize: 'PT15M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'cpu'
          criterionType: 'StaticThresholdCriterion'
          metricName: 'cpu_percent'
          metricNamespace: 'Microsoft.DBforPostgreSQL/flexibleServers'
          operator: 'GreaterThan'
          threshold: 80
          timeAggregation: 'Average'
        }
      ]
    }
    autoMitigate: true
    actions: [
      {
        actionGroupId: actionGroupId
      }
    ]
  }
}

resource dbStorage 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: 'alert-soyl-${env}-db-storage'
  location: 'global'
  tags: tags
  properties: {
    description: 'PostgreSQL storage above 85% (auto-grow is on, but growth costs money).'
    severity: 3
    enabled: true
    scopes: [
      postgresId
    ]
    evaluationFrequency: 'PT15M'
    windowSize: 'PT1H'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'storage'
          criterionType: 'StaticThresholdCriterion'
          metricName: 'storage_percent'
          metricNamespace: 'Microsoft.DBforPostgreSQL/flexibleServers'
          operator: 'GreaterThan'
          threshold: 85
          timeAggregation: 'Average'
        }
      ]
    }
    autoMitigate: true
    actions: [
      {
        actionGroupId: actionGroupId
      }
    ]
  }
}

output logAlertCount int = length(logAlerts)
