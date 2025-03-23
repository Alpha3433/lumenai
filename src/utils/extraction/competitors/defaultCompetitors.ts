
/**
 * Default competitor generation utilities
 */
import { Competitor } from './types';

/**
 * Create default competitors based on industry context when none are found
 */
export function createDefaultCompetitors(businessContext: string): Competitor[] {
  let industryPrefix = "Industry";
  
  if (businessContext.includes('tech') || businessContext.includes('software') || businessContext.includes('app')) {
    industryPrefix = "Tech";
  } else if (businessContext.includes('food') || businessContext.includes('restaurant')) {
    industryPrefix = "Food";
  } else if (businessContext.includes('health') || businessContext.includes('fitness')) {
    industryPrefix = "Health";
  } else if (businessContext.includes('finance') || businessContext.includes('banking')) {
    industryPrefix = "Finance";
  } else if (businessContext.includes('education') || businessContext.includes('learning')) {
    industryPrefix = "Education";
  } else if (businessContext.includes('travel') || businessContext.includes('tourism')) {
    industryPrefix = "Travel";
  }
  
  return [
    { 
      name: `${industryPrefix}Leader`, 
      marketShare: "32%", 
      founded: 2005, 
      annualRevenue: "$85M", 
      strength: "Strong market presence", 
      weakness: "Limited innovation" 
    },
    { 
      name: `${industryPrefix}Innovator`, 
      marketShare: "24%", 
      founded: 2012, 
      annualRevenue: "$42M", 
      strength: "Cutting-edge features", 
      weakness: "Higher price point" 
    },
    { 
      name: `${industryPrefix}Focus`, 
      marketShare: "18%", 
      founded: 2015, 
      annualRevenue: "$28M", 
      strength: "Superior customer service", 
      weakness: "Smaller market reach" 
    }
  ];
}
