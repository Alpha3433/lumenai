
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';

interface BusinessPlanFormProps {
  formData: {
    businessName: string;
    businessDescription: string;
  };
  generating: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BusinessPlanForm: React.FC<BusinessPlanFormProps> = ({
  formData,
  generating,
  onChange,
  onSubmit
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
          Step 1: Tell Us About Your Business
        </div>
        <h1 className="text-3xl font-bold mb-2">Create Your Business Plan</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Fill in the form below with details about your business, and our AI will generate a complete business plan for you.
        </p>
      </div>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={onChange}
                  placeholder="e.g., Acme Corporation"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={onChange}
                  placeholder="Describe your business, product, or service in detail. Include information about your target market, goals, competitors, and expected revenue."
                  required
                  className="mt-1 min-h-40"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-md flex items-center"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Generating
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> 
                    Generate Business Plan
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlanForm;
