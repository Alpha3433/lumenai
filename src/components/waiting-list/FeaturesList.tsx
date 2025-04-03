
import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  'AI-powered insights',
  'Market analysis',
  'Investor-ready plans',
  'Early access discount',
  'Premium templates',
  'Priority support'
];

const FeaturesList = () => {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
