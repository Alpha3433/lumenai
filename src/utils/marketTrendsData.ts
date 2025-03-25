
// Mock data generation utilities for MarketTrends page

// Types for market trend data
export interface MarketTrendStats {
  reportsAvailable: {
    count: string;
    planType: string;
  };
  sustainableProducts: {
    percentage: string;
    trend: 'up' | 'down';
    nicheName: string;
  };
  printNewspapers: {
    percentage: string;
    trend: 'up' | 'down';
    nicheName: string;
  };
  hotOpportunity: {
    views: string;
    name: string;
    confidenceLevel: 'high' | 'medium' | 'low';
    riskLevel: 'high' | 'medium' | 'low';
  };
  lastUpdated: Date;
}

// Generate a random percentage between -30 and +30 with % sign
const getRandomPercentage = (): string => {
  const value = Math.floor(Math.random() * 60) - 30;
  return `${value > 0 ? '+' : ''}${value}%`;
};

// Generate random view count (5K-50K)
const getRandomViews = (): string => {
  const views = Math.floor(Math.random() * 45000) + 5000;
  return `${(views / 1000).toFixed(1)}K`;
};

// List of trending business opportunities
const opportunities = [
  'AI-Powered Cooking Tools',
  'Sustainable Fashion',
  'Virtual Reality Fitness',
  'Plant-Based Food Delivery',
  'Remote Work Solutions',
  'Mental Health Apps',
  'Smart Home Security',
  'Personalized Learning',
  'Eco-friendly Packaging',
  'Digital Wellness Products',
  'Pet Tech Gadgets',
  'Subscription Box Services',
  'Drone Delivery Services',
  'Blockchain Applications',
  'Zero-waste Retail'
];

// List of sustainable product niches
const sustainableNiches = [
  'Biodegradable Packaging',
  'Upcycled Fashion',
  'Bamboo Alternatives',
  'Solar-Powered Accessories',
  'Plastic-Free Home Goods',
  'Organic Cosmetics',
  'Water Conservation Systems',
  'Eco-friendly Baby Products',
  'Sustainable Furniture',
  'Energy-Efficient Appliances',
  'Reusable Food Storage',
  'Plant-Based Leather',
  'Ethical Electronics',
  'Zero-Waste Kitchen Tools',
  'Recycled Art Supplies'
];

// List of print newspaper niches
const printNiches = [
  'Local Economy Focus',
  'Cultural Events Digest',
  'Community Health Updates',
  'Neighborhood Business Spotlight',
  'Educational Supplements',
  'Collectors\' Editions',
  'Senior-Focused Publications',
  'Artisanal Business Quarterly',
  'Industry-Specific Journals',
  'Environmental News',
  'Tech-Free Lifestyle',
  'Historical Archives',
  'Premium Photography Prints',
  'Luxury Market Reports',
  'Indie Comics & Storytelling'
];

// Generate random confidence and risk levels
const getRandomLevel = (): 'high' | 'medium' | 'low' => {
  const levels: ['high', 'medium', 'low'] = ['high', 'medium', 'low'];
  return levels[Math.floor(Math.random() * levels.length)];
};

// Get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate mock market trend data
export const generateMarketTrendData = (): MarketTrendStats => {
  const sustainablePercentage = getRandomPercentage();
  const printPercentage = getRandomPercentage();
  
  return {
    reportsAvailable: {
      count: '999/999',
      planType: 'Unlimited Plan'
    },
    sustainableProducts: {
      percentage: sustainablePercentage,
      trend: sustainablePercentage.includes('+') ? 'up' : 'down',
      nicheName: getRandomItem(sustainableNiches)
    },
    printNewspapers: {
      percentage: printPercentage,
      trend: printPercentage.includes('+') ? 'up' : 'down',
      nicheName: getRandomItem(printNiches)
    },
    hotOpportunity: {
      views: getRandomViews(),
      name: getRandomItem(opportunities),
      confidenceLevel: getRandomLevel(),
      riskLevel: getRandomLevel()
    },
    lastUpdated: new Date()
  };
};

// Format date to display "Last updated: [time]"
export const formatLastUpdated = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
