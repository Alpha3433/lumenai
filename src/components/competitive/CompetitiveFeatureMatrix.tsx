
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, CircleDashed, BarChart2 } from 'lucide-react';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface CompetitiveFeatureMatrixProps {
  businessName: string;
  businessDescription: string;
}

const CompetitiveFeatureMatrix: React.FC<CompetitiveFeatureMatrixProps> = ({
  businessName,
  businessDescription
}) => {
  const [matrixData, setMatrixData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateMatrix = async () => {
      try {
        setLoading(true);
        const generatedContent = await generateDynamicContent({
          sectionType: 'competitive-matrix',
          businessName,
          businessDescription
        });
        
        if (generatedContent) {
          setMatrixData(generatedContent);
        }
      } catch (error) {
        console.error('Error generating competitive matrix:', error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && businessDescription) {
      generateMatrix();
    }
  }, [businessName, businessDescription]);

  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Competitive Feature Matrix
          </h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Render placeholder if no data
  if (!matrixData || !matrixData.features || matrixData.features.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6 relative">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Competitive Feature Matrix
          </h2>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            Unable to generate competitive matrix for this business type.
            Try refining your business description for better results.
          </CardContent>
        </Card>
      </section>
    );
  }

  const { features, competitors } = matrixData;
  const getStatusIcon = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'yes':
      case 'full':
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'no':
      case 'none':
        return <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case 'partial':
      case 'limited':
        return <CircleDashed className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      default:
        return <CircleDashed className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Competitive Feature Matrix
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          How we stack up against competitors
        </div>
      </div>

      <Card className="border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left bg-gray-50 dark:bg-gray-900/50 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-center bg-blue-50 dark:bg-blue-900/20 font-medium text-blue-700 dark:text-blue-400 text-sm uppercase tracking-wider">
                    {businessName}
                  </th>
                  {competitors.map((competitor: any, index: number) => (
                    <th key={index} className="py-3 px-4 text-center bg-gray-50 dark:bg-gray-900/50 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                      {competitor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/30 divide-y divide-gray-200 dark:divide-gray-800">
                {features.map((feature: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-900/20' : ''}>
                    <td className="py-4 px-4 text-sm font-medium">
                      {feature.name}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        {getStatusIcon('yes')}
                      </div>
                    </td>
                    {competitors.map((competitor: any, cIndex: number) => (
                      <td key={cIndex} className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          {getStatusIcon(feature.competitorStatus[cIndex])}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CompetitiveFeatureMatrix;
