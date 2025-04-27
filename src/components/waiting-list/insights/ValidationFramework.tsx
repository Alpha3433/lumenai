
import React from 'react';
import { motion } from 'framer-motion';

const ValidationFramework = () => {
  return (
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
  );
};

export default ValidationFramework;
