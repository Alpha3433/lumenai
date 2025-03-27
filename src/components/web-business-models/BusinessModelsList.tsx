
import React from 'react';
import BusinessModelCard from './BusinessModelCard';
import { BusinessModel } from './types';

interface BusinessModelsListProps {
  models: BusinessModel[];
}

const BusinessModelsList: React.FC<BusinessModelsListProps> = ({ models }) => {
  return (
    <div className="space-y-5">
      {models.map((model, index) => (
        <BusinessModelCard key={index} model={model} />
      ))}
    </div>
  );
};

export default BusinessModelsList;
