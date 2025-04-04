
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const BrandLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
        <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Lumen AI</span>
      </span>
    </Link>
  );
};

export default BrandLogo;
