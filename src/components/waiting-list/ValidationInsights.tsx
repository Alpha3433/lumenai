
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MetricCard from './insights/MetricCard';
import ProgressMetrics from './insights/ProgressMetrics';
import ValidationFramework from './insights/ValidationFramework';

const ValidationInsights = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Validation Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get detailed insights into your startup idea's potential
          </p>
        </motion.div>

        <ValidationFramework />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <MetricCard
            title="Talk to Target Users"
            description="Connect with real potential users and get valuable feedback"
            percentage={94}
            label="Success rate"
          />
          <MetricCard
            title="Measure Your Market"
            description="Get precise market size and growth potential data"
            percentage={89}
            label="Accuracy"
          />
          <MetricCard
            title="Full Data with One Report"
            description="Comprehensive analysis in a single, easy-to-read report"
            percentage={100}
            label="Coverage"
          />
        </div>

        <ProgressMetrics />

        <div className="mt-12 text-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2">
            Start Validation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ValidationInsights;
