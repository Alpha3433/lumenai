
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { generateBusinessPlan } from '@/utils/planGenerator';

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
    businessDescription: '',
    industry: '',
    targetMarket: '',
    businessGoals: '',
    competitorInfo: '',
    revenue: '',
    timePeriod: '1-year'
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanData>(defaultBusinessPlan);
  const [currentTab, setCurrentTab] = useState('executive-summary');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        value={formData.industry} 
                        onValueChange={(value) => handleSelectChange('industry', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="targetMarket">Target Market</Label>
                      <Input
                        id="targetMarket"
                        name="targetMarket"
                        value={formData.targetMarket}
                        onChange={handleInputChange}
                        placeholder="e.g., Small businesses, Young professionals"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="revenue">Expected Revenue (Annual)</Label>
                      <Input
                        id="revenue"
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        placeholder="e.g., $100,000"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your business, product, or service..."
                        required
                        className="mt-1 min-h-24"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessGoals">Business Goals</Label>
                      <Textarea
                        id="businessGoals"
                        name="businessGoals"
                        value={formData.businessGoals}
                        onChange={handleInputChange}
                        placeholder="What are your short and long-term goals?"
                        className="mt-1 min-h-24"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="competitorInfo">Competitor Information</Label>
                      <Textarea
                        id="competitorInfo"
                        name="competitorInfo"
                        value={formData.competitorInfo}
                        onChange={handleInputChange}
                        placeholder="Who are your main competitors?"
                        className="mt-1 min-h-24"
                      />
                    </div>
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
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{formData.businessName} Business Plan</h1>
              <p className="text-gray-600 dark:text-gray-300">Generated based on your inputs</p>
            </div>
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2"
              onClick={downloadPlan}
            >
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <Tabs defaultValue="executive-summary" value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
                  <TabsTrigger value="executive-summary">Summary</TabsTrigger>
                  <TabsTrigger value="market-analysis">Market</TabsTrigger>
                  <TabsTrigger value="business-model">Model</TabsTrigger>
                  <TabsTrigger value="marketing-plan">Marketing</TabsTrigger>
                  <TabsTrigger value="financial-projections">Financial</TabsTrigger>
                  <TabsTrigger value="risk-assessment">Risks</TabsTrigger>
                  <TabsTrigger value="implementation-timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="swot-analysis">SWOT</TabsTrigger>
                </TabsList>
                
                <TabsContent value="executive-summary" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Executive Summary</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.executiveSummary || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="market-analysis" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Market Analysis</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.marketAnalysis || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="business-model" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Business Model</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.businessModel || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="marketing-plan" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Marketing Plan</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.marketingPlan || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="financial-projections" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Financial Projections</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.financialProjections || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="risk-assessment" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Risk Assessment</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.riskAssessment || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation-timeline" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">Implementation Timeline</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.implementationTimeline || "Loading..."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="swot-analysis" className="space-y-4 animate-fade-in">
                  <h2 className="text-xl font-semibold">SWOT Analysis</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{businessPlan.swotAnalysis || "Loading..."}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => setStep(1)}
            >
              Start Over
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500" /> 
              Your business plan is ready
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCreator;
