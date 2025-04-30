
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout, Palette, Layers, FileText, Box, Check } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/hooks/use-toast';

const LandingPageCreator = () => {
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    description: '',
    industry: '',
    mainColor: '#4F46E5',
    targetAudience: '',
    uniqueSellingPoint: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleIndustryChange = (value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      industry: value
    }));
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Landing page created!",
      description: "Your landing page has been successfully created and is ready for preview.",
    });
  };

  const nextStep = () => {
    if (step === 1 && (!businessInfo.name || !businessInfo.description || !businessInfo.industry)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive"
      });
      return;
    }
    if (step === 2 && !selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select a template to continue.",
        variant: "destructive"
      });
      return;
    }
    setStep(prev => prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev);
  };

  const prevStep = () => {
    setStep(prev => prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev);
  };

  const templates = [
    { id: 'modern', name: 'Modern & Clean', description: 'A sleek, minimalist design with focus on content.' },
    { id: 'bold', name: 'Bold & Impactful', description: 'Eye-catching design with strong colors and large elements.' },
    { id: 'professional', name: 'Professional & Corporate', description: 'Trustworthy design suited for business services.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-1 container max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Create Your Landing Page</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate a professional landing page for your business in minutes
          </p>
        </div>
        
        <div className="flex items-center mb-10 justify-center">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Business Info</span>
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'} mx-2`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <Layout className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Choose Template</span>
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'} mx-2`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <Palette className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Customize & Publish</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Business Information</h2>
              <p className="text-gray-600 dark:text-gray-300">Tell us about your business to create a personalized landing page</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Business Name *</label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="e.g., Acme Corporation" 
                    value={businessInfo.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Business Description *</label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Briefly describe what your business does..." 
                    rows={4} 
                    value={businessInfo.description} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry *</label>
                  <Select 
                    value={businessInfo.industry} 
                    onValueChange={handleIndustryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium mb-1">Target Audience</label>
                  <Input 
                    id="targetAudience" 
                    name="targetAudience" 
                    placeholder="e.g., Small business owners, Parents, Tech enthusiasts" 
                    value={businessInfo.targetAudience} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="uniqueSellingPoint" className="block text-sm font-medium mb-1">Unique Selling Point</label>
                  <Textarea 
                    id="uniqueSellingPoint" 
                    name="uniqueSellingPoint" 
                    placeholder="What makes your product or service unique?" 
                    rows={2} 
                    value={businessInfo.uniqueSellingPoint} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Choose a Template</h2>
              <p className="text-gray-600 dark:text-gray-300">Select a design template that fits your brand</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer hover:border-blue-500 transition-colors ${selectedTemplate === template.id ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {selectedTemplate === template.id && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <Box className="h-10 w-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Customize & Publish</h2>
              <p className="text-gray-600 dark:text-gray-300">Finalize your landing page design</p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="text-center">
                    <Layers className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{businessInfo.name} Landing Page</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{selectedTemplate && templates.find(t => t.id === selectedTemplate)?.name} Template</p>
                    <div className="mt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Preview Design
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Ready to publish?</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">Your landing page is ready to go live. You can always make changes later.</p>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Publish Landing Page
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPageCreator;
