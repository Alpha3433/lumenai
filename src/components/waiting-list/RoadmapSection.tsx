
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RoadmapFeatureProps {
  title: string;
  description: string;
  status: 'live' | 'coming-soon' | 'planned';
  eta?: string;
  index: number;
}

const RoadmapFeature: React.FC<RoadmapFeatureProps> = ({
  title,
  description,
  status,
  eta,
  index
}) => {
  const statusConfig = {
    'live': {
      color: 'bg-emerald-500',
      label: 'Live',
      icon: CheckCircle,
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800/30'
    },
    'coming-soon': {
      color: 'bg-blue-500',
      label: 'Coming Soon',
      icon: Clock,
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800/30'
    },
    'planned': {
      color: 'bg-purple-500',
      label: 'Planned',
      icon: Sparkles,
      textColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800/30'
    }
  }[status];
  
  const StatusIcon = statusConfig.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden border ${statusConfig.borderColor} hover:shadow-lg transition-all duration-300 group bg-white dark:bg-gray-800/80`}>
        <div className={`h-2 w-full ${statusConfig.color}`}></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center justify-center rounded-full ${statusConfig.color} p-1.5`}>
              <StatusIcon className="h-4 w-4 text-white" />
            </span>
            <span className={`text-sm font-medium ${statusConfig.textColor}`}>
              {statusConfig.label} {eta && `• ${eta}`}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const features = [
    {
      title: "AI-Powered Market Analysis",
      description: "Real-time market data analysis with competitive insights and opportunity scoring.",
      status: "live" as const
    },
    {
      title: "Customer Persona Generator",
      description: "Create detailed ideal customer profiles based on validated market trends.",
      status: "coming-soon" as const,
      eta: "Q2 2025"
    },
    {
      title: "Predictive Revenue Modeling",
      description: "AI forecasting for potential revenue streams based on your business model.",
      status: "coming-soon" as const,
      eta: "Q2 2025"
    },
    {
      title: "Go-to-Market Strategy Builder",
      description: "Complete GTM templates and playbooks customized to your startup.",
      status: "coming-soon" as const,
      eta: "Q3 2025"
    },
    {
      title: "Pitch Deck Generator",
      description: "Create investor-ready pitch decks from your validated business plan.",
      status: "planned" as const,
      eta: "Q4 2025"
    },
    {
      title: "Investor Matching Network",
      description: "Connect with relevant investors based on your business metrics and industry.",
      status: "planned" as const,
      eta: "Q1 2026"
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Product Pipeline
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400">
              Lumen AI Roadmap
            </span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            We're constantly innovating to bring you the most powerful startup validation tools. 
            Here's what's on our development roadmap.
          </p>
          
          <div className="mt-8 mb-2 relative">
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <RoadmapFeature 
              key={index} 
              index={index} 
              title={feature.title} 
              description={feature.description} 
              status={feature.status} 
              eta={feature.eta} 
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-gray-700/30 shadow-sm"
        >
          <p className="text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto">
            Join our waiting list to get early access to new features and provide feedback on our roadmap.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapSection;
