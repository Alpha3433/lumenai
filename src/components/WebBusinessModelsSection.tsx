
import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, RefreshCw, Check } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { callOpenAI } from '@/utils/openaiService';

interface WebBusinessModelsSectionProps {
  businessName: string;
  businessDescription: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

interface BusinessModel {
  name: string;
  description: string;
  fitScore: number;
  keyBenefits: string[];
  implementationComplexity: 'Low' | 'Medium' | 'High';
}

const WebBusinessModelsSection: React.FC<WebBusinessModelsSectionProps> = ({
  businessName,
  businessDescription,
  isPremium,
  onUpgrade
}) => {
  const [businessModels, setBusinessModels] = useState<BusinessModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isPremium) {
      generateBusinessModels();
    }
  }, [isPremium, businessName, businessDescription]);

  const generateBusinessModels = async () => {
    setLoading(true);
    setError('');

    try {
      const prompt = `Based on the business named "${businessName}" with the following description: "${businessDescription}", 
      suggest 3 optimal web-based business models that would work well for this concept. 
      
      For each model, include:
      1. A name for the business model
      2. A brief description (30-40 words)
      3. A fit score from 1-10 indicating how well it matches the business concept
      4. 2-3 key benefits of this model for this specific business
      5. Implementation complexity (Low, Medium, or High)
      
      Format your response as a JSON array like this:
      [
        {
          "name": "Model Name",
          "description": "Brief description...",
          "fitScore": 8,
          "keyBenefits": ["Benefit 1", "Benefit 2"],
          "implementationComplexity": "Medium"
        }
      ]
      
      Only include these fields in your response, formatted as valid JSON that can be parsed directly.`;

      const response = await callOpenAI({
        prompt,
        model: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1000
      });

      if (response.success) {
        try {
          // Parse the JSON response
          const modelData = JSON.parse(response.text);
          setBusinessModels(modelData);
        } catch (parseError) {
          console.error('Error parsing business models JSON:', parseError);
          setError('Failed to parse business models data');
          toast({
            title: "Error",
            description: "Failed to parse business models data",
            variant: "destructive"
          });
        }
      } else {
        setError('Failed to generate business models');
        toast({
          title: "Error",
          description: "Failed to generate business models",
          variant: "destructive"
        });
      }
    } catch (e) {
      console.error('Error generating business models:', e);
      setError('An error occurred while generating business models');
      toast({
        title: "Error",
        description: "An error occurred while generating business models",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    generateBusinessModels();
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
    if (score >= 5) return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20";
    return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
      case 'Medium':
        return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20";
      case 'High':
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  if (!isPremium) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Globe className="h-6 w-6 text-blue-500" />
          Web Business Models
        </h2>
        
        <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-8 text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500 opacity-75" />
            <h3 className="text-xl font-semibold mb-3">Unlock Web Business Models</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
              Discover the most optimal web-based business models for your concept with AI analysis. Includes fit scores, implementation complexity, and key benefits.
            </p>
            <Button 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Globe className="h-6 w-6 text-blue-500" />
        Web Business Models
      </h2>
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={loading || refreshing}
          className="text-xs"
        >
          {refreshing ? (
            <>
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-1 h-3 w-3" />
              Refresh Models
            </>
          )}
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-7 w-1/3" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={generateBusinessModels}
              className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : businessModels.length > 0 ? (
        <div className="space-y-4">
          {businessModels.map((model, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{model.name}</h3>
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    getScoreColor(model.fitScore)
                  )}>
                    Fit Score: {model.fitScore}/10
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{model.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Key Benefits</h4>
                    <ul className="space-y-1">
                      {model.keyBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Implementation Complexity:</span>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold",
                      getComplexityColor(model.implementationComplexity)
                    )}>
                      {model.implementationComplexity}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No business models generated yet.</p>
            <Button onClick={generateBusinessModels}>Generate Business Models</Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default WebBusinessModelsSection;
