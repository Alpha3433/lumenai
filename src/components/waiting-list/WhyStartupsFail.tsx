
import React from 'react';
import { motion } from 'framer-motion';

const WhyStartupsFail = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Most Ideas Fail</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            42% of startups fail due to no market need. Don't let your idea become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              Startups often begin with enthusiasm but fail to validate their ideas before fully committing resources. 
              Building a product without proper validation can lead to wasted time, money, and energy.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              How much are you risking by building your solution... only to discover no one wants it?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Top Startup Failure Reasons</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">No Market Need</span>
                  <span className="text-emerald-600 font-medium">42%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ran Out of Cash</span>
                  <span className="text-emerald-600 font-medium">29%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "29%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wrong Team</span>
                  <span className="text-emerald-600 font-medium">23%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "23%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Get Outcompeted</span>
                  <span className="text-emerald-600 font-medium">19%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "19%" }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
