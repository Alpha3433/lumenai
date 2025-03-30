
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
      <WebBusinessModelsHeader 
        onRefresh={handleRefresh} 
        loading={loading} 
        refreshing={refreshing}
      />
      
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
