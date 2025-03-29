
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface FinancialDisplayProps {
  company: any;
}

const FinancialDisplay: React.FC<FinancialDisplayProps> = ({ company }) => {
  // Generate mock financial data if not provided
  const financialData = company.financials || {
    revenueGrowth: [
      { year: 'Year 1', revenue: Math.floor(Math.random() * 50) + 50 },
      { year: 'Year 2', revenue: Math.floor(Math.random() * 70) + 70 },
      { year: 'Year 3', revenue: Math.floor(Math.random() * 90) + 90 },
      { year: 'Year 4', revenue: Math.floor(Math.random() * 110) + 110 },
      { year: 'Year 5', revenue: Math.floor(Math.random() * 130) + 130 },
    ],
    profitMargins: [
      { year: 'Year 1', margin: Math.floor(Math.random() * 15) + 10 },
      { year: 'Year 2', margin: Math.floor(Math.random() * 18) + 12 },
      { year: 'Year 3', margin: Math.floor(Math.random() * 20) + 15 },
      { year: 'Year 4', margin: Math.floor(Math.random() * 22) + 18 },
      { year: 'Year 5', margin: Math.floor(Math.random() * 25) + 20 },
    ],
    keyMetrics: {
      revenuePerEmployee: `$${(Math.random() * 900000 + 100000).toFixed(0)}`,
      operatingMargin: `${(Math.random() * 25 + 15).toFixed(1)}%`,
      returnOnAssets: `${(Math.random() * 15 + 5).toFixed(1)}%`,
      debtToEquity: (Math.random() * 0.8 + 0.2).toFixed(2),
    },
    financialBreakdown: [
      { category: 'Product Revenue', percentage: Math.floor(Math.random() * 30) + 50 },
      { category: 'Service Revenue', percentage: Math.floor(Math.random() * 20) + 20 },
      { category: 'Subscription Revenue', percentage: Math.floor(Math.random() * 15) + 5 },
      { category: 'Other Revenue', percentage: Math.floor(Math.random() * 10) + 5 },
    ]
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Financial Analysis</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Comprehensive analysis of {company.name}'s financial performance, growth projections, and key metrics.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={financialData.revenueGrowth}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}M`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profit Margins</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={financialData.profitMargins}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Profit Margin']} />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Revenue Per Employee</div>
            <div className="text-xl font-bold">{financialData.keyMetrics.revenuePerEmployee}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Operating Margin</div>
            <div className="text-xl font-bold">{financialData.keyMetrics.operatingMargin}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Return on Assets</div>
            <div className="text-xl font-bold">{financialData.keyMetrics.returnOnAssets}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Debt to Equity</div>
            <div className="text-xl font-bold">{financialData.keyMetrics.debtToEquity}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Visualization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialData.financialBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDisplay;
