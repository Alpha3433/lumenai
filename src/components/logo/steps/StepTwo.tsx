
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepTwoProps {
  formData: {
    audience: string;
    emotions: string;
    colorPreference: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="audience">Target Audience</Label>
        <Input
          id="audience"
          name="audience"
          placeholder="e.g., millennial parents, tech entrepreneurs, Gen Z"
          value={formData.audience}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emotions">Emotional Associations</Label>
        <Input
          id="emotions"
          name="emotions"
          placeholder="e.g., trust, innovation, simplicity, fun"
          value={formData.emotions}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="colorPreference">Color Preferences</Label>
        <Input
          id="colorPreference"
          name="colorPreference"
          placeholder="e.g., blue and gold, earthy tones, vibrant colors"
          value={formData.colorPreference}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default StepTwo;
