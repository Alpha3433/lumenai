
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, FileText, CheckCircle, Sparkles, Activity, FileStack, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { generateBusinessPlan } from '@/utils/planGenerator';
import SwotAnalysis from '@/components/SwotAnalysis';
import TimelineChart from '@/components/TimelineChart';
import { Separator } from '@/components/ui/separator';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  implementationTimeline: string;
  swotAnalysis: string;
}

const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
  implementationTimeline: '',
  swotAnalysis: ''
};

const PlanCreator = () => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: ''
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    
    try {
      // In a real app, this would call the API with the form data
      const plan = await generateBusinessPlan(formData);
      setBusinessPlan(plan);
      setStep(2);
    } catch (error) {
      console.error('Error generating business plan:', error);
      // Handle error
    } finally {
      setGenerating(false);
    }
  };

  const downloadPlan = () => {
    // This would handle downloading the plan as PDF
    alert('In a production app, this would download the generated business plan as a PDF');
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      {step === 1 ? (
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
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
      ) : (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{formData.businessName} Business Plan</h1>
              <p className="text-gray-600 dark:text-gray-300">Generated based on your inputs</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-2"
                onClick={() => setStep(1)}
              >
                Start Over
              </Button>
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-2"
                onClick={downloadPlan}
              >
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-8">
              {/* Executive Summary */}
              <section className="mb-12 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                  Executive Summary
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                    {businessPlan.executiveSummary || "Loading..."}
                  </p>
                </div>
              </section>
              
              <Separator className="my-10" />
              
              {/* SWOT Analysis */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Activity className="h-6 w-6 text-purple-500" />
                  SWOT Analysis
                </h2>
                <SwotAnalysis swotText={businessPlan.swotAnalysis} />
              </section>
              
              <Separator className="my-10" />
              
              {/* Two Column Layout for Middle Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* Market Analysis */}
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    Market Analysis
                  </h2>
                  <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-5">
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <p className="leading-relaxed">{businessPlan.marketAnalysis || "Loading..."}</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                {/* Business Model */}
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileStack className="h-5 w-5 text-green-500" />
                    Business Model
                  </h2>
                  <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-5">
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <p className="leading-relaxed">{businessPlan.businessModel || "Loading..."}</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                {/* Marketing Plan */}
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-500" />
                    Marketing Plan
                  </h2>
                  <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-5">
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <p className="leading-relaxed">{businessPlan.marketingPlan || "Loading..."}</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                {/* Risk Assessment */}
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-500" />
                    Risk Assessment
                  </h2>
                  <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-5">
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <p className="leading-relaxed">{businessPlan.riskAssessment || "Loading..."}</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
              
              <Separator className="my-10" />
              
              {/* Implementation Timeline */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-amber-500" />
                  Implementation Timeline
                </h2>
                <TimelineChart timelineText={businessPlan.implementationTimeline} />
              </section>
            </CardContent>
          </Card>
          
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4" /> 
              Your business plan is ready
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCreator;
