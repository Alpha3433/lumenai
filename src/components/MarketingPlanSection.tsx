
import React from 'react';
import { Activity, Lock, Sparkles, Unlock, BarChart2, LineChart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MarketingPlanSectionProps {
  marketingPlanText: string;
  companyName?: string;
  industry?: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

// Predefined marketing channel data for specific companies
const channelData: Record<string, any[]> = {
  'Apple': [
    { name: 'Retail Stores', value: 35 },
    { name: 'Digital Marketing', value: 25 },
    { name: 'Product Launches', value: 20 },
    { name: 'Influencer Partnerships', value: 10 },
    { name: 'PR Campaigns', value: 10 }
  ],
  'Amazon': [
    { name: 'SEO/SEM', value: 30 },
    { name: 'Email Marketing', value: 25 },
    { name: 'Affiliate Programs', value: 20 },
    { name: 'Social Media', value: 15 },
    { name: 'TV Advertising', value: 10 }
  ],
  'Google': [
    { name: 'Digital Advertising', value: 40 },
    { name: 'Developer Relations', value: 25 },
    { name: 'Content Marketing', value: 15 },
    { name: 'Events', value: 10 },
    { name: 'Partnerships', value: 10 }
  ],
  'Microsoft': [
    { name: 'B2B Marketing', value: 35 },
    { name: 'Digital Advertising', value: 25 },
    { name: 'Events/Conferences', value: 20 },
    { name: 'Content Marketing', value: 10 },
    { name: 'Partner Co-marketing', value: 10 }
  ],
  'Tesla': [
    { name: 'Social Media', value: 30 },
    { name: 'PR/Earned Media', value: 25 },
    { name: 'Referral Programs', value: 20 },
    { name: 'Events', value: 15 },
    { name: 'Content Marketing', value: 10 }
  ]
};

// Quarterly marketing budget/spending data
const quarterlyData: Record<string, any[]> = {
  'Apple': [
    { name: 'Q1', budget: 250, spending: 240 },
    { name: 'Q2', budget: 300, spending: 310 },
    { name: 'Q3', budget: 400, spending: 380 },
    { name: 'Q4', budget: 450, spending: 460 }
  ],
  'Amazon': [
    { name: 'Q1', budget: 350, spending: 340 },
    { name: 'Q2', budget: 380, spending: 390 },
    { name: 'Q3', budget: 420, spending: 410 },
    { name: 'Q4', budget: 550, spending: 560 }
  ],
  'Google': [
    { name: 'Q1', budget: 300, spending: 290 },
    { name: 'Q2', budget: 320, spending: 330 },
    { name: 'Q3', budget: 350, spending: 340 },
    { name: 'Q4', budget: 400, spending: 410 }
  ],
  'Microsoft': [
    { name: 'Q1', budget: 280, spending: 270 },
    { name: 'Q2', budget: 310, spending: 320 },
    { name: 'Q3', budget: 350, spending: 340 },
    { name: 'Q4', budget: 420, spending: 430 }
  ],
  'Tesla': [
    { name: 'Q1', budget: 120, spending: 110 },
    { name: 'Q2', budget: 150, spending: 160 },
    { name: 'Q3', budget: 180, spending: 170 },
    { name: 'Q4', budget: 200, spending: 210 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const MarketingPlanSection: React.FC<MarketingPlanSectionProps> = ({ 
  marketingPlanText, 
  companyName = "",
  industry = "",
  isPremium, 
  onUpgrade 
}) => {
  // Select data based on company name or use default data
  const channels = channelData[companyName] || [
    { name: 'Digital Marketing', value: 30 },
    { name: 'Content Marketing', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'PR & Events', value: 15 },
    { name: 'Partnerships', value: 10 }
  ];
  
  const budgetData = quarterlyData[companyName] || [
    { name: 'Q1', budget: 200, spending: 190 },
    { name: 'Q2', budget: 250, spending: 260 },
    { name: 'Q3', budget: 300, spending: 290 },
    { name: 'Q4', budget: 350, spending: 360 }
  ];

  const formatText = (text: string) => {
    if (!text) return [];
    
    // Split text into sections based on common marketing plan structure
    const sections = [
      { title: "Marketing Strategy", regex: /marketing strategy|overall strategy|strategy summary/i },
      { title: "Target Audience", regex: /target audience|customer segments|target market/i },
      { title: "Marketing Channels", regex: /marketing channels|channels|marketing mix/i },
      { title: "Budget & Timeline", regex: /budget|timeline|schedule|financial planning/i },
      { title: "Performance Metrics", regex: /metrics|kpis|performance indicators|measuring success/i }
    ];
    
    // Format the text into sections
    const formattedSections = [];
    let remainingText = text;
    
    sections.forEach(section => {
      const match = remainingText.match(new RegExp(`(?:${section.regex.source})[^]*?(?=(${sections.map(s => s.regex.source).join('|')})|$)`, 'i'));
      if (match) {
        const sectionText = match[0].trim();
        formattedSections.push({ 
          title: section.title, 
          content: sectionText.replace(new RegExp(`^.*?(${section.regex.source}).*?:?`, 'i'), '')
                              .split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
        });
        remainingText = remainingText.replace(sectionText, '');
      }
    });
    
    // If no sections were found, just split by paragraphs
    if (formattedSections.length === 0) {
      formattedSections.push({
        title: "Marketing Plan",
        content: text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
      });
    }
    
    return formattedSections;
  };

  const formattedSections = formatText(marketingPlanText);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold">
          {companyName ? `Marketing Plan for ${companyName}` : "Marketing Plan"}
          {industry && <span className="text-sm ml-2 text-gray-500">({industry})</span>}
        </h2>
      </div>
      
      {isPremium ? (
        <div className="space-y-8">
          <Card className={cn(
            "border border-indigo-200 dark:border-indigo-800/50 shadow-md",
            "bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/30 dark:to-transparent"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Unlock className="h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                  {companyName ? `${companyName}'s Marketing Strategy` : "Premium Marketing Plan"}
                </h3>
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-sm space-y-8">
                {formattedSections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {section.title}
                    </h4>
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Marketing Channels Chart */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-indigo-500" />
                  Marketing Channel Allocation
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={channels}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {channels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Marketing Budget Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-indigo-500" />
                  Marketing Budget vs. Spending
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}M`, undefined]}
                        labelFormatter={(label) => `Quarter: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="budget" name="Budget (millions)" fill="#8884d8" />
                      <Bar dataKey="spending" name="Actual (millions)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm"></div>
          
          <div className="relative z-10 py-10 px-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-5">
              <Lock className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Unlock our comprehensive Marketing Plan section to get detailed strategies for customer acquisition and brand growth.
            </p>
            
            <Button 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-2 shadow-md flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketingPlanSection;
