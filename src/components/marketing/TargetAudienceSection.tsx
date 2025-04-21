
import React from 'react';
import { Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TargetAudienceProps {
  segments: { title: string; description: string }[];
  insights: string[];
}

const TargetAudienceSection = ({ segments = [], insights = [] }: TargetAudienceProps) => {
  return (
    <Card className="border-indigo-200 dark:border-indigo-800/40 shadow-sm bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-indigo-500" />
          <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">
            Target Audience Segments
          </h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {segments && segments.length > 0 ? (
            segments.map((segment, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/40 bg-white/50 dark:bg-gray-900/50"
              >
                <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  {segment.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {segment.description}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 col-span-2 text-center text-gray-500 dark:text-gray-400">
              No audience segments defined yet.
            </div>
          )}
        </div>

        {insights && insights.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Key Insights</h4>
            </div>
            <ul className="space-y-2">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">{insight}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TargetAudienceSection;
