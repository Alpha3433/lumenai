
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoStep } from './types';

interface MonetizationStrategyStepProps {
  step: DemoStep;
}

const MonetizationStrategyStep: React.FC<MonetizationStrategyStepProps> = ({ step }) => {
  const pricingModels = [
    {
      name: "Premium Subscription",
      description: "Monthly or annual membership with full access to personalized workout and nutrition plans",
      projectedRevenue: "$16.99/mo per user",
      conversionRate: "8.5%",
      recommendation: "Primary model",
      color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
    },
    {
      name: "Freemium + In-App Purchases",
      description: "Basic features free with premium workout packages and meal plans as purchasable add-ons",
      projectedRevenue: "$9.40 avg. revenue per user",
      conversionRate: "12%",
      recommendation: "Secondary model",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
    },
    {
      name: "Annual Premium Plan",
      description: "Yearly subscription with 20% discount compared to monthly plan",
      projectedRevenue: "$159.99/yr per user",
      conversionRate: "4.2%",
      recommendation: "Supplemental option",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
    },
    {
      name: "Enterprise Partnerships",
      description: "Custom pricing for corporate wellness programs and healthcare providers",
      projectedRevenue: "$67 per employee annually",
      conversionRate: "24% of approached businesses",
      recommendation: "Long-term growth channel",
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
    }
  ];

  const benchmarks = [
    { metric: "Average Subscription Price", value: "$14.99/mo", industry: "$12.99-$19.99/mo" },
    { metric: "Free-to-Paid Conversion", value: "8.5%", industry: "5-10%" },
    { metric: "Annual Subscription Uptake", value: "32%", industry: "25-35%" },
    { metric: "Customer Acquisition Cost", value: "$42.30", industry: "$38-$65" }
  ];

  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step 5
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Industry benchmarks
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Revenue projections
              </div>
            </div>
            
            <Button className="bg-pink-600 hover:bg-pink-700">
              Review Monetization Strategy
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
              <Card className="border-none">
                <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CircleDollarSign className="h-5 w-5 text-pink-500" />
                      FitnessAI Monetization Strategy
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      High Revenue Potential
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  {/* Pricing Models Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {pricingModels.map((model, idx) => (
                      <div 
                        key={idx} 
                        className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-800/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <Badge className={model.color + " text-xs"}>
                            {model.recommendation}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {model.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">Projected Revenue</p>
                            <p className="font-medium">{model.projectedRevenue}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">Conversion Rate</p>
                            <p className="font-medium">{model.conversionRate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Industry Benchmarks */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4 text-blue-500" />
                      FitnessAI vs Industry Benchmarks
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {benchmarks.map((benchmark, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{benchmark.metric}</p>
                          <p className="font-medium text-lg">{benchmark.value}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Industry: {benchmark.industry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MonetizationStrategyStep;
