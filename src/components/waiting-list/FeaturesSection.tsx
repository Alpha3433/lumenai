
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, FileText } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    title: "Market Analysis",
    description: "Get detailed insights into market size, growth potential, and competitive landscape."
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: "Target Audience",
    description: "Identify your ideal customers, their needs, pain points, and buying behavior."
  },
  {
    icon: <FileText className="w-6 h-6 text-green-600" />,
    title: "Business Model",
    description: "Discover the most effective revenue models and pricing strategies for your idea."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    title: "Validation Score",
    description: "Get a clear, data-driven score that tells you if your idea is worth pursuing."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Is It For?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform helps entrepreneurs validate their ideas and avoid building products that won't succeed
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <img 
              src="/public/lovable-uploads/0c0574b5-8cc0-41a2-8b87-ad8df6b502ca.png"
              alt="Platform dashboard" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
