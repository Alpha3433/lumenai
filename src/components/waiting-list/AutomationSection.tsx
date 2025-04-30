
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedSectionHeader from './automation/AnimatedSectionHeader';
import TaskAutomationCard from './automation/TaskAutomationCard';
import DashboardPreview from './automation/DashboardPreview';
import { automationData } from './automation/AutomationData';
import { Card, CardContent } from '@/components/ui/card';

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
          badge="TIME EFFICIENCY"
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-12 gap-8 mt-10"
        >
          {/* Task Automation - Now comes first and takes up 5 columns */}
          <motion.div variants={itemVariants} className="md:col-span-5 h-full">
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-0">
                <TaskAutomationCard tasks={automationData} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Dashboard Preview - Now comes second and takes up 7 columns */}
          <motion.div variants={itemVariants} className="md:col-span-7 h-full">
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-0">
                <DashboardPreview />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-lg">
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationSection;
