
import { SwotComponents } from './swotUtils';

export interface ProblemCategory {
  priority: 'High' | 'Medium' | 'Low';
  problems: string[];
  action: string;
  description: string;
}

// Extract problems from weaknesses and threats in SWOT analysis
export const extractProblemsFromSwot = (swotData: SwotComponents): ProblemCategory[] => {
  // Combine weaknesses and threats to form our problem base
  const allProblems = [...swotData.weaknesses, ...swotData.threats];
  
  // If we don't have any problems, return categories with helpful messages
  if (allProblems.length === 0) {
    return [
      {
        priority: 'High',
        problems: ["No immediate critical issues identified. Focus on preventive measures for potential industry disruptions."],
        action: 'Focus on Growth Opportunities',
        description: 'Since no critical problems were identified, allocate resources toward capitalizing on your strengths and market opportunities.'
      },
      {
        priority: 'Medium',
        problems: ["Consider conducting a competitive analysis to identify potential blind spots in your business model."],
        action: 'Develop Monitoring Systems',
        description: 'Establish KPIs and monitoring mechanisms to detect early warning signs of potential market threats.'
      },
      {
        priority: 'Low',
        problems: ["Maintain awareness of industry trends and regulatory changes that could impact your business in the future."],
        action: 'Quarterly Review Process',
        description: 'Schedule regular reviews to reassess market conditions and update your SWOT analysis accordingly.'
      }
    ];
  }
  
  // Categorize problems by priority
  // The prioritization logic here can be enhanced with more sophisticated algorithms
  // Currently using a simple approach: first N problems are high, next M are medium, rest are low
  // where N and M are proportional to the total number of problems
  const totalProblems = allProblems.length;
  const highPriorityCount = Math.max(1, Math.min(5, Math.ceil(totalProblems * 0.4)));
  const mediumPriorityCount = Math.max(1, Math.min(6, Math.ceil(totalProblems * 0.4)));
  
  // Sort problems by length and perceived importance (for simplicity, longer problems might be more detailed)
  const sortedProblems = [...allProblems].sort((a, b) => {
    // Check for keywords indicating importance
    const aImportance = getImportanceScore(a);
    const bImportance = getImportanceScore(b);
    
    if (aImportance !== bImportance) {
      return bImportance - aImportance;
    }
    
    // If same importance, sort by length as a fallback
    return b.length - a.length;
  });
  
  // Create the problem categories
  const highPriorityProblems = sortedProblems.slice(0, highPriorityCount);
  const mediumPriorityProblems = sortedProblems.slice(
    highPriorityCount, 
    highPriorityCount + mediumPriorityCount
  );
  const lowPriorityProblems = sortedProblems.slice(
    highPriorityCount + mediumPriorityCount
  );
  
  return [
    {
      priority: 'High',
      problems: highPriorityProblems.length > 0 ? highPriorityProblems : ["No critical issues identified. Focus on preventive measures and growth opportunities."],
      action: 'Solve Immediately',
      description: 'Include these problems in your first product version for maximum impact.'
    },
    {
      priority: 'Medium',
      problems: mediumPriorityProblems.length > 0 ? mediumPriorityProblems : ["Consider conducting a competitive analysis to identify potential blind spots in your business model."],
      action: 'Plan for these in your near-term roadmap',
      description: 'Address these issues in your next development cycle.'
    },
    {
      priority: 'Low',
      problems: lowPriorityProblems.length > 0 ? lowPriorityProblems : ["Maintain awareness of industry trends and regulatory changes that could impact your business in the future."],
      action: 'Consider for future versions or discard',
      description: 'Keep these on your radar for future consideration.'
    }
  ];
};

// Helper function to determine importance score based on keywords
const getImportanceScore = (problem: string): number => {
  const text = problem.toLowerCase();
  let score = 0;
  
  // High importance keywords
  const highKeywords = ['critical', 'severe', 'significant', 'major', 'urgent', 'immediately', 'crucial', 'serious'];
  highKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 3;
  });
  
  // Medium importance keywords
  const mediumKeywords = ['important', 'considerable', 'moderate', 'notable', 'substantial', 'challenge'];
  mediumKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 2;
  });
  
  // Low importance keywords
  const lowKeywords = ['minor', 'small', 'slight', 'minimal', 'marginal', 'limited'];
  lowKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 1;
  });
  
  return score;
};
