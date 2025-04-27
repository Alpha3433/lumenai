
import React from 'react';

interface MetricCardProps {
  title: string;
  description: string;
  percentage: number;
  label: string;
}

const MetricCard = ({ title, description, percentage, label }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
      <div className="mt-4">
        <span className="text-2xl font-bold text-emerald-600">{percentage}%</span>
        <span className="text-sm text-gray-500 ml-2">{label}</span>
      </div>
    </div>
  );
};

export default MetricCard;
