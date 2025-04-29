
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface FailureReason {
  reason: string;
  percentage: number;
}

interface FailureStatisticsProps {
  failureReasons: FailureReason[];
}

const FailureStatistics: React.FC<FailureStatisticsProps> = ({ failureReasons }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold">Top Startup Failure Reasons</h3>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {failureReasons.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">{item.reason}</span>
                <span className="text-red-600 font-bold">{item.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                  style={{ width: "0%" }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm italic">
            Source: CB Insights Research - Top 20 reasons startups fail
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FailureStatistics;
