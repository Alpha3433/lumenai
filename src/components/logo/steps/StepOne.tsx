
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepOneProps {
  formData: {
    brandName: string;
    industry: string;
    adjectives: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name *</Label>
        <Input
          id="brandName"
          name="brandName"
          placeholder="Enter your brand name"
          value={formData.brandName}
          onChange={handleInputChange}
          required
        />
        <p className="text-sm text-muted-foreground">
          This will be prominently displayed in your logo.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="e.g., Technology, Healthcare, Food & Beverage"
          value={formData.industry}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adjectives">Brand Attributes</Label>
        <Input
          id="adjectives"
          name="adjectives"
          placeholder="e.g., modern, premium, playful, minimalist, bold"
          value={formData.adjectives}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          3-5 adjectives that describe your brand's identity
        </p>
      </div>
    </div>
  );
};

export default StepOne;
