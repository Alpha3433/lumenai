
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { generateDynamicContent } from '@/utils/dynamicContentGenerator';
import { Skeleton } from '@/components/ui/skeleton';

interface CustomerPersonasSectionProps {
  businessName: string;
  businessDescription: string;
}

const CustomerPersonasSection: React.FC<CustomerPersonasSectionProps> = ({
  businessName,
  businessDescription
}) => {
  const [personas, setPersonas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generatePersonas = async () => {
      try {
        setLoading(true);
        const generatedContent = await generateDynamicContent({
          sectionType: 'customer-personas',
          businessName,
          businessDescription
        });
        
        if (generatedContent && Array.isArray(generatedContent)) {
          setPersonas(generatedContent);
        } else {
          console.error('Invalid personas data structure:', generatedContent);
          // Fallback to default personas if necessary
        }
      } catch (error) {
        console.error('Error generating customer personas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && businessDescription) {
      generatePersonas();
    }
  }, [businessName, businessDescription]);

  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Customer Persona Deep-Dive
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(index => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Skeleton className="h-12 w-3/4 mb-4" />
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

  // If we have no personas but aren't loading, show a message
  if (personas.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Customer Persona Deep-Dive
          </h2>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            No customer personas could be generated for this business. 
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
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Customer Persona Deep-Dive
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Understanding your target audience
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-semibold">
                  {persona.emoji || '👤'}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{persona.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{persona.role}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Demographics</div>
                  <p className="text-gray-600 dark:text-gray-400">{persona.demographics}</p>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Goals & Motivations</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {persona.goals?.map((goal: string, i: number) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Pain Points</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {persona.painPoints?.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CustomerPersonasSection;
