
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, ArrowUpRight, BarChart, TrendingUp, Users, Target, LineChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarketAnalysisSectionProps {
  analysisText: string;
}

const MarketAnalysisSection: React.FC<MarketAnalysisSectionProps> = ({ analysisText }) => {
  // Extract market data from analysis text
  const marketData = useMemo(() => {
    // Mock data - in a real app, this would parse the AI-generated text
    return {
      marketSize: "$4.5B",
      growthRate: "12.6%",
      competitors: 7,
      targetCustomers: "18-45 professionals",
      segments: [
        { name: 'Segment A', percent: 45, revenue: 2.1 },
        { name: 'Segment B', percent: 30, revenue: 1.4 },
        { name: 'Segment C', percent: 15, revenue: 0.7 },
        { name: 'Segment D', percent: 10, revenue: 0.3 },
      ],
      trends: [
        { year: '2022', value: 65, growth: 4.2 },
        { year: '2023', value: 78, growth: 5.6 },
        { year: '2024', value: 87, growth: 7.1 },
        { year: '2025', value: 96, growth: 9.5 },
        { year: '2026', value: 120, growth: 12.0 },
      ]
    };
  }, []);

  const chartConfig = {
    trend: { color: '#8B5CF6' },
    growth: { color: '#10B981' }
  };

  return (
    <section className="mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-purple-500" />
        Market Analysis
      </h2>

      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <BarChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1.5">
            <LineChart className="h-4 w-4" /> Trends
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-1.5">
            <Target className="h-4 w-4" /> Segments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Market Size</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{marketData.marketSize}</p>
              </CardContent>
            </Card>
            
            <Card className="border border-indigo-100 dark:border-indigo-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mb-2">
                  <ArrowUpRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{marketData.growthRate}</p>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-100 dark:border-blue-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mb-2">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Competitors</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{marketData.competitors}</p>
              </CardContent>
            </Card>
            
            <Card className="border border-sky-100 dark:border-sky-900/20 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/20 dark:to-gray-900/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="bg-sky-100 dark:bg-sky-900/30 p-2 rounded-full mb-2">
                  <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                <p className="text-lg font-bold text-sky-600 dark:text-sky-400">{marketData.targetCustomers}</p>
              </CardContent>
            </Card>
          </div>

          {/* Market Analysis Text */}
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-medium mb-3 text-gray-700 dark:text-gray-300">Market Analysis</h3>
              <div className="prose dark:prose-invert max-w-none text-sm">
                <p className="leading-relaxed">{analysisText}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300">Market Growth Trend (5-Year Projection)</h3>
              <div className="h-72">
                <ChartContainer className="h-full" config={chartConfig}>
                  <AreaChart 
                    data={marketData.trends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}M`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="Market Value" 
                      stroke="#8B5CF6" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300">Annual Growth Rate (%)</h3>
              <div className="h-64">
                <ChartContainer className="h-full" config={chartConfig}>
                  <ReBarChart 
                    data={marketData.trends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="growth" 
                      name="Growth Rate" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </ReBarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300">Market Segments Breakdown</h3>
              <div className="overflow-hidden">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment</TableHead>
                      <TableHead>Market Share</TableHead>
                      <TableHead>Est. Revenue</TableHead>
                      <TableHead>Potential</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketData.segments.map((segment) => (
                      <TableRow key={segment.name} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{segment.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-purple-600 h-2.5 rounded-full" 
                                style={{ width: `${segment.percent}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{segment.percent}%</span>
                          </div>
                        </TableCell>
                        <TableCell>${segment.revenue}B</TableCell>
                        <TableCell>
                          <Badge variant={segment.percent > 30 ? "default" : segment.percent > 15 ? "secondary" : "outline"}>
                            {segment.percent > 30 ? "High" : segment.percent > 15 ? "Medium" : "Low"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300">Segment Comparison</h3>
              <div className="h-64">
                <ChartContainer className="h-full" config={chartConfig}>
                  <ReBarChart 
                    data={marketData.segments}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="percent" 
                      name="Market Share (%)" 
                      fill="#8B5CF6" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </ReBarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MarketAnalysisSection;
