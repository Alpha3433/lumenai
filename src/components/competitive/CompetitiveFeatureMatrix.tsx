import React from 'react';
import { Check, X, BarChart2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CompetitiveFeatureMatrixProps {
  businessName: string;
  businessDescription: string;
}

const CompetitiveFeatureMatrix: React.FC<CompetitiveFeatureMatrixProps> = ({ 
  businessName,
  businessDescription
}) => {
  // Generate features and competitors based on business description
  const { features, competitors } = generateFeaturesAndCompetitors(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Competitive Feature Matrix
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Market differentiation analysis
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Feature</TableHead>
              {competitors.map((competitor, index) => (
                <TableHead key={index} className="text-center">{competitor}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                {feature.availability.map((available, i) => (
                  <TableCell key={i} className="text-center">
                    {available ? 
                      <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                      <X className="h-5 w-5 text-red-500 mx-auto" />}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>This competitive analysis highlights key differentiators and market gaps that can be exploited.</p>
      </div>
    </section>
  );
};

// Helper function to generate features and competitors based on business description
function generateFeaturesAndCompetitors(businessName: string, businessDescription: string) {
  // Extract business domain/industry from description to generate relevant features
  const description = businessDescription.toLowerCase();
  
  // Initialize competitors array with the business name as first competitor
  const competitors = [businessName];
  
  // Default features that would apply to most businesses
  let features = [
    { name: "Modern User Interface", availability: [true] },
    { name: "Mobile App", availability: [true] },
    { name: "Data Analytics Dashboard", availability: [true] }
  ];
  
  // Add competitors based on industry detected in description
  if (description.includes('health') || description.includes('fitness') || description.includes('wellness')) {
    competitors.push("FitnessPro", "HealthTracker");
    features = [
      ...features,
      { name: "AI-Personalization", availability: [true] },
      { name: "Healthcare Integrations", availability: [true] },
      { name: "Nutrition Tracking", availability: [true] }
    ];
  } 
  else if (description.includes('finance') || description.includes('banking') || description.includes('invest')) {
    competitors.push("WealthWise", "FinanceIQ");
    features = [
      ...features,
      { name: "AI Financial Planning", availability: [true] },
      { name: "Bank Integrations", availability: [true] },
      { name: "Investment Analytics", availability: [true] }
    ];
  }
  else if (description.includes('education') || description.includes('learning') || description.includes('teach')) {
    competitors.push("EduMaster", "LearnHub");
    features = [
      ...features,
      { name: "Interactive Lessons", availability: [true] },
      { name: "Progress Tracking", availability: [true] },
      { name: "Certification System", availability: [true] }
    ];
  }
  else if (description.includes('ecommerce') || description.includes('shop') || description.includes('retail')) {
    competitors.push("ShopifyPlus", "RetailNow");
    features = [
      ...features,
      { name: "AI Product Recommendations", availability: [true] },
      { name: "Inventory Management", availability: [true] },
      { name: "Multi-channel Sales", availability: [true] }
    ];
  }
  else if (description.includes('food') || description.includes('restaurant') || description.includes('delivery')) {
    competitors.push("FoodDash", "MealMaster");
    features = [
      ...features,
      { name: "Real-time Order Tracking", availability: [true] },
      { name: "Dietary Preference Filters", availability: [true] },
      { name: "Loyalty Program", availability: [true] }
    ];
  }
  else {
    // Generic competitors for any other business type
    competitors.push("Competitor A", "Competitor B");
    features = [
      ...features,
      { name: "AI-Personalization", availability: [true] },
      { name: "24/7 Customer Support", availability: [true] },
      { name: "Advanced Automation", availability: [true] }
    ];
  }
  
  // Generate competitive landscape - your business has all features, competitors have some
  features = features.map(feature => {
    // For each competitor, decide if they have this feature
    // First competitor (your business) always has all features
    // Others have varying feature availability - this creates differentiation
    const availability = [true]; // Your business
    
    // For each competitor, determine if they have this feature (roughly 50% chance)
    for (let i = 1; i < competitors.length; i++) {
      // Strategic feature allocation - make competitors weaker in advanced features
      const hasAdvancedFeature = feature.name.includes('AI') || 
                               feature.name.includes('Advanced') || 
                               feature.name.includes('Integration');
      
      // Lower chance for competitors to have advanced features (30% vs 70%)
      const hasFeature = Math.random() < (hasAdvancedFeature ? 0.3 : 0.7);
      availability.push(hasFeature);
    }
    
    return { ...feature, availability };
  });
  
  return { features, competitors };
}

export default CompetitiveFeatureMatrix;
