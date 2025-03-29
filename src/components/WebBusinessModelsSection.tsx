
import React, { useEffect, useState } from 'react';
import WebBusinessModelsHeader from './web-business-models/WebBusinessModelsHeader';
import BusinessModelsList from './web-business-models/BusinessModelsList';
import BusinessModelsLoadingState from './web-business-models/BusinessModelsLoadingState';
import BusinessModelsErrorState from './web-business-models/BusinessModelsErrorState';
import BusinessModelsEmptyState from './web-business-models/BusinessModelsEmptyState';
import BusinessModelsPremiumCTA from './web-business-models/BusinessModelsPremiumCTA';
import { useBusinessModels } from './web-business-models/useBusinessModels';
import { Globe } from 'lucide-react';
import { BusinessModel } from './web-business-models/types';

interface WebBusinessModelsSectionProps {
  businessName: string;
  businessDescription: string;
  industry?: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

// Predefined business models for specific companies to ensure immediate display
const companyBusinessModels: Record<string, BusinessModel[]> = {
  'Apple': [
    {
      name: 'Premium Hardware Ecosystem',
      description: 'Integrated hardware products with software services creating a closed ecosystem that maximizes customer retention.',
      fitScore: 10,
      keyBenefits: ['High profit margins on hardware', 'Strong customer lock-in', 'Consistent revenue from upgrades'],
      implementationComplexity: 'High'
    },
    {
      name: 'Subscription Services',
      description: 'Recurring revenue from Apple Music, Apple TV+, iCloud, Apple Arcade, and other subscription-based services.',
      fitScore: 9,
      keyBenefits: ['Predictable revenue streams', 'Increased customer lifetime value', 'Data collection for product improvement'],
      implementationComplexity: 'Medium'
    },
    {
      name: 'App Store Platform Model',
      description: 'Platform connecting developers with users while taking a commission on transactions.',
      fitScore: 10,
      keyBenefits: ['30% commission on app sales', 'Zero marginal cost', 'Network effects'],
      implementationComplexity: 'High'
    }
  ],
  'Amazon': [
    {
      name: 'Marketplace Platform',
      description: 'Two-sided marketplace connecting buyers and third-party sellers with Amazon taking a commission on sales.',
      fitScore: 10,
      keyBenefits: ['Commission on third-party sales', 'Network effects', 'Minimal inventory risk'],
      implementationComplexity: 'High'
    },
    {
      name: 'Subscription Model (Prime)',
      description: 'Membership program offering free shipping, streaming content, and other benefits for annual/monthly fee.',
      fitScore: 9,
      keyBenefits: ['Recurring revenue', 'Increased purchase frequency', 'Customer loyalty'],
      implementationComplexity: 'Medium'
    },
    {
      name: 'Cloud Infrastructure (AWS)',
      description: 'On-demand computing resources and services with pay-as-you-go pricing model.',
      fitScore: 9,
      keyBenefits: ['High margins', 'Economies of scale', 'Recurring revenue'],
      implementationComplexity: 'High'
    }
  ],
  'Google': [
    {
      name: 'Ad-Supported Platform',
      description: 'Free services supported by targeted advertising based on user data and search intent.',
      fitScore: 10,
      keyBenefits: ['Massive user base', 'Intent-based targeting', 'Scalable revenue model'],
      implementationComplexity: 'High'
    },
    {
      name: 'Cloud Services Platform',
      description: 'Google Cloud Platform offering infrastructure, platform and software as a service with usage-based billing.',
      fitScore: 9,
      keyBenefits: ['Recurring revenue', 'Enterprise relationships', 'Synergy with other Google products'],
      implementationComplexity: 'High'
    },
    {
      name: 'Freemium SaaS',
      description: 'Free basic services with premium features for Google Workspace (formerly G Suite) business customers.',
      fitScore: 8,
      keyBenefits: ['Upsell opportunities', 'Market penetration', 'Recurring subscription revenue'],
      implementationComplexity: 'Medium'
    }
  ],
  'Microsoft': [
    {
      name: 'Software as a Service (SaaS)',
      description: 'Subscription-based access to Microsoft 365 and other cloud-based productivity applications.',
      fitScore: 10,
      keyBenefits: ['Predictable recurring revenue', 'Reduced piracy', 'Continuous updates and improvements'],
      implementationComplexity: 'Medium'
    },
    {
      name: 'Cloud Infrastructure Services',
      description: 'Microsoft Azure providing cloud computing services with pay-as-you-go pricing model.',
      fitScore: 9,
      keyBenefits: ['High growth potential', 'Enterprise customer base', 'Economies of scale'],
      implementationComplexity: 'High'
    },
    {
      name: 'Gaming Ecosystem',
      description: 'Xbox hardware, Game Pass subscription service, and game development studios creating an integrated gaming platform.',
      fitScore: 8,
      keyBenefits: ['Multiple revenue streams', 'Customer lock-in', 'Content ownership'],
      implementationComplexity: 'High'
    }
  ],
  'Tesla': [
    {
      name: 'Premium Direct-to-Consumer',
      description: 'Direct sales of electric vehicles to consumers, bypassing traditional dealership networks.',
      fitScore: 10,
      keyBenefits: ['Higher profit margins', 'Price control', 'Direct customer relationships'],
      implementationComplexity: 'High'
    },
    {
      name: 'Software-Enhanced Hardware',
      description: 'Vehicles with software upgrades and feature enhancements available for purchase after initial sale.',
      fitScore: 9,
      keyBenefits: ['Ongoing revenue from existing customers', 'Higher product value over time', 'Data collection for improvement'],
      implementationComplexity: 'Medium'
    },
    {
      name: 'Energy Ecosystem',
      description: 'Integrated clean energy products including solar panels, Powerwall batteries, and vehicle charging networks.',
      fitScore: 8,
      keyBenefits: ['Synergistic product offerings', 'Recurring energy revenue', 'Brand reinforcement'],
      implementationComplexity: 'High'
    }
  ]
};

const WebBusinessModelsSection: React.FC<WebBusinessModelsSectionProps> = ({
  businessName,
  businessDescription,
  industry,
  isPremium,
  onUpgrade
}) => {
  const [predefinedModels, setPredefinedModels] = useState<BusinessModel[]>([]);
  
  const {
    businessModels,
    loading,
    error,
    refreshing,
    generateBusinessModels,
    handleRefresh
  } = useBusinessModels(businessName, businessDescription, isPremium);

  // Check if we have predefined models for this company
  useEffect(() => {
    if (companyBusinessModels[businessName]) {
      setPredefinedModels(companyBusinessModels[businessName]);
    } else {
      setPredefinedModels([]);
    }
  }, [businessName]);

  if (!isPremium) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Web Business Models</h2>
        </div>
        <BusinessModelsPremiumCTA onUpgrade={onUpgrade} />
      </section>
    );
  }

  // Use predefined models if available, otherwise use API-generated models
  const modelsToDisplay = predefinedModels.length > 0 ? predefinedModels : businessModels;

  return (
    <section className="mb-12">
      <WebBusinessModelsHeader 
        onRefresh={handleRefresh} 
        loading={loading} 
        refreshing={refreshing}
        companyName={businessName}
        industry={industry}
      />
      
      {loading && predefinedModels.length === 0 ? (
        <BusinessModelsLoadingState />
      ) : error && predefinedModels.length === 0 ? (
        <BusinessModelsErrorState error={error} onRetry={generateBusinessModels} />
      ) : modelsToDisplay.length > 0 ? (
        <BusinessModelsList models={modelsToDisplay} />
      ) : (
        <BusinessModelsEmptyState onGenerate={generateBusinessModels} />
      )}
    </section>
  );
};

export default WebBusinessModelsSection;
