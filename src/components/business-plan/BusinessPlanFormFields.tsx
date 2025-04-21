
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import AIEngineSelector from './AIEngineSelector';

interface BusinessPlanFormFieldsProps {
  formData: {
    businessName: string;
    businessDescription: string;
    useAIV2: boolean;
  };
  errors: {
    businessName?: string;
    businessDescription?: string;
  };
  isPremium: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleChange: (name: string, value: boolean) => void;
  onUpgrade: () => void;
}

const BusinessPlanFormFields = ({
  formData,
  errors,
  isPremium,
  onChange,
  onToggleChange,
  onUpgrade
}: BusinessPlanFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-1">
        <Label htmlFor="businessName" className={errors.businessName ? "text-destructive" : ""}>
          Business Name
        </Label>
        <Input
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={onChange}
          placeholder="e.g., Acme Corporation"
          required
          className={`mt-1 ${errors.businessName ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
        {errors.businessName && (
          <p className="text-sm font-medium text-destructive">{errors.businessName}</p>
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="businessDescription" className={errors.businessDescription ? "text-destructive" : ""}>
          Business Description
        </Label>
        <Textarea
          id="businessDescription"
          name="businessDescription"
          value={formData.businessDescription}
          onChange={onChange}
          placeholder="Describe your business, product, or service in detail. Include information about your target market, goals, competitors, and expected revenue."
          required
          className={`mt-1 min-h-40 ${errors.businessDescription ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
        {errors.businessDescription && (
          <p className="text-sm font-medium text-destructive">{errors.businessDescription}</p>
        )}
      </div>

      <AIEngineSelector 
        useAIV2={formData.useAIV2}
        isPremium={isPremium}
        onToggleChange={onToggleChange}
        onUpgrade={onUpgrade}
      />
    </div>
  );
};

export default BusinessPlanFormFields;
