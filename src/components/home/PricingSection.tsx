import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info, CircleDollarSign, Star, ArrowDown, ArrowUp, Sparkles, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from '@/components/AuthProvider';
import { useSubscription } from '@/hooks/useSubscription';
import PartnerApplicationModal from './PartnerApplicationModal';
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/hooks/use-toast";

const PricingSection = () => {
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const { user } = useAuth();
  const { handleCheckout, loading } = useSubscription();
  const { addItem } = useCart();
  const { toast } = useToast();

  const pricingPlans = [
    {
      name: "Startup",
      description: "Curious creators",
      price: "$0",
      period: "/month",
      features: [
        { text: "3 Business Validations per month", available: true },
        { text: "1 coaching call (30-min intro session)", available: true },
        { text: "Advanced AI insights", available: false },
        { text: "Niche competitor reports", available: false },
        { text: "Priority chat support", available: false }
      ],
      buttonText: "Start for Free",
      buttonLink: "/register",
      isPopular: false,
      color: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
      type: "startup" as const
    },
    {
      name: "Entrepreneur",
      description: "Committed solopreneurs",
      price: "$29.99",
      period: "/month",
      features: [
        { text: "Unlimited reports", available: true },
        { text: "Campaign audit", available: true },
        { text: "Target audience research", available: true },
        { text: "Ad content creation", available: true },
        { text: "Priority chat support", available: true },
        { text: "3 coaching calls/month", available: true }
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: true,
      color: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/30",
      type: "entrepreneur" as const
    },
    {
      name: "Founder",
      description: "Growing businesses",
      price: "$54.99",
      period: "/month",
      features: [
        { text: "All Entrepreneur features", available: true },
        { text: "Optimize campaign", available: true },
        { text: "Ads analytical report", available: true },
        { text: "Special Meta + Google Marketing Solution", available: true },
        { text: "5 coaching calls/month", available: true }
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      isPopular: false,
      color: "bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/30",
      type: "founder" as const
    },
    {
      name: "Partner",
      description: "Cash-strapped hustlers",
      price: "0%",
      period: " upfront",
      features: [
        { text: "Full Founder features", available: true },
        { text: "Pay 12% of monthly revenue", available: true },
        { text: "Capped at $1000/month for 6 months", available: true }
      ],
      buttonText: "Apply Now",
      buttonLink: "/register",
      isPopular: false,
      color: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/30",
      type: "partner" as const
    }
  ];

  const addOns = [
    {
      name: "Launchpad Website",
      description: "A polished 5-page website (SEO-optimized)",
      price: "$89",
      period: " one-time",
      icon: <Rocket className="h-6 w-6 text-orange-500" />,
      features: [
        "Professional design templates",
        "Mobile responsive",
        "SEO optimization included",
        "Contact form integration",
        "Analytics setup"
      ],
      color: "from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/30",
      borderColor: "border-orange-200 dark:border-orange-800/40"
    },
    {
      name: "Social Boost Bundle",
      description: "100+ viral post templates + AI caption generator + hashtag optimizer",
      price: "$24.99",
      period: "/month",
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      features: [
        "100+ viral post templates",
        "AI caption generator",
        "Hashtag optimizer",
        "Content calendar",
        "Performance analytics"
      ],
      color: "from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/30",
      borderColor: "border-purple-200 dark:border-purple-800/40"
    }
  ];

  const comparisonTable = {
    headers: ["Features", "Startup", "Entrepreneur", "Founder", "Partner"],
    rows: [
      {
        feature: "AI Business Plan Generator",
        startup: "Basic",
        entrepreneur: "Advanced",
        founder: "Advanced",
        partner: "Advanced"
      },
      {
        feature: "Coaching Calls",
        startup: "1 call (30 min)",
        entrepreneur: "3 calls/month",
        founder: "5 calls/month",
        partner: "5 calls/month"
      },
      {
        feature: "Niche Competitor Reports",
        startup: "No",
        entrepreneur: "Yes",
        founder: "Yes",
        partner: "Yes"
      },
      {
        feature: "Priority Support",
        startup: "No",
        entrepreneur: "Yes",
        founder: "Yes",
        partner: "Yes"
      },
      {
        feature: "Team Workspace",
        startup: "No",
        entrepreneur: "No",
        founder: "Yes",
        partner: "Yes"
      },
      {
        feature: "Shared Analytics",
        startup: "No",
        entrepreneur: "No",
        founder: "Yes",
        partner: "Yes"
      },
      {
        feature: "Backend Management",
        startup: "No",
        entrepreneur: "No",
        founder: "Yes",
        partner: "Yes"
      },
      {
        feature: "Revenue Sharing",
        startup: "No",
        entrepreneur: "No",
        founder: "No",
        partner: "12% (capped)"
      }
    ]
  };

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

  const handlePlanClick = (plan: typeof pricingPlans[0]) => {
    if (!user) {
      window.location.href = plan.buttonLink;
      return;
    }
    
    if (plan.type === 'startup') {
      handleCheckout('startup');
    } else if (plan.type === 'partner') {
      setPartnerModalOpen(true);
    } else {
      handleCheckout(plan.type);
    }
  };

  const handleAddOn = (addon: typeof addOns[0]) => {
    addItem({
      id: addon.name,
      name: addon.name,
      description: addon.description,
      price: parseFloat(addon.price.replace('$', '').replace('/month', '').replace(' one-time','').replace('.','')) * 100,
      type: 'addon',
      quantity: 1
    });
    toast({
      title: "Added to cart",
      description: `${addon.name} has been added to your cart.`
    });
  };

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
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business planning needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.color} ${plan.isPopular ? 'border-blue-500 relative shadow-lg' : 'border-gray-200 dark:border-gray-700'}`}>
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
                  <Button 
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full ${
                      plan.isPopular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                    variant={plan.isPopular ? "default" : "outline"}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <PartnerApplicationModal 
          open={partnerModalOpen}
          onOpenChange={setPartnerModalOpen}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-3">Power-Up Your Business</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent w-16"></div>
              <Star className="h-5 w-5 text-amber-500" />
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent w-16"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take your business to the next level with these specialized add-ons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className={`h-full border ${addon.borderColor} bg-gradient-to-br ${addon.color} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                          {addon.icon}
                        </div>
                        <h4 className="text-xl font-bold">{addon.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{addon.price}</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{addon.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{addon.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {addon.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700"
                      onClick={() => handleAddOn(addon)}
                    >
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
