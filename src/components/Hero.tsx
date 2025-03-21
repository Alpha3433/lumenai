
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            AI-Powered Business Plans
          </div>
        </div>
        
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Transform your business ideas into <span className="text-primary">exceptional plans</span>
        </h1>
        
        <p 
          className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Create comprehensive, data-driven business plans powered by advanced AI technology. From market analysis to financial projections, we help you build a roadmap to success.
        </p>
        
        <div className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/create">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-8 text-base font-medium shadow-lg shadow-blue-500/20 transition-all">
              Create Your Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" className="rounded-full h-12 px-8 text-base font-medium border-gray-300 dark:border-gray-700 hover:bg-secondary transition-all">
            View Examples
          </Button>
        </div>
      </div>
      
      <div className={`mt-16 md:mt-24 relative w-full max-w-5xl transition-all duration-1000 delay-900 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-b from-blue-600/5 to-blue-600/0 rounded-3xl p-1">
          <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800">
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-8">
              {/* Dashboard Preview */}
              <div className="glass-card rounded-2xl w-full h-full overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="w-64 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto"></div>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-4 p-6">
                  <div className="col-span-3 space-y-4">
                    <div className="h-10 w-2/3 bg-blue-500/10 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="col-span-9 grid grid-cols-2 gap-4">
                    <div className="col-span-2 h-10 bg-blue-500/10 rounded-lg"></div>
                    <div className="col-span-2 h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="col-span-2 h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-t from-background to-transparent blur-lg"></div>
      </div>
    </div>
  );
};

export default Hero;
