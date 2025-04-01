
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  // Check for system preference or stored preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for stored preference first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    
    // If no stored preference, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  });

  // Handle theme change
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the selected theme
    root.classList.add(theme);
    
    // Store the preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ToggleGroup 
      type="single" 
      value={theme} 
      onValueChange={(value) => {
        if (value) setTheme(value as 'light' | 'dark');
      }}
      className="border rounded-full p-0.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm scale-90"
    >
      <AnimatePresence mode="wait">
        <ToggleGroupItem 
          value="light" 
          aria-label="Light mode"
          className="rounded-full data-[state=on]:bg-white data-[state=on]:text-yellow-500 data-[state=on]:shadow-sm h-6 w-6 p-0.5"
        >
          {theme === 'light' ? (
            <motion.div
              key="light"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-3.5 w-3.5" />
            </motion.div>
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )}
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="dark" 
          aria-label="Dark mode"
          className="rounded-full data-[state=on]:bg-gray-900 data-[state=on]:text-blue-400 data-[state=on]:shadow-sm h-6 w-6 p-0.5"
        >
          {theme === 'dark' ? (
            <motion.div
              key="dark"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-3.5 w-3.5" />
            </motion.div>
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </ToggleGroupItem>
      </AnimatePresence>
    </ToggleGroup>
  );
};

export default ThemeToggle;
