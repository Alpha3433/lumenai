
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useCompetitorData } from './CompetitorBusinessLogic';
import CompetitorCard from './CompetitorCard';
import CompetitorCardSkeleton from './CompetitorCardSkeleton';
import { motion } from 'framer-motion';

interface HighThreatCompetitorsProps {
  marketAnalysis: string;
}

const HighThreatCompetitors: React.FC<HighThreatCompetitorsProps> = ({ marketAnalysis }) => {
  const { competitorsWithModels, isLoading } = useCompetitorData(marketAnalysis);

  // Don't show the component if no competitors found
  if (!isLoading && competitorsWithModels.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <Card className="mt-8 border-t border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col items-center bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2 text-black dark:text-white">
            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
              <Target className="h-5 w-5 text-red-500" />
            </div>
            High Threat Competitors
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
            Competitive intelligence
          </div>
        </div>
        <CardContent className="p-6 bg-white dark:bg-gray-900">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {[1, 2].map((index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <CompetitorCardSkeleton />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {competitorsWithModels.map((competitor, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <CompetitorCard competitor={competitor} />
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HighThreatCompetitors;
