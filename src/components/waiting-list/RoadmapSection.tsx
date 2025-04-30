
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Sparkles, TrendingUp, Users, FileText, BarChart3, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type FeatureStatus = 'live' | 'coming-soon' | 'planned';

interface RoadmapFeature {
  title: string;
  description: string;
  status: FeatureStatus;
  eta?: string;
  icon: React.ElementType;
}

const RoadmapSection = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | FeatureStatus>('all');

  const features: RoadmapFeature[] = [
    {
      title: "AI-Powered Market Analysis",
      description: "Real-time market data analysis with competitive insights and opportunity scoring.",
      status: "live",
      icon: TrendingUp
    },
    {
      title: "Customer Persona Generator",
      description: "Create detailed ideal customer profiles based on validated market trends.",
      status: "coming-soon",
      eta: "Q2 2025",
      icon: Users
    },
    {
      title: "Predictive Revenue Modeling",
      description: "AI forecasting for potential revenue streams based on your business model.",
      status: "coming-soon",
      eta: "Q2 2025",
      icon: BarChart3
    },
    {
      title: "Go-to-Market Strategy Builder",
      description: "Complete GTM templates and playbooks customized to your startup.",
      status: "coming-soon",
      eta: "Q3 2025",
      icon: Share2
    },
    {
      title: "Pitch Deck Generator",
      description: "Create investor-ready pitch decks from your validated business plan.",
      status: "planned",
      eta: "Q4 2025",
      icon: FileText
    },
    {
      title: "Investor Matching Network",
      description: "Connect with relevant investors based on your business metrics and industry.",
      status: "planned",
      eta: "Q1 2026",
      icon: Users
    }
  ];

  const filteredFeatures = activeFilter === 'all' 
    ? features 
    : features.filter(feature => feature.status === activeFilter);
  
  const timelinePoints = [
    { label: "Now", color: "bg-emerald-500" },
    { label: "Q2 2025", color: "bg-blue-500" },
    { label: "Q3 2025", color: "bg-blue-500" },
    { label: "Q4 2025", color: "bg-violet-500" },
    { label: "Q1 2026", color: "bg-violet-500" }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-900/80">
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
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400">
              Lumen AI Roadmap
            </span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            We're constantly innovating to bring you the most powerful startup validation tools. 
            Here's what's on our development roadmap.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 mb-12">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('all')}
            className="rounded-full"
          >
            All Features
          </Button>
          <Button 
            variant={activeFilter === 'live' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('live')}
            className="rounded-full text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/30 dark:hover:bg-emerald-900/20"
          >
            Live
          </Button>
          <Button 
            variant={activeFilter === 'coming-soon' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('coming-soon')}
            className="rounded-full text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800/30 dark:hover:bg-blue-900/20"
          >
            Coming Soon
          </Button>
          <Button 
            variant={activeFilter === 'planned' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('planned')}
            className="rounded-full text-violet-600 border-violet-200 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-800/30 dark:hover:bg-violet-900/20"
          >
            Planned
          </Button>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative flex items-center justify-between max-w-3xl mx-auto px-8">
            <div className="absolute h-1 bg-gray-200 dark:bg-gray-700 w-full top-1/2 -translate-y-1/2"></div>
            
            {timelinePoints.map((point, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full ${point.color} z-10 shadow-lg`}></div>
                <span className="mt-3 text-sm font-medium">{point.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard 
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
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

interface FeatureCardProps {
  feature: RoadmapFeature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const statusConfig = {
    'live': {
      color: 'bg-emerald-500',
      borderColor: 'border-emerald-200 dark:border-emerald-800/30',
      lightColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      label: 'Live',
      icon: CheckCircle,
      textColor: 'text-emerald-600 dark:text-emerald-400'
    },
    'coming-soon': {
      color: 'bg-blue-500',
      borderColor: 'border-blue-200 dark:border-blue-800/30',
      lightColor: 'bg-blue-50 dark:bg-blue-900/20',
      label: 'Coming Soon',
      icon: Clock,
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    'planned': {
      color: 'bg-violet-500',
      borderColor: 'border-violet-200 dark:border-violet-800/30',
      lightColor: 'bg-violet-50 dark:bg-violet-900/20',
      label: 'Planned',
      icon: Sparkles,
      textColor: 'text-violet-600 dark:text-violet-400'
    }
  }[feature.status];
  
  const StatusIcon = statusConfig.icon;
  const FeatureIcon = feature.icon;
  
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
          <div className="flex items-center justify-between mb-4">
            <span className={`${statusConfig.lightColor} p-2 rounded-lg`}>
              <FeatureIcon className={`h-5 w-5 ${statusConfig.textColor}`} />
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full ${statusConfig.lightColor} px-3 py-1`}>
              <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.textColor}`} />
              <span className={`text-xs font-medium ${statusConfig.textColor}`}>
                {statusConfig.label} {feature.eta && `• ${feature.eta}`}
              </span>
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoadmapSection;
