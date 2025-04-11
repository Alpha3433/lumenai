
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, BarChart4, CircleDollarSign, Lightbulb } from 'lucide-react';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface MonetizationExperimentsProps {
  businessName: string;
  businessDescription: string;
}

const MonetizationExperiments: React.FC<MonetizationExperimentsProps> = ({
  businessName,
  businessDescription
}) => {
  const [monetizationData, setMonetizationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateMonetization = async () => {
      try {
        setLoading(true);
        const generatedContent = await generateDynamicContent({
          sectionType: 'monetization-experiments',
          businessName,
          businessDescription
        });
        
        if (generatedContent) {
          setMonetizationData(generatedContent);
        }
      } catch (error) {
        console.error('Error generating monetization experiments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && businessDescription) {
      generateMonetization();
    }
  }, [businessName, businessDescription]);

  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Monetization Experiments
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(index => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Render placeholder if no data
  if (!monetizationData || !monetizationData.models || monetizationData.models.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6 relative">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Monetization Experiments
          </h2>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            Unable to generate monetization experiments for this business type.
            Try refining your business description for better results.
          </CardContent>
        </Card>
      </section>
    );
  }

  const { models } = monetizationData;

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Monetization Experiments
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Revenue model testing and optimization
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model: any, index: number) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {model.icon === 'CreditCard' && <CreditCard className="h-5 w-5" />}
                  {model.icon === 'BarChart4' && <BarChart4 className="h-5 w-5" />}
                  {model.icon === 'CircleDollarSign' && <CircleDollarSign className="h-5 w-5" />}
                  {model.icon === 'Lightbulb' && <Lightbulb className="h-5 w-5" />}
                </div>
                <h3 className="font-semibold text-lg">{model.name}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {model.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Potential Revenue</div>
                  <div className="text-green-600 dark:text-green-400 font-medium">{model.revenue}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Implementation Time</div>
                  <div>{model.timeline}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Key Success Metric</div>
                  <div>{model.metric}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MonetizationExperiments;
