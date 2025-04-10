
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: 'Jan', visitors: 400, revenue: 2400 },
  { name: 'Feb', visitors: 300, revenue: 1398 },
  { name: 'Mar', visitors: 500, revenue: 3800 },
  { name: 'Apr', visitors: 278, revenue: 3908 },
  { name: 'May', visitors: 189, revenue: 4800 },
  { name: 'Jun', visitors: 239, revenue: 3800 },
  { name: 'Jul', visitors: 349, revenue: 4300 },
];

const pieData = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablet', value: 200 },
];

export default function Analytics() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <Navbar />
        <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Visitors</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,356</div>
              <p className="text-green-500 text-sm flex items-center mt-2">
                <span>↑ 12.5% from last week</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$18,420</div>
              <p className="text-green-500 text-sm flex items-center mt-2">
                <span>↑ 8.2% from last week</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.2%</div>
              <p className="text-red-500 text-sm flex items-center mt-2">
                <span>↓ 0.5% from last week</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Visitor and revenue trends over the last months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] mt-4">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Visitors",
                        color: "#4f46e5"
                      },
                      revenue: {
                        label: "Revenue",
                        color: "#10b981"
                      }
                    }}
                  >
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#4f46e5" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traffic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    Distribution of traffic by source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        Mobile: {
                          label: "Mobile",
                          color: "#4f46e5"
                        },
                        Desktop: {
                          label: "Desktop",
                          color: "#10b981"
                        },
                        Tablet: {
                          label: "Tablet",
                          color: "#f59e0b"
                        }
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>
                    Performance metrics by traffic channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        visitors: {
                          label: "Visitors",
                          color: "#4f46e5"
                        }
                      }}
                    >
                      <BarChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="visitors" fill="#4f46e5" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="conversions">
            <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Conversion Analytics</CardTitle>
                <CardDescription>
                  Detailed conversion metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] mt-4">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "#10b981"
                      }
                    }}
                  >
                    <BarChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#10b981" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
