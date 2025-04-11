
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, TrendingDown, Server } from 'lucide-react';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface RiskMitigationPlaybookProps {
  businessName: string;
  businessDescription: string;
}

const RiskMitigationPlaybook: React.FC<RiskMitigationPlaybookProps> = ({
  businessName,
  businessDescription
}) => {
  const [risks, setRisks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateRisks = async () => {
      try {
        setLoading(true);
        const generatedContent = await generateDynamicContent({
          sectionType: 'risk-mitigation',
          businessName,
          businessDescription
        });
        
        if (generatedContent && Array.isArray(generatedContent)) {
          setRisks(generatedContent);
        }
      } catch (error) {
        console.error('Error generating risk mitigation strategies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && businessDescription) {
      generateRisks();
    }
  }, [businessName, businessDescription]);

  function getRiskIcon(category: string) {
    switch(category?.toLowerCase()) {
      case 'technology':
        return <Server className="h-5 w-5" />;
      case 'market':
        return <TrendingDown className="h-5 w-5" />;
      case 'user':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <ShieldAlert className="h-5 w-5" />;
    }
  }

  function getRiskLevelStyle(severity: string) {
    switch(severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  }

  function getRiskSeverityTextStyle(severity: string) {
    switch(severity?.toLowerCase()) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Risk Mitigation Playbook
          </h2>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map(index => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Render placeholder if no data
  if (risks.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6 relative">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Risk Mitigation Playbook
          </h2>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            Unable to generate risk mitigation strategies for this business type.
            Try refining your business description for better results.
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Risk Mitigation Playbook
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Preparing for potential challenges
        </div>
      </div>

      <div className="space-y-6">
        {risks.map((risk, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${getRiskLevelStyle(risk.severity)}`}>
                  {getRiskIcon(risk.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{risk.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category: {risk.category}</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className={`text-sm font-medium ${getRiskSeverityTextStyle(risk.severity)}`}>
                      {risk.severity} Risk
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-gray-700 dark:text-gray-300">{risk.description}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Early Warning Signs</span>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                    {risk.warningSignals.map((signal: string, i: number) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-green-500" />
                    <span>Mitigation Strategy</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                    <div className="text-gray-700 dark:text-gray-300">{risk.mitigation}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Contingency Plan</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                    <div className="text-gray-700 dark:text-gray-300">{risk.contingency}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RiskMitigationPlaybook;
