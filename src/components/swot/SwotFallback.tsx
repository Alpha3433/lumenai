
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface SwotFallbackProps {
  swotText: string;
}

const SwotFallback: React.FC<SwotFallbackProps> = ({ swotText }) => {
  return (
    <Card className="mt-4 p-4">
      <CardContent>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          SWOT Analysis
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-line">{swotText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwotFallback;
