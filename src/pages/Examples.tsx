
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusinessReportModal from '@/components/examples/BusinessReportModal';
import { companyData } from '@/utils/exampleCompanies';
import CompanyGrid from '@/components/examples/CompanyGrid';
import ExamplesHeader from '@/components/examples/ExamplesHeader';

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
        <ExamplesHeader />
        
        <CompanyGrid 
          companies={companyData} 
          onViewReport={openBusinessReport} 
        />
        
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
