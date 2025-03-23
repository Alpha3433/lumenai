
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ValidationSummaryCardProps {
  score: number;
  positives: string[];
  negatives: string[];
  businessName: string;
}

const ValidationSummaryCard: React.FC<ValidationSummaryCardProps> = ({ 
  score, 
  positives, 
  negatives,
  businessName
}) => {
  // Generate market size data
  const tam = "20M";
  const sam = "500K";
  const som = "10K";
  
  return (
    <div className="space-y-8">
      {/* Market Size Estimations Section */}
      <Card className="border-none shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-center mb-6">Market size estimations for {businessName}</h3>
          
          <div className="flex justify-center items-center relative h-64">
            {/* TAM Circle */}
            <div className="absolute left-0 flex flex-col items-center">
              <div className="bg-green-500 rounded-full w-48 h-48 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">{tam}</div>
                  <div className="text-sm">TAM</div>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2 max-w-32 text-center">
                Individuals interested in interior design globally
              </p>
            </div>
            
            {/* SAM Circle */}
            <div className="absolute left-1/3 flex flex-col items-center">
              <div className="bg-green-700 rounded-full w-40 h-40 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">{sam}</div>
                  <div className="text-sm">SAM</div>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-2 max-w-32 text-center">
                Individuals in {businessName.split(' ')[0]} interested in tailored interior design services for small spaces
              </p>
            </div>
            
            {/* SOM Circle */}
            <div className="absolute right-0 flex flex-col items-center">
              <div className="bg-green-900 rounded-full w-32 h-32 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-xl font-bold">{som}</div>
                  <div className="text-sm">SOM</div>
                </div>
              </div>
              <p className="text-xs text-green-800 mt-2 max-w-32 text-center">
                Potential clients in {businessName.split(' ')[0]} likely to engage in the next year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Viability Section */}
      <Card className="border-none shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-center mb-6">Viability for {businessName}</h3>
          
          <div className="flex justify-center items-center">
            <div className="relative w-72 h-40">
              {/* Gauge Background */}
              <div className="absolute top-0 left-0 w-full h-40">
                <svg viewBox="0 0 200 100" className="w-full">
                  <path 
                    d="M10,90 A80,80 0 0,1 190,90" 
                    fill="none" 
                    stroke="#047857" 
                    strokeWidth="20"
                  />
                  <path 
                    d="M10,90 A80,80 0 0,1 190,90" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="20"
                    strokeDasharray="282.7"
                    strokeDashoffset={(100 - score) * 2.827}
                  />
                </svg>
                
                {/* Gauge Needle */}
                <div 
                  className="absolute top-[85px] left-1/2 transform -translate-x-1/2 origin-bottom rotate-0"
                  style={{ transform: `translateX(-50%) rotate(${(score - 50) * 1.8}deg)` }}
                >
                  <div className="bg-purple-600 w-1 h-24 rounded-t-full"></div>
                  <div className="bg-gray-700 w-4 h-4 rounded-full -mt-1 ml-[-6px]"></div>
                </div>
                
                {/* Score in center */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-3xl font-bold">{score}%</div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
            The viability score is based on a comprehensive analysis of your business model, market size, SWOT, PESTEL, and Porter's Five Forces.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationSummaryCard;
