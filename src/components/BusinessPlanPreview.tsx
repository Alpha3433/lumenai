
import React, { useState } from 'react';
import BusinessPlanActionBar from './BusinessPlanActionBar';
import VerticalTabs from './VerticalTabs';
import BusinessInfoDialog from './business-plan/BusinessInfoDialog';
import PreviewContent from './business-plan/PreviewContent';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

interface BusinessPlanPreviewProps {
  businessName: string;
  businessPlan: BusinessPlanData;
  isPremium?: boolean;
  onStartOver: () => void;
  onDownload: () => void;
  onUpgrade?: () => void;
  businessDescription?: string;
  onRefineBusinessInfo?: (name: string, description: string) => void;
}

const BusinessPlanPreview: React.FC<BusinessPlanPreviewProps> = ({
  businessName,
  businessPlan,
  isPremium = true,
  onStartOver,
  onDownload,
  onRefineBusinessInfo,
  businessDescription = ''
}) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [refinedName, setRefinedName] = useState(businessName);
  const [refinedDescription, setRefinedDescription] = useState(businessDescription);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSaveRefinements = () => {
    if (onRefineBusinessInfo) {
      onRefineBusinessInfo(refinedName, refinedDescription);
    }
    setIsEditingInfo(false);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="max-w-5xl mx-auto">
        <BusinessPlanActionBar 
          businessName={refinedName}
          onStartOver={onStartOver}
          onDownload={onDownload}
          onEdit={onRefineBusinessInfo ? () => setIsEditingInfo(true) : undefined}
        />
      </div>
      
      {onRefineBusinessInfo && (
        <BusinessInfoDialog
          open={isEditingInfo}
          onOpenChange={setIsEditingInfo}
          refinedName={refinedName}
          setRefinedName={setRefinedName}
          refinedDescription={refinedDescription}
          setRefinedDescription={setRefinedDescription}
          onSave={handleSaveRefinements}
        />
      )}
      
      <div className="max-w-[95%] xl:max-w-7xl mx-auto">
        <div className="relative flex rounded-xl overflow-hidden shadow-xl">
          <div className="hidden md:block w-56 z-20">
            <VerticalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="flex-1 bg-card/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-r-xl overflow-hidden">
            <PreviewContent 
              businessName={refinedName}
              businessDescription={refinedDescription}
              businessPlan={businessPlan}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPreview;
