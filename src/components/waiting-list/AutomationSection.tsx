
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSectionHeader from './automation/AnimatedSectionHeader';
import TaskAutomationCard from './automation/TaskAutomationCard';
import DashboardPreview from './automation/DashboardPreview';
import { automationData } from './automation/AutomationData';

const AutomationSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12 }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <AnimatedSectionHeader 
          title="Everything You Need to"
          highlightedText="Save Time"
          subtitle="Our platform automates the tedious parts of validation so you can focus on building your business"
        />

        {/* Modern Dashboard Inspired Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Stats and Data */}
          <TaskAutomationCard tasks={automationData} />
          
          {/* Right Column - Dashboard Preview */}
          <DashboardPreview />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationSection;
