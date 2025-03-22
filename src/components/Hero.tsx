
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Search, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
        <h1 
          className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Discover Profitable <span className="text-primary">Business Niches</span> with AI
        </h1>
        
        <p 
          className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Stop guessing, start knowing. Our AI-powered platform helps solopreneurs identify low-competition, high-profit niches in minutes, not months.
        </p>
        
        <div className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/create">
            <Button className="bg-black hover:bg-black/90 text-white rounded-md h-12 px-8 text-base font-medium transition-all">
              Try for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" className="rounded-md h-12 px-8 text-base font-medium border-gray-300 dark:border-gray-700 hover:bg-secondary transition-all">
            Show Examples
          </Button>
        </div>
        
        <div className={`mt-4 text-sm text-gray-500 transition-all duration-700 delay-800 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          No credit card required. 2 free reports per month.
        </div>
      </div>
    </div>
  );
};

export default Hero;
