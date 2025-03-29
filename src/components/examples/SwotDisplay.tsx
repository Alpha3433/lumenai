
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SwotDisplayProps {
  company: any;
}

const SwotDisplay: React.FC<SwotDisplayProps> = ({ company }) => {
  const swotData = company.swot || {
    strengths: [
      "Strong brand recognition and market presence",
      "Robust financial performance with substantial revenue",
      "Innovative product development and technology",
      "Extensive global distribution network"
    ],
    weaknesses: [
      "Dependency on specific market segments",
      "High operating costs in certain regions",
      "Product pricing challenges in emerging markets",
      "Regulatory compliance challenges in some territories"
    ],
    opportunities: [
      "Expansion into emerging markets",
      "Digital transformation and technological advancements",
      "Strategic acquisitions and partnerships",
      "Growing demand for sustainable products"
    ],
    threats: [
      "Intense industry competition",
      "Changing consumer preferences",
      "Economic downturns affecting consumer spending",
      "Regulatory changes in key markets"
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">SWOT Analysis</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        A comprehensive analysis of {company.name}'s internal Strengths and Weaknesses, 
        along with external Opportunities and Threats.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-500 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {swotData.strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-500 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-500 mb-3">Weaknesses</h3>
            <ul className="space-y-2">
              {swotData.weaknesses.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-500 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-500 mb-3">Opportunities</h3>
            <ul className="space-y-2">
              {swotData.opportunities.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-500 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-500 mb-3">Threats</h3>
            <ul className="space-y-2">
              {swotData.threats.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwotDisplay;
