
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Brush, Clock, Users, Rocket } from 'lucide-react';

const WhyFoundersChooseSection: React.FC = () => {
  // Features data with icons
  const features = [
    {
      icon: Rocket,
      text: "Built 200+ MVPs for founders in 8+ industries",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: CheckCircle,
      text: "85% of validated ideas gained early traction within 30 days",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: Zap,
      text: "Done-for-you ads, design, and launch setup",
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    },
    {
      icon: Clock,
      text: "No-code MVPs built in 48 hours",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: Users,
      text: "Trusted by founders, solo creators & coaches",
      color: "text-rose-500",
      bgColor: "bg-rose-100 dark:bg-rose-900/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Founders Choose Lumen AI Agency
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            We've helped hundreds of founders validate their ideas and launch successful businesses.
            Here's why entrepreneurs trust us with their vision:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 flex items-start gap-4 hover:shadow-lg transition-shadow"
            >
              <div className={`${feature.bgColor} p-3 rounded-lg`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.text}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {index === 0 && "From SaaS to eCommerce to coaching businesses"}
                  {index === 1 && "Fast market validation with measurable results"}
                  {index === 2 && "Complete done-for-you launch package"}
                  {index === 3 && "Rapid prototyping with no technical debt"}
                  {index === 4 && "Join a community of successful entrepreneurs"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "Lumen AI helped us validate our fitness app idea and launch in just 3 weeks. 
              Their expertise in the fitness space and connections to early adopters were invaluable."
            </p>
            <p className="font-medium">Mike Johnson, FitnessAI Co-founder</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyFoundersChooseSection;
