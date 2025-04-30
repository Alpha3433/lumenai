import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Sparkles } from 'lucide-react';
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
  const statusColor = {
    'live': 'bg-green-500',
    'coming-soon': 'bg-blue-500',
    'planned': 'bg-purple-500'
  }[status];
  const statusLabel = {
    'live': 'Live',
    'coming-soon': 'Coming Soon',
    'planned': 'Planned'
  }[status];
  const StatusIcon = {
    'live': CheckCircle,
    'coming-soon': Clock,
    'planned': Sparkles
  }[status];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} viewport={{
    once: true
  }} className="h-full">
      <Card className="h-full border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center justify-center rounded-full ${statusColor} p-1`}>
              <StatusIcon className="h-4 w-4 text-white" />
            </span>
            <span className={`text-sm font-medium ${status === 'live' ? 'text-green-600 dark:text-green-400' : status === 'coming-soon' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>
              {statusLabel} {eta && `• ${eta}`}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>;
};
const RoadmapSection = () => {
  const features = [{
    title: "AI-Powered Market Analysis",
    description: "Real-time market data analysis with competitive insights and opportunity scoring.",
    status: "live" as const
  }, {
    title: "Customer Persona Generator",
    description: "Create detailed ideal customer profiles based on validated market trends.",
    status: "coming-soon" as const,
    eta: "Q2 2025"
  }, {
    title: "Predictive Revenue Modeling",
    description: "AI forecasting for potential revenue streams based on your business model.",
    status: "coming-soon" as const,
    eta: "Q2 2025"
  }, {
    title: "Go-to-Market Strategy Builder",
    description: "Complete GTM templates and playbooks customized to your startup.",
    status: "coming-soon" as const,
    eta: "Q3 2025"
  }, {
    title: "Pitch Deck Generator",
    description: "Create investor-ready pitch decks from your validated business plan.",
    status: "planned" as const,
    eta: "Q4 2025"
  }, {
    title: "Investor Matching Network",
    description: "Connect with relevant investors based on your business metrics and industry.",
    status: "planned" as const,
    eta: "Q1 2026"
  }];
  return <section className="py-20 px-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
            Product Roadmap
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Lumen AI Roadmap</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're constantly innovating to bring you the most powerful startup validation tools. 
            Here's what's on our development roadmap.
          </p>
          
          <div className="mt-4 relative">
            <div className="absolute left-1/2 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-1/2 rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => <RoadmapFeature key={index} index={index} title={feature.title} description={feature.description} status={feature.status} eta={feature.eta} />)}
        </div>
        
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} viewport={{
        once: true
      }} className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto">
            Join our waiting list to get early access to new features and provide feedback on our roadmap.
          </p>
        </motion.div>
      </div>
    </section>;
};
export default RoadmapSection;