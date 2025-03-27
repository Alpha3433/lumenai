
import React from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePestelData } from '@/hooks/usePestelData';
import PestelAnalysisCard from './pestel/PestelAnalysisCard';

interface PestelAnalysisSectionProps {
  analysisText: string;
}

const PestelAnalysisSection: React.FC<PestelAnalysisSectionProps> = ({ analysisText }) => {
  // Use the custom hook to get PESTEL data
  const pestelData = usePestelData(analysisText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section className="mb-12 space-y-6">
      <motion.div 
        className="flex flex-col items-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          PESTEL Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Macro-environmental factors
        </div>
      </motion.div>

      {/* PESTEL Grid - 2x3 layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="political" points={pestelData.political} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="economic" points={pestelData.economic} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="social" points={pestelData.social} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="technological" points={pestelData.technological} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="environmental" points={pestelData.environmental} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PestelAnalysisCard category="legal" points={pestelData.legal} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PestelAnalysisSection;
