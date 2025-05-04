
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Brush, Clock, Users, Rocket, LineChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyFoundersChooseSection: React.FC = () => {
  // Features data with icons
  const features = [
    {
      icon: Rocket,
      title: "Industry Experience",
      text: "Built 200+ MVPs for founders in 8+ industries",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100/80 dark:bg-indigo-900/20"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      text: "85% of validated ideas gained early traction within 30 days",
      color: "text-green-500",
      bgColor: "bg-green-100/80 dark:bg-green-900/20"
    },
    {
      icon: Zap,
      title: "Full-Service Solution",
      text: "Done-for-you ads, design, and launch setup",
      color: "text-amber-500",
      bgColor: "bg-amber-100/80 dark:bg-amber-900/20"
    },
    {
      icon: Clock,
      title: "Rapid Development",
      text: "No-code MVPs built in 48 hours",
      color: "text-purple-500",
      bgColor: "bg-purple-100/80 dark:bg-purple-900/20"
    },
    {
      icon: Users,
      title: "Trusted Partners",
      text: "Trusted by founders, solo creators & coaches",
      color: "text-rose-500",
      bgColor: "bg-rose-100/80 dark:bg-rose-900/20"
    },
    {
      icon: LineChart,
      title: "Data-Driven Success",
      text: "Custom analytics to measure & optimize KPIs",
      color: "text-blue-500",
      bgColor: "bg-blue-100/80 dark:bg-blue-900/20"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            Why Founders Choose Lumen AI Agency
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            We've helped hundreds of founders validate their ideas and launch successful businesses.
            Here's why entrepreneurs trust us with their vision:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className={`${feature.bgColor} p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base">
                      {feature.text}
                    </p>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {index === 0 && "From SaaS to eCommerce to coaching businesses"}
                      {index === 1 && "Fast market validation with measurable results"}
                      {index === 2 && "Complete done-for-you launch package"}
                      {index === 3 && "Rapid prototyping with no technical debt"}
                      {index === 4 && "Join a community of successful entrepreneurs"}
                      {index === 5 && "Real-time performance tracking and optimization"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    FitnessAI
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
                    "Lumen AI helped us validate our fitness app idea and launch in just 3 weeks. 
                    Their expertise in the fitness space and connections to early adopters were invaluable."
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">Mike Johnson, FitnessAI Co-founder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyFoundersChooseSection;
