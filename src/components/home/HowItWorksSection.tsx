
import React from 'react';
import { 
  FileText, 
  Sparkles, 
  BarChart3, 
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  badges: {
    text: string;
    icon?: React.ReactNode;
  }[];
  images: string[];
}

const Step = ({ number, title, description, icon, badges, images }: StepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col md:flex-row gap-6 items-start"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold">
          {number}
        </div>
        {number < 4 && (
          <div className="hidden md:block w-0.5 h-full bg-blue-200 dark:bg-blue-900/50 my-2 ml-[1px]"></div>
        )}
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

        <Carousel className="w-full max-w-xl">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <img 
                      src={image} 
                      alt={`Step ${number} Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const steps: StepProps[] = [
    {
      number: 1,
      title: "Generate Your Business Plan",
      description: "Create a comprehensive AI-powered business plan in minutes. Our platform analyzes market trends and compiles essential data to build a strong foundation for your business idea.",
      icon: <FileText className="h-5 w-5" />,
      badges: [
        { text: "5-10 minutes", icon: <Clock className="h-3 w-3" /> },
        { text: "AI-Powered" }
      ],
      images: [
        "/lovable-uploads/f0aa6a39-c48c-48dc-a70e-479ad31cfb3e.png",
        "/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png",
        "/lovable-uploads/7ba1cf6a-2c1c-45f8-aed6-d8ef4560c984.png"
      ]
    },
    {
      number: 2,
      title: "We Refine Your Strategy",
      description: "Our expert team reviews your plan, optimizes your market positioning, and provides tailored recommendations to enhance your business strategy and maximize your chances of success.",
      icon: <Sparkles className="h-5 w-5" />,
      badges: [
        { text: "Expert Review", icon: <CheckCircle2 className="h-3 w-3" /> }
      ],
      images: [
        "/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png",
        "/lovable-uploads/f0aa6a39-c48c-48dc-a70e-479ad31cfb3e.png",
        "/lovable-uploads/7ba1cf6a-2c1c-45f8-aed6-d8ef4560c984.png"
      ]
    },
    {
      number: 3,
      title: "Launch Your Marketing Campaign",
      description: "Deploy targeted marketing campaigns based on data-driven insights. Our platform helps you identify the most effective channels and messaging for your specific audience and business model.",
      icon: <BarChart3 className="h-5 w-5" />,
      badges: [
        { text: "Multi-channel Strategy" }
      ],
      images: [
        "/lovable-uploads/7ba1cf6a-2c1c-45f8-aed6-d8ef4560c984.png",
        "/lovable-uploads/f0aa6a39-c48c-48dc-a70e-479ad31cfb3e.png",
        "/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png"
      ]
    },
    {
      number: 4,
      title: "Monitor Growth & Scale Your Business",
      description: "Track your performance metrics and grow your business with ongoing support. Use our analytics dashboard and proven strategies to continually refine your approach and scale effectively.",
      icon: <TrendingUp className="h-5 w-5" />,
      badges: [
        { text: "Real-time Analytics" },
        { text: "Ongoing Support", icon: <Users className="h-3 w-3" /> }
      ],
      images: [
        "/lovable-uploads/f0aa6a39-c48c-48dc-a70e-479ad31cfb3e.png",
        "/lovable-uploads/7ba1cf6a-2c1c-45f8-aed6-d8ef4560c984.png",
        "/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png"
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
              images={step.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
