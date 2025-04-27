
import React from 'react';

interface ProgressMetricProps {
  label: string;
  percentage: number;
}

const ProgressMetric = ({ label, percentage }: ProgressMetricProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium">{label}</span>
        <span className="text-emerald-600">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div 
          className="h-full bg-emerald-500 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProgressMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <ProgressMetric label="Problem validation" percentage={95} />
      <ProgressMetric label="Market fit score" percentage={87} />
      <ProgressMetric label="Growth rate" percentage={92} />
    </div>
  );
};

export default ProgressMetrics;
