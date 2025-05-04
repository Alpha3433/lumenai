
import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface GeneratedIdeaProps {
  title: string;
  description: string;
}

const GeneratedIdea: React.FC<GeneratedIdeaProps> = ({ title, description }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <BadgeCheck className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1.5">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedIdea;
