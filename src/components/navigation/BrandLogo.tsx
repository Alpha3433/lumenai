
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BrandLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <motion.span 
        className="text-xl md:text-2xl font-bold flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Luman AI</span>
      </motion.span>
    </Link>
  );
};

export default BrandLogo;
