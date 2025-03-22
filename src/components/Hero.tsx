
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(2000); // Start slow
  const [isFinished, setIsFinished] = useState(false);
  const cycleCount = useRef(0);
  const industries = [
    "Tech", 
    "Food", 
    "Health", 
    "Finance", 
    "Travel", 
    "Fashion",
    "Sports",
    "Media",
    "Education",
    "Business" // Business is now the last one
  ];
  const flipInterval = useRef<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Start the flip animation
    flipInterval.current = window.setInterval(() => {
      cycleCount.current += 1;

      // Speed up animation after a few cycles
      if (cycleCount.current === 3) {
        clearInterval(flipInterval.current!);
        setAnimationSpeed(1200);
        
        flipInterval.current = window.setInterval(() => {
          cycleCount.current += 1;
          
          // Speed up even more
          if (cycleCount.current === 7) {
            clearInterval(flipInterval.current!);
            setAnimationSpeed(700);
            
            flipInterval.current = window.setInterval(() => {
              cycleCount.current += 1;
              
              // Final speed and stop at "Business"
              if (cycleCount.current === 12) {
                clearInterval(flipInterval.current!);
                setCurrentIndustry(industries.length - 1); // Set to "Business"
                setIsFinished(true);
              } else {
                setCurrentIndustry(prev => (prev + 1) % industries.length);
              }
            }, 700);
          } else {
            setCurrentIndustry(prev => (prev + 1) % industries.length);
          }
        }, 1200);
      } else {
        setCurrentIndustry(prev => (prev + 1) % industries.length);
      }
    }, 2000);
    
    return () => {
      if (flipInterval.current) clearInterval(flipInterval.current);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
        <h1 
          className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Discover Profitable 
          <span className="relative inline-flex items-center mx-2">
            <span className="text-primary flip-container">
              {industries.map((industry, index) => (
                <span 
                  key={industry} 
                  className={`flip-item absolute left-0 w-full transition-all ${
                    isFinished && index === industries.length - 1
                      ? 'duration-300' 
                      : `duration-${500 - Math.min(300, cycleCount.current * 30)}`
                  } ${
                    index === currentIndustry 
                      ? 'opacity-100 transform-none' 
                      : 'opacity-0 -translate-y-8'
                  }`}
                >
                  {industry}
                </span>
              ))}
            </span>
          </span>
          Niches with AI
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
          <Link to="/examples">
            <Button variant="outline" className="rounded-md h-12 px-8 text-base font-medium border-gray-300 dark:border-gray-700 hover:bg-secondary transition-all">
              Show Examples
            </Button>
          </Link>
        </div>
        
        <div className={`mt-4 text-sm text-gray-500 transition-all duration-700 delay-800 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          No credit card required. 2 free reports per month.
        </div>
      </div>
    </div>
  );
};

export default Hero;
