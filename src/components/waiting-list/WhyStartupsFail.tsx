
import React from 'react';
import { motion } from 'framer-motion';

const WhyStartupsFail = () => {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Most Ideas Fail</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            45% of startups fail due to no market need. Don't let your idea become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">No Market Validation</h3>
              <p className="text-gray-600">Building without validating leads to wasted time and resources</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Wrong Target Audience</h3>
              <p className="text-gray-600">Misidentifying your audience leads to poor product-market fit</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Poor Timing</h3>
              <p className="text-gray-600">Launching at the wrong time can doom even great ideas</p>
            </div>
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ran Out of Cash</span>
                  <span className="text-emerald-600 font-medium">29%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wrong Team</span>
                  <span className="text-emerald-600 font-medium">23%</span>
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
