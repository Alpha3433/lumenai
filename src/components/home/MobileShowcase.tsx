
import React from 'react';
import { motion } from 'framer-motion';

const MobileShowcase = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Announcements: Show Progress, Build Trust
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Once users in the loop with timely updates, businesses turn feedback into highlights the changes that make your product better.
        </motion.p>
        
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
          >
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-2">
                  <img 
                    src="/placeholder.svg" 
                    alt={`Mobile view ${item}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="bg-green-100 w-2 h-2 rounded-full"></div>
                    <div className="text-xs text-gray-500">Mobile Friendly</div>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">Business Plan View {item}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Instant access to your business plans on any device
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;
