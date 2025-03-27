
export interface BusinessIdeaPreferences {
  industry?: string;
  interests?: string;
}

export interface BusinessIdeaSuggestion {
  businessName: string;
  description: string;
  targetMarket: string;
  revenueModel: string;
  whyItWorks: string[];
}
