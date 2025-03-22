import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, FileText, CheckCircle, Sparkles, Activity, FileStack, Lock, Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { generateBusinessPlan } from '@/utils/planGenerator';
import SwotAnalysis from '@/components/SwotAnalysis';
import MarketAnalysisSection from '@/components/MarketAnalysisSection';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BusinessPlanData {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

const defaultBusinessPlan: BusinessPlanData = {
  executiveSummary: '',
  marketAnalysis: '',
  businessModel: '',
  marketingPlan: '',
  financialProjections: '',
  riskAssessment: '',
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
  const [isPremium, setIsPremium] = useState(false);

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

  const upgradeAccount = () => {
    setIsPremium(true);
    alert('In a production app, this would redirect to a payment page. For demo purposes, you now have premium access!');
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
              
              {/* Market Analysis - Now using our new component */}
              <MarketAnalysisSection analysisText={businessPlan.marketAnalysis} />
              
              <Separator className="my-10" />
              
              {/* Business Model - Redesigned section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Building className="h-6 w-6 text-teal-500" />
                  Business Model
                </h2>
                
                <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
                  <CardContent className="p-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
                        <TabsTrigger value="operations">Operations</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Value Proposition</h3>
                            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
                              <p className="text-gray-800 dark:text-gray-200">
                                {businessPlan.businessModel.split('.').slice(0, 2).join('.') + '.' || "Loading..."}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">Target Customers</h3>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                              <p className="text-gray-800 dark:text-gray-200">
                                {businessPlan.businessModel.split('.').slice(2, 4).join('.') + '.' || "Loading..."}
                              </p>
                            </div>
                          </div>
                          
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Core Strategy</h3>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <p className="text-gray-800 dark:text-gray-200">
                                {businessPlan.businessModel.split('.').slice(4).join('.') || "Loading..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="revenue" className="p-2">
                        <div className="space-y-6">
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
                            <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Primary Revenue Sources</h3>
                            <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(0, 3).join('.') + '.' || "Loading..."}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Pricing Strategy</h3>
                              <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(3, 5).join('.') + '.' || "Loading..."}</p>
                            </div>
                            
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                              <h3 className="text-lg font-semibold mb-2 text-amber-600 dark:text-amber-400">Projected Growth</h3>
                              <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(5, 7).join('.') + '.' || "Loading..."}</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="operations" className="p-2">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                            <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">Key Partnerships</h3>
                            <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(2, 4).join('.') + '.' || "Loading..."}</p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Distribution Channels</h3>
                            <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(4, 6).join('.') + '.' || "Loading..."}</p>
                          </div>
                          
                          <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border border-rose-100 dark:border-rose-800">
                            <h3 className="text-lg font-semibold mb-2 text-rose-600 dark:text-rose-400">Cost Structure</h3>
                            <p className="text-gray-800 dark:text-gray-200">{businessPlan.businessModel.split('.').slice(6).join('.') || "Loading..."}</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>
              
              {/* Marketing Plan - Hidden behind paywall */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Activity className="h-6 w-6 text-indigo-500" />
                  Marketing Plan
                </h2>
                
                {isPremium ? (
                  <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-5">
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <p className="leading-relaxed">{businessPlan.marketingPlan || "Loading..."}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-8 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                        <Lock className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Premium Feature</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                      Unlock our comprehensive Marketing Plan section to get detailed strategies for customer acquisition and brand growth.
                    </p>
                    <Button 
                      onClick={upgradeAccount}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-2 shadow-md"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </section>
              
              {/* Two Column Layout for Remaining Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
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
