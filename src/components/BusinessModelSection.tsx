
import React from 'react';
import { Building } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BusinessModelSectionProps {
  businessModelText: string;
}

const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({ businessModelText }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Building className="h-6 w-6 text-teal-500" />
        Business Model
      </h2>
      
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Value Proposition</h3>
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
                    <p className="text-gray-800 dark:text-gray-200">
                      {businessModelText.split('.').slice(0, 2).join('.') + '.' || "Loading..."}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">Target Customers</h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <p className="text-gray-800 dark:text-gray-200">
                      {businessModelText.split('.').slice(2, 4).join('.') + '.' || "Loading..."}
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Core Strategy</h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">
                      {businessModelText.split('.').slice(4, 8).join('.') || "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue" className="p-2">
              <div className="space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Primary Revenue Sources</h3>
                  <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(0, 3).join('.') + '.' || "Loading..."}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Pricing Strategy</h3>
                    <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(3, 5).join('.') + '.' || "Loading..."}</p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                    <h3 className="text-lg font-semibold mb-2 text-amber-600 dark:text-amber-400">Projected Growth</h3>
                    <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(5, 7).join('.') + '.' || "Loading..."}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="operations" className="p-2">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">Key Partnerships</h3>
                  <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(2, 4).join('.') + '.' || "Loading..."}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Distribution Channels</h3>
                  <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(4, 6).join('.') + '.' || "Loading..."}</p>
                </div>
                
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border border-rose-100 dark:border-rose-800">
                  <h3 className="text-lg font-semibold mb-2 text-rose-600 dark:text-rose-400">Cost Structure</h3>
                  <p className="text-gray-800 dark:text-gray-200">{businessModelText.split('.').slice(6).join('.') || "Loading..."}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default BusinessModelSection;
