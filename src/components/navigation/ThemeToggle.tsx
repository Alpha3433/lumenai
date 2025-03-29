
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div 
      className="relative flex items-center w-11 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer transition-colors"
      onClick={toggleTheme}
    >
      <span className={`
        absolute left-0.5 top-0.5 flex items-center justify-center w-5 h-5 rounded-full 
        bg-white dark:bg-gray-800 shadow-md transition-transform duration-200
        ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}
      `}>
        {theme === 'dark' ? (
          <Moon className="h-3 w-3 text-indigo-400" />
        ) : (
          <Sun className="h-3 w-3 text-amber-400" />
        )}
      </span>
      <span className="absolute left-1.5 opacity-80">
        <Sun className={`h-3 w-3 ${theme === 'light' ? 'text-amber-500' : 'text-gray-400'}`} />
      </span>
      <span className="absolute right-1.5 opacity-80">
        <Moon className={`h-3 w-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-gray-400'}`} />
      </span>
    </div>
  );
};

export default ThemeToggle;
