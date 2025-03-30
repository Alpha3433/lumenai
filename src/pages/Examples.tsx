
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessPlanActionBar from '@/components/BusinessPlanActionBar';
import ExecutiveSummarySection from '@/components/ExecutiveSummarySection';
import SwotAnalysis from '@/components/SwotAnalysis';
import PestelAnalysisSection from '@/components/pestel/PestelAnalysisSection';
import PorterFiveForcesSection from '@/components/PorterFiveForcesSection';
import MarketingPlanSection from '@/components/MarketingPlanSection';
import WebBusinessModelsSection from '@/components/WebBusinessModelsSection';
import BusinessPlanDashboard from '@/components/BusinessPlanDashboard';

const Examples = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  // Mock data for example companies
  const exampleCompanies = [
    {
      id: "tesla",
      name: "Tesla, Inc.",
      description: "Electric vehicle and clean energy company focused on manufacturing electric vehicles, battery energy storage, and solar products.",
      industry: "Automotive & Energy",
      executiveSummary: "Tesla is an American electric vehicle and clean energy company that designs and manufactures electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US$600 billion.",
      marketAnalysis: "The electric vehicle market is projected to grow at a CAGR of 21.7% from 2022 to 2030. Tesla maintains a significant market share in the premium electric vehicle segment, with key competitors including traditional automakers like Ford, GM, and Volkswagen, as well as new entrants like Rivian and Lucid Motors. The global shift toward renewable energy and sustainable transportation is creating tailwinds for Tesla's core business segments.",
      businessModel: "Tesla operates a direct-to-consumer sales model, bypassing traditional dealerships. Revenue streams include vehicle sales, energy products, services, and regulatory credits. The company's vertical integration strategy encompasses battery production, charging infrastructure, and advanced software development.",
      marketingPlan: "Tesla's marketing approach relies heavily on word-of-mouth, product innovation, and the personal brand of CEO Elon Musk. Instead of traditional advertising, the company invests in showrooms in high-traffic retail locations, a robust digital presence, and community-building through owner events. Tesla's Referral Program incentivizes existing customers to promote the brand through personal recommendations.",
      swotAnalysis: "Strengths: Brand leadership in EVs, innovative technology, global Supercharger network, vertical integration. Weaknesses: Production challenges, quality control issues, regulatory scrutiny. Opportunities: Growing EV market, energy storage expansion, autonomous driving technology. Threats: Increasing competition, supply chain constraints, potential battery material shortages.",
      financialProjections: "Tesla reported $24.32 billion in revenue in Q2 2023, with automotive revenue accounting for $21.27 billion. The company's gross margin was 18.2%, with an operating margin of 9.6%. Tesla has $26.08 billion in cash and cash equivalents as of Q2 2023, with relatively low debt levels compared to traditional automakers.",
      riskAssessment: "Key risks include production scaling challenges, increasing competition in the EV market, regulatory changes affecting incentives, and supply chain disruptions affecting battery materials. Tesla's technology leadership position and financial strength provide significant risk mitigation factors."
    },
    {
      id: "apple",
      name: "Apple Inc.",
      description: "Technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.",
      industry: "Technology & Consumer Electronics",
      executiveSummary: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software, and online services. Apple is the largest technology company by revenue and has been the world's most valuable company since 2022, with a market capitalization of over US$3 trillion.",
      marketAnalysis: "The global smartphone market is projected to reach $784 billion by 2028, with Apple maintaining premium market share and profitability. The company has strong positions in personal computing, tablets, and wearables, while expanding its services ecosystem. Key competitors include Samsung, Xiaomi, and Google in hardware, and various specialized competitors across its software and services businesses.",
      businessModel: "Apple generates revenue primarily through hardware sales, with growing contributions from services including the App Store, iCloud, Apple Music, Apple TV+, and Apple Pay. The company's ecosystem strategy creates high switching costs and customer loyalty, with seamless integration across devices and services driving recurring revenue.",
      marketingPlan: "Apple's marketing strategy emphasizes premium positioning, product design, and ecosystem benefits. The company utilizes flagship retail stores as experiential marketing centers, product launch events as major media moments, and targeted digital campaigns. Customer education through 'Today at Apple' sessions builds community and deepens product engagement.",
      swotAnalysis: "Strengths: Strong brand value, loyal customer base, vertically integrated ecosystem, financial resources. Weaknesses: Premium pricing limiting market share, dependence on iPhone sales, app store controversies. Opportunities: Services expansion, health technology, augmented reality. Threats: Regulatory scrutiny, competition in emerging markets, supply chain vulnerabilities.",
      financialProjections: "Apple reported $81.8 billion in revenue for Q3 2023, with iPhone contributing $39.67 billion. Services revenue reached $21.21 billion, showing continued growth. The company maintains exceptional gross margins of 44.5% and an operating margin of 30%, with over $162 billion in cash and marketable securities.",
      riskAssessment: "Primary risks include smartphone market saturation, regulatory challenges to App Store policies, geopolitical tensions affecting manufacturing, and technology disruption. Apple's vertical integration, customer loyalty, and financial strength provide considerable insulation against these risks."
    },
    {
      id: "amazon",
      name: "Amazon.com, Inc.",
      description: "E-commerce, cloud computing, digital streaming, and artificial intelligence company.",
      industry: "E-commerce & Technology",
      executiveSummary: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It has been referred to as one of the most influential economic and cultural forces in the world, and is one of the world's most valuable brands.",
      marketAnalysis: "The global e-commerce market is expected to reach $58.74 trillion by 2028, growing at a CAGR of 14.7%. Amazon leads in North America and has significant presence in Europe and Asia. AWS continues to dominate the cloud computing market with approximately 32% market share. Key competitors include Walmart and Alibaba in retail, and Microsoft and Google in cloud services.",
      businessModel: "Amazon operates multiple business models including direct retail, marketplace platform, subscription services (Prime), cloud computing (AWS), digital advertising, and entertainment production. The company prioritizes customer experience and long-term growth over short-term profitability, utilizing data-driven optimization and economies of scale.",
      marketingPlan: "Amazon's marketing strategy leverages its massive customer data to deliver personalized recommendations and targeted advertising. The company focuses on Prime membership growth, content marketing through original programming, and strategic sales events like Prime Day. Search engine optimization and digital advertising represent significant areas of marketing investment.",
      swotAnalysis: "Strengths: Global scale, customer-centric approach, technological infrastructure, diversified revenue streams. Weaknesses: Workplace controversies, thin margins in retail, regulatory scrutiny. Opportunities: International expansion, healthcare services, physical retail innovation. Threats: Antitrust regulation, rising logistics costs, labor organization efforts.",
      financialProjections: "Amazon reported $134.4 billion in net sales for Q2 2023, with AWS generating $22.1 billion. Operating income was $7.7 billion, with AWS contributing $5.4 billion. The company continues to invest heavily in fulfillment capacity, content creation, and new business ventures while maintaining positive free cash flow.",
      riskAssessment: "Key risks include regulatory actions related to market dominance, labor relations challenges, international trade complications, and cybersecurity threats. Amazon's diversified business model, technical capabilities, and scale provide significant risk mitigation."
    }
  ];

  const generateMockBusinessPlan = (company: any) => {
    return {
      executiveSummary: company.executiveSummary,
      marketAnalysis: company.marketAnalysis,
      businessModel: company.businessModel,
      marketingPlan: company.marketingPlan,
      financialProjections: company.financialProjections,
      riskAssessment: company.riskAssessment,
      swotAnalysis: company.swotAnalysis
    };
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
  };

  const handleDownloadPlan = () => {
    // Mock functionality - in a real app, this would generate a PDF
    console.log("Downloading plan for", selectedCompany);
  };

  // Render company selection page
  if (!selectedCompany) {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Example Business Intelligence Reports</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore comprehensive business analysis reports for top global companies
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {exampleCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCompany(company.id)}>
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{company.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3">{company.industry}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {company.description}
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="rounded-full">
                      View Report <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-6">Ready to generate your own business intelligence report?</p>
            <Link to="/create">
              <Button size="lg" className="bg-black hover:bg-black/90 text-white">
                Create Your Business Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.main>
        
        <Footer />
      </div>
    );
  }

  // Find the selected company
  const company = exampleCompanies.find(c => c.id === selectedCompany);
  if (!company) return null;

  // Generate mock business plan data
  const businessPlan = generateMockBusinessPlan(company);

  // Render the business plan report
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto max-w-full py-8 px-4 mt-16">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="mb-6" 
            onClick={handleBackToList}
          >
            ← Back to Examples
          </Button>
        </div>

        <div className="space-y-10 animate-fade-in pb-20">
          <BusinessPlanActionBar 
            businessName={company.name}
            onStartOver={handleBackToList}
            onDownload={handleDownloadPlan}
          />
          
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-xl opacity-50"></div>
              <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Business Plan Dashboard */}
                  <div id="dashboard">
                    <BusinessPlanDashboard 
                      businessName={company.name}
                      businessPlan={businessPlan}
                    />
                  </div>
                  
                  {/* Executive Summary */}
                  <div id="executive-summary">
                    <ExecutiveSummarySection 
                      summaryText={businessPlan.executiveSummary} 
                      businessName={company.name}
                      marketAnalysis={businessPlan.marketAnalysis}
                    />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  {/* SWOT Analysis */}
                  <div id="swot-analysis">
                    <SwotAnalysis 
                      swotText={businessPlan.swotAnalysis} 
                      marketAnalysis={businessPlan.marketAnalysis}
                    />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  {/* PESTEL Analysis */}
                  <div id="pestel-analysis">
                    <PestelAnalysisSection 
                      analysisText={businessPlan.marketAnalysis}
                      businessName={company.name}
                      businessDescription={company.description}
                    />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  {/* Porter's Five Forces Analysis */}
                  <div id="porter-five-forces">
                    <PorterFiveForcesSection 
                      marketAnalysis={businessPlan.marketAnalysis}
                      businessName={company.name}
                      businessDescription={company.description}
                    />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  {/* Marketing Plan */}
                  <div id="marketing-plan">
                    <MarketingPlanSection 
                      marketingPlanText={businessPlan.marketingPlan}
                      businessName={company.name}
                      businessDescription={company.description}
                    />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  {/* Web Business Models */}
                  <div id="business-models">
                    <WebBusinessModelsSection 
                      businessName={company.name}
                      businessDescription={company.description}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Examples;
