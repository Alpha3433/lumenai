
# Files Structure Overview

## Core Components

### Business Plan Components
- `BusinessPlanForm.tsx`: Main form component for creating business plans
- `BusinessPlanPreview.tsx`: Displays the generated business plan
- `BusinessPlanActionBar.tsx`: Navigation and actions bar for the business plan interface
- `BusinessPlanDashboard.tsx`: Dashboard view showing plan metrics and insights

### Analysis Components
- `ExecutiveSummarySection.tsx`: Renders the executive summary of the business plan
- `MarketAnalysisSection.tsx`: Displays market research and analysis
- `BusinessModelSection.tsx`: Shows the business model details
- `PorterFiveForcesSection.tsx`: Visualizes Porter's Five Forces analysis
- `SwotAnalysis.tsx`: SWOT analysis visualization component

### Validation Components
- `BusinessValidationScore.tsx`: Shows the validation score with metrics
- `ValidationSummaryCard.tsx`: Card component displaying validation results

### Navigation Components
- `Navbar.tsx`: Main navigation component
- `Footer.tsx`: Site-wide footer component

## Utility Files
- `planGenerator.ts`: Business plan generation logic
- `businessValidation.ts`: Validation utilities
- `emailService.ts`: Email notification service

## Pages
- `Index.tsx`: Landing page
- `Create.tsx`: Business plan creation page
- `WaitingList.tsx`: Waiting list signup page
- `Dashboard.tsx`: User dashboard

## Hooks
- `usePlanCreator.ts`: Main hook for business plan creation
- `useBusinessModels.ts`: Hook for managing business model data
- `useEmail.ts`: Email functionality hook

