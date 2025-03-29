
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessReportModal from '@/components/examples/BusinessReportModal';
import { companyData } from '@/utils/exampleCompanies';

const Examples = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const openBusinessReport = (company) => {
    setSelectedCompany(company);
    setIsReportModalOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <motion.main 
        className="flex-1 container max-w-7xl mx-auto px-4 py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Business Intelligence Examples</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Explore in-depth analyses of top real-world companies and see how our AI generates comprehensive business reports
          </p>
          <div className="max-w-xl mx-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Disclaimer: These reports contain mock data based on publicly available information about real companies. 
              They are for demonstration purposes only.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {companyData.map((company, index) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-800">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                <img 
                  src={company.logoUrl} 
                  alt={`${company.name} logo`} 
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 text-xs font-medium px-2.5 py-1 rounded-full text-gray-800 dark:text-gray-200 backdrop-blur-sm">
                  {company.industry}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">{company.name}</CardTitle>
                <CardDescription>{company.shortDescription}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4 flex-grow">
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Founded:</span> 
                    <span>{company.founded}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">HQ:</span> 
                    <span>{company.headquarters}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Revenue:</span> 
                    <span className="text-green-600 dark:text-green-500 font-medium">{company.revenue}</span>
                  </li>
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => openBusinessReport(company)} 
                  className="w-full"
                >
                  View Business Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg mb-6">Ready to generate your own business intelligence report?</p>
          <Link to="/create">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Try For Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.main>
      
      {selectedCompany && (
        <BusinessReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          company={selectedCompany}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Examples;
