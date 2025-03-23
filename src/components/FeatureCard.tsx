
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-2xl overflow-hidden relative",
        isHovered ? "transform -translate-y-2" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 opacity-0 transition-opacity duration-300 rounded-2xl ${isHovered ? 'opacity-100' : ''}`} />
      
      <div className="flex flex-col h-full relative z-10">
        <div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
            isHovered ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          )}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        
        {/* Animated corner accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-0 right-0 w-full h-full bg-blue-600/10 dark:bg-blue-500/20 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
