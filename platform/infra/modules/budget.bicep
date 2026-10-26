// Resource-group budget with 50/80/100% actual + 100% forecast alerts (ARCHITECTURE 13, INFRA-13).
// Amounts are in the subscription's BILLING currency (INR for an India-billed subscription; see COSTS.md).
// Budgets alert; they never stop resources. Hard AI spend limits live in the app
// (AI_DAILY_SPEND_CAP_INR, CONTENT_BUDGET_INR).

param name string

@minValue(1)
param amount int

@description('First day of the current month, yyyy-MM-01 (budgets must start on the first of a month, within the current period).')
param startDate string

param actionGroupId string
param contactEmails array

@description('Optional resource-id filter (e.g. only the Azure OpenAI account). Empty = whole resource group.')
param resourceIdFilter array = []

var thresholds = [
  {
    key: 'actual50'
    threshold: 50
    type: 'Actual'
  }
  {
    key: 'actual80'
    threshold: 80
    type: 'Actual'
  }
  {
    key: 'actual100'
    threshold: 100
    type: 'Actual'
  }
  {
    key: 'forecast100'
    threshold: 100
    type: 'Forecasted'
  }
]

resource budget 'Microsoft.Consumption/budgets@2024-08-01' = {
  name: name
  properties: {
    category: 'Cost'
    amount: amount
    timeGrain: 'Monthly'
    timePeriod: {
      startDate: startDate
    }
    filter: empty(resourceIdFilter)
      ? null
      : {
          dimensions: {
            name: 'ResourceId'
            operator: 'In'
            values: resourceIdFilter
          }
        }
    notifications: toObject(
      thresholds,
      t => t.key,
      t => {
        enabled: true
        operator: 'GreaterThanOrEqualTo'
        threshold: t.threshold
        thresholdType: t.type
        contactEmails: contactEmails
        contactGroups: [
          actionGroupId
        ]
        contactRoles: [
          'Owner'
        ]
      }
    )
  }
}

output id string = budget.id
