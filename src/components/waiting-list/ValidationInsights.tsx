
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">The Lean Validation Framework</h3>
            <p className="text-gray-600 mb-6">
              Our proven methodology helps validate your startup idea quickly and effectively
            </p>
            <div className="flex items-center gap-4 mb-8">
              <img src="/public/placeholder.svg" alt="Avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-gray-500">Startup Advisor</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl">
            <img 
              src="/public/lovable-uploads/498ea166-7fe6-4946-b4da-ac714fee8648.png" 
              alt="Validation Framework" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="font-semibold mb-2">Talk to Target Users</h4>
            <p className="text-gray-600 text-sm">
              Connect with real potential users and get valuable feedback
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-emerald-600">94%</span>
              <span className="text-sm text-gray-500 ml-2">Success rate</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="font-semibold mb-2">Measure Your Market</h4>
            <p className="text-gray-600 text-sm">
              Get precise market size and growth potential data
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-emerald-600">89%</span>
              <span className="text-sm text-gray-500 ml-2">Accuracy</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="font-semibold mb-2">Full Data with One Report</h4>
            <p className="text-gray-600 text-sm">
              Comprehensive analysis in a single, easy-to-read report
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-emerald-600">100%</span>
              <span className="text-sm text-gray-500 ml-2">Coverage</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Problem validation</span>
              <span className="text-emerald-600">95%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Market fit score</span>
              <span className="text-emerald-600">87%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Growth rate</span>
              <span className="text-emerald-600">92%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

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
