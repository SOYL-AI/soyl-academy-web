// Shared registry for all environments (ADR-010), rg-soyl-platform-shared.
using '../shared.bicep'

param location = 'centralindia'
param acrName = readEnvironmentVariable('SOYL_ACR_NAME', 'crsoylplatform')
// Standard: 100 GB included, higher pull throughput for live-mock scale-out (COSTS.md).
param acrSku = 'Standard'
param alertEmail = readEnvironmentVariable('SOYL_ALERT_EMAIL', '')
// Counted in the dev + stg <= INR 50,000/month owner budget (COSTS.md).
param budgetAmount = 3000
