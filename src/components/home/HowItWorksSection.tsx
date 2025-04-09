
import React from 'react';
import { 
  Package, 
  Store, 
  Truck, 
  DollarSign,
  Clock,
  CheckCircle2,
  Zap,
  PiggyBank
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  badges: {
    text: string;
    icon?: React.ReactNode;
  }[];
}

const Step = ({ number, title, description, icon, badges }: StepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col md:flex-row gap-6 items-start"
    >
      {/* Step number with connector line */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold">
          {number}
        </div>
        {number < 4 && (
          <div className="hidden md:block w-0.5 h-full bg-blue-200 dark:bg-blue-900/50 my-2 ml-[1px]"></div>
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 pb-12 md:pb-16">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-3">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800/50"
            >
              {badge.icon && badge.icon}
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const steps: StepProps[] = [
    {
      number: 1,
      title: "Choose a Prebuilt Store",
      description: "Secure your Prebuilt Shopify (custom themes included) store today with a fast, hassle-free checkout process, so you can start your e-commerce journey within 1 hour.",
      icon: <Store className="h-5 w-5" />,
      badges: [
        { text: "30+ Themes" },
        { text: "1 hour", icon: <Clock className="h-3 w-3" /> }
      ]
    },
    {
      number: 2,
      title: "We Set Up Your Store",
      description: "Our team configures your store, integrates high-converting products, and even provides ad strategies to help you start strong.",
      icon: <Package className="h-5 w-5" />,
      badges: [
        { text: "INSTANT DELIVERY", icon: <Zap className="h-3 w-3" /> }
      ]
    },
    {
      number: 3,
      title: "Supplier Ships Your Orders Automatically",
      description: "Whenever you make a sale, the supplier handles fulfillment. For example, if you're selling a smartwatch for $49.99, we connect you with a supplier who ships it worldwide for just $12.99—completely hands-off.",
      icon: <Truck className="h-5 w-5" />,
      badges: [
        { text: "FOR BRANDS WITH NO SUPPLIERS" }
      ]
    },
    {
      number: 4,
      title: "Keep Your Profits & Scale Your Store",
      description: "You keep the profit from every sale based on your product margins. Use the included course and proven strategies to grow and scale your business even further.",
      icon: <DollarSign className="h-5 w-5" />,
      badges: [
        { text: "5 lessons" },
        { text: "1 month", icon: <CheckCircle2 className="h-3 w-3" /> }
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Does It Work?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform is divided into four key steps designed to build your business expertise step-by-step
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-2xl p-6 md:p-10">
          {steps.map((step) => (
            <Step 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              badges={step.badges}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
