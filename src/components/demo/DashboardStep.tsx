
import React from 'react';
import { motion } from 'framer-motion';
import { DemoStep } from './types';
import DashboardStepInfo from './dashboard/DashboardStepInfo';
import MeetingSchedulerCard from './dashboard/MeetingSchedulerCard';

interface DashboardStepProps {
  step: DemoStep;
}

const DashboardStep: React.FC<DashboardStepProps> = ({ step }) => {
  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left side: Info section */}
          <DashboardStepInfo step={step} />
          
          {/* Right side: Meeting scheduler card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-3/5 space-y-6"
          >
            <MeetingSchedulerCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardStep;
