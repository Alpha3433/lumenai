
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface ExecutiveSummaryDisplayProps {
  company: any;
}

const ExecutiveSummaryDisplay: React.FC<ExecutiveSummaryDisplayProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {company.executiveSummary || 
           `${company.name} is a leading player in the ${company.industry} industry, known for its innovative approaches and market dominance. With headquarters in ${company.headquarters}, the company has established a strong global presence and continues to expand its reach into new markets.`}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Founded in {company.founded}, {company.name} has grown to become one of the most valuable companies in its sector, with annual revenues of {company.revenue}. The company employs thousands of professionals worldwide and is committed to sustainable practices and technological innovation.
        </p>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Business Overview</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {company.businessOverview || company.shortDescription}
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Products & Services</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              {(company.keyProducts || ['Product 1', 'Product 2', 'Product 3']).map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Target Markets</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
              {(company.targetMarkets || ['Market 1', 'Market 2', 'Market 3']).map((market, index) => (
                <li key={index}>{market}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryDisplay;
