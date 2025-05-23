
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Target, TrendingUp } from 'lucide-react';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface GoToMarketStrategyProps {
  businessName: string;
  businessDescription: string;
}

const GoToMarketStrategy: React.FC<GoToMarketStrategyProps> = ({
  businessName,
  businessDescription
}) => {
  const [strategyData, setStrategyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateStrategy = async () => {
      try {
        setLoading(true);
        const generatedContent = await generateDynamicContent({
          sectionType: 'gtm-strategy',
          businessName,
          businessDescription
        });
        
        if (generatedContent) {
          setStrategyData(generatedContent);
        }
      } catch (error) {
        console.error('Error generating GTM strategy:', error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && businessDescription) {
      generateStrategy();
    }
  }, [businessName, businessDescription]);

  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Go-To-Market (GTM) Strategy
          </h2>
        </div>
        <div className="space-y-6">
          {[1, 2].map(index => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Render placeholder if no data
  if (!strategyData || !strategyData.phases || strategyData.phases.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6 relative">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Go-To-Market (GTM) Strategy
          </h2>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            Unable to generate Go-To-Market strategy for this business type.
            Try refining your business description for better results.
          </CardContent>
        </Card>
      </section>
    );
  }

  const { phases, scalingPlaybook } = strategyData;

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Go-To-Market (GTM) Strategy
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Launch and growth planning
        </div>
      </div>

      <div className="space-y-6">
        {/* Launch Phases */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Launch Phases</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phases.map((phase: any, index: number) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold mb-2">{phase.name}</h4>
                  <ul className="text-sm space-y-1">
                    {phase.activities.map((activity: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scaling Playbook */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />
              <h3 className="text-lg font-semibold">Scaling Playbook</h3>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div className="space-y-8 pl-10">
                {scalingPlaybook.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 border-2 border-green-500 flex items-center justify-center">
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{step.milestone}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GoToMarketStrategy;
