
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, TrendingUp, Users, PieChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Examples = () => {
  const [selectedTab, setSelectedTab] = useState('market');
  
  const exampleCompanies = [
    {
      name: "Tech Innovators Inc.",
      industry: "Technology",
      marketSize: "$4.2 Trillion",
      targetAudience: "Enterprise Organizations",
      growthRate: "14.5% Annually",
      revenue: { year1: "$2.7M", year3: "$8.5M" },
      keyStrengths: ["Proprietary AI Technology", "Global Distribution Network", "Strong IP Portfolio"],
      keyOpportunities: ["Emerging Markets Expansion", "B2B Service Integration", "Cloud Migration Services"]
    },
    {
      name: "Green Energy Solutions",
      industry: "Renewable Energy",
      marketSize: "$1.4 Trillion",
      targetAudience: "Corporate & Residential",
      growthRate: "22.3% Annually",
      revenue: { year1: "$1.8M", year3: "$7.2M" },
      keyStrengths: ["Patent-Protected Technology", "Government Incentive Eligibility", "Low Production Costs"],
      keyOpportunities: ["Regulatory Tailwinds", "Infrastructure Modernization", "International Expansion"]
    },
    {
      name: "Wellness Lifestyle Brands",
      industry: "Health & Wellness",
      marketSize: "$1.8 Trillion",
      targetAudience: "Millennials & Gen Z",
      growthRate: "17.1% Annually",
      revenue: { year1: "$1.2M", year3: "$5.6M" },
      keyStrengths: ["Organic Certification", "Direct-to-Consumer Model", "Brand Loyalty"],
      keyOpportunities: ["E-commerce Integration", "Subscription Revenue Model", "Health-conscious Market Growth"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-1 container max-w-7xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Business Intelligence Examples</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore how our AI analyzes top companies across different industries to uncover valuable business insights
          </p>
        </div>
        
        <Tabs defaultValue="market" value={selectedTab} onValueChange={setSelectedTab} className="mb-16">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="financial">Financial Projections</TabsTrigger>
            <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="market" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {exampleCompanies.map((company, index) => (
                <Card key={`market-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {company.name}
                    </CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Size</h4>
                        <p className="text-lg font-semibold">{company.marketSize}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Audience</h4>
                        <p className="text-lg">{company.targetAudience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Growth Rate</h4>
                        <p className="text-lg text-green-600 dark:text-green-400 font-semibold">{company.growthRate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projections (3-Year Outlook)</CardTitle>
                <CardDescription>Financial forecasts generated by our AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Year 1 Revenue</TableHead>
                      <TableHead>Year 3 Revenue</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exampleCompanies.map((company, index) => {
                      const year1Value = parseFloat(company.revenue.year1.replace('$', '').replace('M', ''));
                      const year3Value = parseFloat(company.revenue.year3.replace('$', '').replace('M', ''));
                      const growthPercentage = ((year3Value - year1Value) / year1Value * 100).toFixed(1);
                      
                      return (
                        <TableRow key={`financial-${index}`}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>{company.industry}</TableCell>
                          <TableCell>{company.revenue.year1}</TableCell>
                          <TableCell>{company.revenue.year3}</TableCell>
                          <TableCell className="text-green-600 dark:text-green-400">+{growthPercentage}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="swot" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {exampleCompanies.map((company, index) => (
                <Card key={`swot-${index}`}>
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                          <Users className="h-4 w-4" />
                          Key Strengths
                        </h4>
                        <ul className="space-y-1 list-disc list-inside text-sm">
                          {company.keyStrengths.map((strength, idx) => (
                            <li key={`strength-${index}-${idx}`}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                          <PieChart className="h-4 w-4" />
                          Key Opportunities
                        </h4>
                        <ul className="space-y-1 list-disc list-inside text-sm">
                          {company.keyOpportunities.map((opportunity, idx) => (
                            <li key={`opportunity-${index}-${idx}`}>{opportunity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <p className="text-lg mb-6">Ready to generate your own business intelligence report?</p>
          <Link to="/create">
            <Button size="lg" className="bg-black hover:bg-black/90 text-white">
              Try For Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Examples;
