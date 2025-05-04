
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FailureInsightProps {
  title: string;
  description: string;
}

const FailureInsight: React.FC<FailureInsightProps> = ({ title, description }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <CheckCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        </div>
        <div>
          <h4 className="font-medium text-red-700 dark:text-red-300 mb-1.5">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FailureInsight;
