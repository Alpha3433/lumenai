
import React from 'react';
import { TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { SwotComponents } from '@/utils/swotUtils';

interface MockSwotTableProps {
  swotData: SwotComponents;
}

const MockSwotTable: React.FC<MockSwotTableProps> = ({ swotData }) => {
  const { strengths, weaknesses, opportunities, threats } = swotData;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 bg-green-50 dark:bg-green-900/20 text-center border">
              <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <TrendingUp className="h-4 w-4" />
                Strengths
              </div>
            </th>
            <th className="p-3 bg-red-50 dark:bg-red-900/20 text-center border">
              <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                <TrendingDown className="h-4 w-4" />
                Weaknesses
              </div>
            </th>
            <th className="p-3 bg-blue-50 dark:bg-blue-900/20 text-center border">
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                <Zap className="h-4 w-4" />
                Opportunities
              </div>
            </th>
            <th className="p-3 bg-amber-50 dark:bg-amber-900/20 text-center border">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Threats
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3].map((index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
              <td className="p-3 border text-sm">
                <div className="flex gap-2">
                  <span className="text-green-500 font-medium">•</span>
                  <span>{strengths[index]}</span>
                </div>
              </td>
              <td className="p-3 border text-sm">
                <div className="flex gap-2">
                  <span className="text-red-500 font-medium">•</span>
                  <span>{weaknesses[index]}</span>
                </div>
              </td>
              <td className="p-3 border text-sm">
                <div className="flex gap-2">
                  <span className="text-blue-500 font-medium">•</span>
                  <span>{opportunities[index]}</span>
                </div>
              </td>
              <td className="p-3 border text-sm">
                <div className="flex gap-2">
                  <span className="text-amber-500 font-medium">•</span>
                  <span>{threats[index]}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MockSwotTable;
