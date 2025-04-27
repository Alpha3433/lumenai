
import React from 'react';
import { motion } from 'framer-motion';

const AutomationSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Automation That Saves You Hours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform automates the tedious parts of validation so you can focus on building your business
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-700 text-white">
                <th className="py-3 px-4 text-left font-medium">Manual Task</th>
                <th className="py-3 px-4 text-center font-medium">Without Tools</th>
                <th className="py-3 px-4 text-center font-medium">With Automation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Competitor research</td>
                <td className="py-3 px-4 text-center text-red-500">1-2 weeks</td>
                <td className="py-3 px-4 text-center text-emerald-600">2 minutes</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-3 px-4 text-gray-800">Market size analysis</td>
                <td className="py-3 px-4 text-center text-red-500">3-5 days</td>
                <td className="py-3 px-4 text-center text-emerald-600">1 minute</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Customer persona</td>
                <td className="py-3 px-4 text-center text-red-500">1 week</td>
                <td className="py-3 px-4 text-center text-emerald-600">3 minutes</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-3 px-4 text-gray-800">Launch plan</td>
                <td className="py-3 px-4 text-center text-red-500">2 weeks</td>
                <td className="py-3 px-4 text-center text-emerald-600">5 minutes</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Product-market fit</td>
                <td className="py-3 px-4 text-center text-red-500">1-3 months</td>
                <td className="py-3 px-4 text-center text-emerald-600">1-2 days</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-10"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="h-64 overflow-hidden">
              <img 
                src="/public/placeholder.svg" 
                alt="Analytics dashboard" 
                className="w-full h-auto border border-gray-200 rounded"
              />
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Your startup idea. You deserve better. You need data now.</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Stop guessing if your idea will succeed</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Get actionable data about your market</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Make confident decisions about your startup</span>
              </li>
            </ul>
            <button className="mt-8 bg-white text-emerald-600 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition">
              Join Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationSection;
