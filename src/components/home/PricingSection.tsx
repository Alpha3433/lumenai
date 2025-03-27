
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Startup",
      description: "Perfect for indie entrepreneurs",
      price: "Free",
      period: "",
      features: [
        { text: "1 Business Plan Report", available: true },
        { text: "Unlimited Idea Creation Plans", available: true },
        { text: "Basic Market Analysis", available: true },
        { text: "Standard AI Business Validation", available: true },
        { text: "3 Competitor Insights", available: true },
        { text: "Basic SWOT Analysis", available: true },
        { text: "Advanced Market Analysis", available: false },
        { text: "AI-Powered Business Validation", available: false },
        { text: "10 Detailed Competitor Insights", available: false },
        { text: "Marketing Strategy Recommendations", available: false },
        { text: "Financial Projections", available: false },
        { text: "Priority Support", available: false }
      ],
      buttonText: "Try for Free",
      buttonLink: "/register",
      isPopular: false
    },
    {
      name: "Business",
      description: "Ideal for growing companies",
      price: "$29",
      period: "/mo",
      features: [
        { text: "Unlimited Business Plans", available: true },
        { text: "Unlimited Idea Creation Plans", available: true },
        { text: "Advanced Market Analysis", available: true },
        { text: "AI-Powered Business Validation", available: true },
        { text: "10 Detailed Competitor Insights", available: true },
        { text: "Advanced SWOT Analysis", available: true },
        { text: "Marketing Strategy Recommendations", available: true },
        { text: "Financial Projections", available: true },
        { text: "Priority Support", available: true }
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: true
    },
    {
      name: "Entrepreneur",
      description: "For established organizations",
      price: "$79",
      period: "/mo",
      features: [
        { text: "Unlimited Business Plans", available: true },
        { text: "Unlimited Idea Creation Plans", available: true },
        { text: "Real-time Market Intelligence", available: true },
        { text: "Advanced AI Business Validation", available: true },
        { text: "Unlimited Competitor Analysis", available: true },
        { text: "Executive SWOT Analysis Dashboard", available: true },
        { text: "Custom Marketing Strategies", available: true },
        { text: "5-Year Financial Projections", available: true }
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: false
    }
  ];

  const FeatureItem = ({ feature, available }: { feature: string, available: boolean }) => (
    <div className="flex items-start space-x-2">
      {available ? (
        <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      ) : (
        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
      )}
      <span className={`text-sm ${available ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
        {feature}
      </span>
    </div>
  );

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business planning and market analysis needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.isPopular ? 'border-blue-500 relative shadow-lg' : 'border-gray-200 dark:border-gray-700'}`}>
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Best Value
                  </div>
                )}
                <CardHeader className="text-center pb-0">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="text-center pt-6 flex-grow">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                  </div>
                  
                  <div className="mt-8 space-y-4 text-left">
                    {plan.features.map((feature, idx) => (
                      <FeatureItem key={idx} feature={feature.text} available={feature.available} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link to={plan.buttonLink} className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.isPopular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }`}
                      variant={plan.isPopular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
