
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

// Helper function to generate features and competitors
function generateFeaturesAndCompetitors(businessName: string, businessDescription: string) {
  // This would ideally be dynamic based on the business description
  // For now we'll provide a generic but realistic matrix
  
  const competitors = [businessName, "Competitor A", "Competitor B"];
  
  const features = [
    {
      name: "AI-Personalization",
      availability: [true, false, false]
    },
    {
      name: "Modern User Interface",
      availability: [true, true, false]
    },
    {
      name: "Mobile App",
      availability: [true, true, true]
    },
    {
      name: "Healthcare Integrations",
      availability: [true, false, false]
    },
    {
      name: "Data Analytics Dashboard",
      availability: [true, false, true]
    },
    {
      name: "24/7 Customer Support",
      availability: [true, false, false]
    }
  ];
  
  return { features, competitors };
}

export default CompetitiveFeatureMatrix;
