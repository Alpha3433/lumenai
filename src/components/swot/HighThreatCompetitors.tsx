
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useCompetitors } from './CompetitorBusinessLogic';
import CompetitorCard from './CompetitorCard';
import CompetitorCardSkeleton from './CompetitorCardSkeleton';

interface HighThreatCompetitorsProps {
  marketAnalysis: string;
}

const HighThreatCompetitors: React.FC<HighThreatCompetitorsProps> = ({ marketAnalysis }) => {
  const { competitorsWithModels, isLoading } = useCompetitors(marketAnalysis);

  if (!competitorsWithModels.length && !isLoading) {
    return null;
  }

  return (
    <Card className="mt-8 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col items-center relative">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Target className="h-5 w-5 text-red-500" />
          </div>
          High Threat Competitors
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full absolute right-0 top-6">
          Competitive intelligence
        </div>
      </div>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <CompetitorCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitorsWithModels.map((competitor, index) => (
              <CompetitorCard 
                key={index} 
                competitor={competitor} 
                index={index} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HighThreatCompetitors;
