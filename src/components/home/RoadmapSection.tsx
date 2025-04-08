
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Megaphone, BarChart3 } from 'lucide-react';

const RoadmapSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform for the image to create a parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <section ref={sectionRef} className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Expert Consulting: Your Digital Success Partner
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our team of seasoned consultants works alongside your business to implement proven digital marketing strategies and drive measurable growth. From startups to established enterprises, we transform vision into results.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                  <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Digital Marketing Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our expert team crafts custom marketing strategies, from SEO and content marketing to paid acquisition and social media campaigns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Data-Driven Strategy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Leverage our advanced analytics to transform raw data into actionable insights, optimizing campaigns for maximum ROI and growth.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Dedicated Consulting Team</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Work with our experienced consultants who provide personalized guidance, quarterly strategy reviews, and continuous optimization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 order-1 md:order-2"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl p-1">
              <img 
                src="/lovable-uploads/7ba1cf6a-2c1c-45f8-aed6-d8ef4560c984.png" 
                alt="Digital Marketing Consulting" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
