import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
const NewHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);
  const {
    user
  } = useAuth();
  const {
    scrollY
  } = useScroll();
  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.scrollY);
      }
    };
    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    return () => window.removeEventListener('resize', updateContainerPosition);
  }, []);
  const mockupY = useTransform(scrollY, [containerTop - 500, containerTop + 500], [0, 150]);
  return <div ref={containerRef} className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
            AI-Powered Business Building
          </span>
        </div>

        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          Turn <span className="text-blue-600">Business Ideas</span> Into Your Product's Secret Weapon
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }}>
          An affordable way to validate business ideas that works your product gives the industry boost all customer-centric, with simple product enhancements with ease
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to={user ? "/create" : "/register"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-12 px-8 text-lg font-medium">
              Try for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/examples">
            <Button variant="outline" className="rounded-md h-12 px-8 text-lg font-medium border-gray-300 dark:border-gray-700">
              See Real Business Plans
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div style={{
      y: mockupY
    }} className="relative w-full max-w-5xl mx-auto perspective-1000 -mt-10" initial={{
      opacity: 0,
      y: 40
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: 0.3
    }}>
        <div className="relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-3">
              <div className="flex items-center justify-between p-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white h-8 w-8 rounded-md flex items-center justify-center font-bold">LA</div>
                  <div className="text-sm font-medium">Lumen AI</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">PRO features</span>
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Beautiful Templates</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-[500px] flex items-center justify-center">
                  <img src="/lovable-uploads/a880096e-a58b-47dc-b1d0-3df2d05d533f.png" alt="Business Platform Dashboard" className="w-full h-full scale-100 hover:scale-105 transition-transform duration-300 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-xl"></div>
      </motion.div>
    </div>;
};
export default NewHero;