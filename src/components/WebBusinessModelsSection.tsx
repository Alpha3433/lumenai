
import React from 'react';
import WebBusinessModelsHeader from './web-business-models/WebBusinessModelsHeader';
import BusinessModelsList from './web-business-models/BusinessModelsList';
import BusinessModelsLoadingState from './web-business-models/BusinessModelsLoadingState';
import BusinessModelsErrorState from './web-business-models/BusinessModelsErrorState';
import BusinessModelsEmptyState from './web-business-models/BusinessModelsEmptyState';
import { useBusinessModels } from './web-business-models/useBusinessModels';
import { Globe } from 'lucide-react';

interface WebBusinessModelsSectionProps {
  businessName: string;
  businessDescription: string;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

const WebBusinessModelsSection: React.FC<WebBusinessModelsSectionProps> = ({
  businessName,
  businessDescription,
  isPremium = true,
  onUpgrade
}) => {
  const {
    businessModels,
    loading,
    error,
    refreshing,
    generateBusinessModels,
    handleRefresh
  } = useBusinessModels(businessName, businessDescription, true);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Web Business Models</h2>
        </div>
      </div>
      
      {loading ? (
        <BusinessModelsLoadingState />
      ) : error ? (
        <BusinessModelsErrorState error={error} onRetry={generateBusinessModels} />
      ) : businessModels.length > 0 ? (
        <BusinessModelsList models={businessModels} />
      ) : (
        <BusinessModelsEmptyState onGenerate={generateBusinessModels} />
      )}
    </section>
  );
};

export default WebBusinessModelsSection;
