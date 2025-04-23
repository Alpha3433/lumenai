
import React from "react";
import { AlertCircle } from "lucide-react";

interface RedditErrorProps {
  error: string;
  onRetry: () => void;
}

const RedditError: React.FC<RedditErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-red-700 dark:text-red-300 font-medium">Error loading data</p>
      </div>
      <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
      <button 
        onClick={onRetry}
        className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-800/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded text-sm font-medium transition-colors"
      >
        Reload page
      </button>
    </div>
  );
};

export default RedditError;
