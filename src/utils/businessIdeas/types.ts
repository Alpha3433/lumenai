
// Interface for business idea preferences
export interface BusinessIdeaPreferences {
  industry?: string;
  interests?: string;
  usePremiumModel?: boolean;
}

// Interface for business idea suggestion
export interface BusinessIdeaSuggestion {
  businessName: string;
  description: string;
  targetMarket: string;
  revenueModel: string;
  whyItWorks: string[];
}
