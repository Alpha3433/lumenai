import { BusinessIdeaPreferences, BusinessIdeaSuggestion } from './types';
import { technologyIdeas } from './technology';
import { healthcareIdeas } from './healthcare';
import { educationIdeas } from './education';
import { financeIdeas } from './finance';
import { ecommerceIdeas } from './ecommerce';
import { foodIdeas } from './food';
import { sustainabilityIdeas } from './sustainability';
import { generalIdeas } from './general';

// Map industries to their corresponding idea arrays
export const ideaCollections: Record<string, BusinessIdeaSuggestion[]> = {
  'technology': technologyIdeas,
  'healthcare': healthcareIdeas,
  'education': educationIdeas,
  'finance': financeIdeas,
  'ecommerce': ecommerceIdeas,
  'food': foodIdeas,
  'sustainability': sustainabilityIdeas
};

// Keep track of recently generated ideas to avoid repetition
const recentlyGeneratedIdeas = new Set<string>();

// Get random ideas from a specific industry or general pool
export function getRandomIdea(industry?: string): BusinessIdeaSuggestion {
  // Determine which collection to use based on industry
  const collection = industry && ideaCollections[industry] 
    ? ideaCollections[industry] 
    : generalIdeas;
  
  // Try to find an idea that hasn't been used recently
  let attempts = 0;
  let idea: BusinessIdeaSuggestion;
  
  do {
    const randomIndex = Math.floor(Math.random() * collection.length);
    idea = collection[randomIndex];
    attempts++;
    // If we've tried too many times or the set is getting too large, just use what we have
    if (attempts > 10 || recentlyGeneratedIdeas.size > 50) {
      break;
    }
  } while (recentlyGeneratedIdeas.has(idea.businessName));
  
  // Add this idea to the recently used set to avoid repetition
  recentlyGeneratedIdeas.add(idea.businessName);
  
  // If the set gets too large, clear out the oldest entries
  if (recentlyGeneratedIdeas.size > 50) {
    const entriesToRemove = recentlyGeneratedIdeas.size - 30;
    const iterator = recentlyGeneratedIdeas.values();
    for (let i = 0; i < entriesToRemove; i++) {
      recentlyGeneratedIdeas.delete(iterator.next().value);
    }
  }
  
  return idea;
}

// Function to generate mock business idea for development/testing
export function generateMockBusinessIdea(preferences: BusinessIdeaPreferences): BusinessIdeaSuggestion {
  return getRandomIdea(preferences.industry);
}
