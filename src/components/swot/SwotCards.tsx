
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { SwotComponents } from '@/utils/swotUtils';

interface SwotCardsProps {
  swotData: SwotComponents;
}

const SwotCards: React.FC<SwotCardsProps> = ({ swotData }) => {
  const { strengths, weaknesses, opportunities, threats } = swotData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Strengths
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {strengths.length ? strengths.slice(0, 4).map((strength, i) => (
              <li key={i} className="text-sm" style={{ whiteSpace: 'normal' }}>{strength}</li>
            )) : <li className="text-sm italic text-muted-foreground">No strengths identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Weaknesses
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {weaknesses.length ? weaknesses.slice(0, 4).map((weakness, i) => (
              <li key={i} className="text-sm" style={{ whiteSpace: 'normal' }}>{weakness}</li>
            )) : <li className="text-sm italic text-muted-foreground">No weaknesses identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Opportunities
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {opportunities.length ? opportunities.slice(0, 4).map((opportunity, i) => (
              <li key={i} className="text-sm" style={{ whiteSpace: 'normal' }}>{opportunity}</li>
            )) : <li className="text-sm italic text-muted-foreground">No opportunities identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Threats
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {threats.length ? threats.slice(0, 4).map((threat, i) => (
              <li key={i} className="text-sm" style={{ whiteSpace: 'normal' }}>{threat}</li>
            )) : <li className="text-sm italic text-muted-foreground">No threats identified.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwotCards;
