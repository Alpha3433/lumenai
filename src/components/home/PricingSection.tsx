
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Startup",
      description: "Perfect for indie entrepreneurs",
      originalPrice: "Free",
      price: "Free",
      period: "",
      features: [
        "2 Business Plan Reports",
        "Basic Market Analysis",
        "Standard AI Business Validation",
        "3 Competitor Insights",
        "Basic SWOT Analysis",
        "Email Support"
      ],
      buttonText: "Try for Free",
      buttonLink: "/register",
      isPopular: false
    },
    {
      name: "Business",
      description: "Ideal for growing companies",
      originalPrice: "$49",
      price: "$29",
      period: "/mo",
      features: [
        "Unlimited Business Plans",
        "Advanced Market Analysis",
        "AI-Powered Business Validation",
        "10 Detailed Competitor Insights",
        "Advanced SWOT Analysis",
        "Marketing Strategy Recommendations",
        "Financial Projections",
        "Priority Support"
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: true
    },
    {
      name: "Enterprise",
      description: "For established organizations",
      originalPrice: "$99",
      price: "$79",
      period: "/mo",
      features: [
        "Unlimited Business Plans",
        "Real-time Market Intelligence",
        "Advanced AI Business Validation",
        "Unlimited Competitor Analysis",
        "Executive SWOT Analysis Dashboard",
        "Custom Marketing Strategies",
        "5-Year Financial Projections",
        "Dedicated Account Manager",
        "API Access"
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: false
    }
  ];

  const FeatureItem = ({ feature }: { feature: string }) => (
    <div className="flex items-start space-x-2">
      <Check className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
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
                  {plan.originalPrice !== "Free" && plan.originalPrice !== plan.price && (
                    <span className="text-gray-400 line-through block text-lg">{plan.originalPrice}</span>
                  )}
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                  </div>
                  
                  <div className="mt-8 space-y-4 text-left">
                    {plan.features.map((feature, idx) => (
                      <FeatureItem key={idx} feature={feature} />
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
