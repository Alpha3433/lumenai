
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

export const targetSubreddits = [
  'startup', 'startups', 'Entrepreneur', 'Entrepreneurship', 'SideProject', 
  'webdev', 'programming', 'javascript', 'reactjs'
];

export const themeDescriptors = [
  {
    key: "Technical Challenges",
    keywords: ["error", "bug", "debugging", "technical challenge", "developer problem"],
    description: "Common technical challenges and debugging issues developers face.",
    category: "Pain Points",
    color: "bg-red-100"
  },
  {
    key: "Product Market Fit",
    keywords: ["product market fit", "PMF", "validation", "success story"],
    description: "Stories of achieving product-market fit and validation.",
    category: "Success Stories",
    color: "bg-green-100"
  },
  {
    key: "Development Tools",
    keywords: ["IDE", "editor", "tool", "plugin", "extension"],
    description: "Popular development tools and utilities being discussed.",
    category: "Tool Mentions",
    color: "bg-orange-100"
  },
  {
    key: "AI Integration",
    keywords: ["AI", "machine learning", "ML", "artificial intelligence", "GPT"],
    description: "Trends in AI integration and implementation.",
    category: "Emerging Trends",
    color: "bg-purple-100"
  },
  {
    key: "Revenue Growth",
    keywords: ["revenue", "profit", "growth", "milestone"],
    description: "Success stories about revenue growth and profitability.",
    category: "Success Stories",
    color: "bg-green-100"
  }
];
