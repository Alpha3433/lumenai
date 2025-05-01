
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepThreeProps {
  formData: {
    logoStyle: string;
    usageContext: string;
    inspiration: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="logoStyle">Logo Style</Label>
        <Input
          id="logoStyle"
          name="logoStyle"
          placeholder="e.g., wordmark, lettermark, abstract symbol, mascot"
          value={formData.logoStyle}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="usageContext">Usage Context</Label>
        <Input
          id="usageContext"
          name="usageContext"
          placeholder="e.g., website headers, social media, packaging"
          value={formData.usageContext}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inspiration">Design Inspiration</Label>
        <Input
          id="inspiration"
          name="inspiration"
          placeholder="e.g., minimalist, vintage, specific brands"
          value={formData.inspiration}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default StepThree;
