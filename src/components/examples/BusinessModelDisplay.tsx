
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, TrendingUp, Users, CreditCard, ShoppingBag, Radio, Zap, Heart } from 'lucide-react';

interface BusinessModelDisplayProps {
  company: any;
}

const BusinessModelDisplay: React.FC<BusinessModelDisplayProps> = ({ company }) => {
  const businessModelData = company.businessModel || {
    revenueStreams: [
      { name: "Product Sales", description: "Direct revenue from product purchases" },
      { name: "Subscription Services", description: "Recurring revenue from subscription offerings" },
      { name: "Licensing", description: "Revenue from licensing technology and intellectual property" },
      { name: "Professional Services", description: "Revenue from consulting and implementation services" }
    ],
    customerSegments: [
      { name: "Enterprise Businesses", description: "Large corporations with complex needs" },
      { name: "Small & Medium Businesses", description: "Growing companies seeking scalable solutions" },
      { name: "Government & Public Sector", description: "Public organizations with specific requirements" },
      { name: "Individual Consumers", description: "End users with personal needs" }
    ],
    valueProposition: [
      "Industry-leading product quality and reliability",
      "Innovative technology solutions that solve complex problems",
      "Comprehensive customer support and service excellence",
      "Seamless integration with existing business workflows"
    ],
    keySuccessFactors: [
      "Strong brand recognition and market positioning",
      "Continuous product innovation and development",
      "Strategic partnerships and alliance networks",
      "Efficient supply chain and distribution channels"
    ]
  };

  const iconMap = {
    "Product Sales": <ShoppingBag className="h-5 w-5 text-purple-500" />,
    "Subscription Services": <Radio className="h-5 w-5 text-blue-500" />,
    "Licensing": <CreditCard className="h-5 w-5 text-amber-500" />,
    "Professional Services": <Users className="h-5 w-5 text-green-500" />,
    "Enterprise Businesses": <TrendingUp className="h-5 w-5 text-red-500" />,
    "Small & Medium Businesses": <Zap className="h-5 w-5 text-orange-500" />,
    "Government & Public Sector": <Heart className="h-5 w-5 text-indigo-500" />,
    "Individual Consumers": <ShoppingBag className="h-5 w-5 text-sky-500" />
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Business Model Analysis</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Analysis of {company.name}'s business model, including revenue streams, customer segments, and value proposition.
      </p>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {businessModelData.revenueStreams.map((stream, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  {iconMap[stream.name] || <CreditCard className="h-5 w-5 text-blue-500" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{stream.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stream.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Customer Segments</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {businessModelData.customerSegments.map((segment, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  {iconMap[segment.name] || <Users className="h-5 w-5 text-green-500" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{segment.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{segment.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Key Value Propositions</h3>
        <div className="space-y-3">
          {businessModelData.valueProposition.map((proposition, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{proposition}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Card className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Success Factors</h3>
          <div className="space-y-3">
            {businessModelData.keySuccessFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{factor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModelDisplay;
