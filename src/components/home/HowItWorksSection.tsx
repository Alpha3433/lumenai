import React from 'react';
import { FileText, Sparkles, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
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
  image: string;
}

const Step = ({
  number,
  title,
  description,
  icon,
  badges,
  image
}: StepProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5
  }} className="relative flex flex-col md:flex-row gap-6 items-start">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold">
          {number}
        </div>
        {number < 4 && <div className="hidden md:block w-0.5 h-full bg-blue-200 dark:bg-blue-900/50 my-2 ml-[1px]"></div>}
      </div>

      <div className="flex-1 pb-12 md:pb-16">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {badges.map((badge, index) => <div key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800/50">
              {badge.icon && badge.icon}
              {badge.text}
            </div>)}
        </div>

        <div className="w-full max-w-xl">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            <img src={image} alt={`Step ${number} Screenshot`} className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </motion.div>;
};

const HowItWorksSection = () => {
  const steps: StepProps[] = [
    {
      number: 1,
      title: "Generate Your Business Plan",
      description: "Create a comprehensive AI-powered business plan in minutes. Our platform analyzes market trends and compiles essential data to build a strong foundation for your business idea.",
      icon: <FileText className="h-5 w-5" />,
      badges: [{
        text: "1-2 minutes",
        icon: <Clock className="h-3 w-3" />
      }, {
        text: "AI-Powered"
      }],
      image: "/lovable-uploads/8206228d-59f5-4fcc-81ac-98d80834992f.png"
    },
    {
      number: 2,
      title: "We Refine Your Strategy",
      description: "Boost your plan with a free 1:1 30-minute consultation. Our experts refine your AI strategy, uncover blind spots, and offer tailored, data-driven tips—so you start on the most profitable path.",
      icon: <Sparkles className="h-5 w-5" />,
      badges: [{
        text: "Expert Review",
        icon: <CheckCircle2 className="h-3 w-3" />
      }],
      image: "/lovable-uploads/5ec3cdf8-6c90-4876-a74d-d5b8ff853394.png"
    },
    {
      number: 3,
      title: "Done-For-You Launch Services",
      description: "Skip the tech hassle and launch fast. Our team builds your landing pages, runs optimized ads, automate operations and refine pricing, product-market fit, and revenue strategies —so you're ready to scale immediately.",
      icon: <BarChart3 className="h-5 w-5" />,
      badges: [{
        text: "Multi-channel Strategy"
      }],
      image: "/lovable-uploads/97ff5ee9-49d4-4693-aae5-13ea2becadaa.png"
    }
  ];

  return <section id="how-it-works" className="py-20 px-4">
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
          {steps.map(step => <Step key={step.number} number={step.number} title={step.title} description={step.description} icon={step.icon} badges={step.badges} image={step.image} />)}
        </div>
      </div>
    </section>;
};

export default HowItWorksSection;
