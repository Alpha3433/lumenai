
import React from 'react';
import { motion } from 'framer-motion';

// This component is kept for backwards compatibility but is no longer used
// in the main application. The functionality has been moved to WhoItsForSection.
const ValidationFramework = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h3 className="text-2xl font-bold mb-4">The Lean Validation Framework</h3>
        <p className="text-gray-600 mb-6">
          Our proven methodology helps validate your startup idea quickly and effectively
        </p>
        <div className="flex items-center gap-4 mb-8">
          <img src="/placeholder.svg" alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">Sarah Chen</p>
            <p className="text-sm text-gray-500">Startup Advisor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationFramework;
