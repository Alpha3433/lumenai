
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
  
  // If we don't have any problems, return empty categories
  if (allProblems.length === 0) {
    return [
      {
        priority: 'High',
        problems: [],
        action: 'Solve Immediately',
        description: 'Include these problems in your first product version for maximum impact.'
      },
      {
        priority: 'Medium',
        problems: [],
        action: 'Plan for these in your near-term roadmap',
        description: 'Address these issues in your next development cycle.'
      },
      {
        priority: 'Low',
        problems: [],
        action: 'Consider for future versions or discard',
        description: 'Keep these on your radar for future consideration.'
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
      problems: highPriorityProblems,
      action: 'Solve Immediately',
      description: 'Include these problems in your first product version for maximum impact.'
    },
    {
      priority: 'Medium',
      problems: mediumPriorityProblems,
      action: 'Plan for these in your near-term roadmap',
      description: 'Address these issues in your next development cycle.'
    },
    {
      priority: 'Low',
      problems: lowPriorityProblems.length > 0 ? lowPriorityProblems : ['None identified'],
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
