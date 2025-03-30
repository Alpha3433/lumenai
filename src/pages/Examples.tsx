
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExamplesListView from '@/components/examples/ExamplesListView';
import CompanyModal from '@/components/examples/CompanyModal';
import { exampleCompanies } from '@/data/exampleCompanies';
import { toast } from 'sonner';

const Examples = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const handleCloseModal = () => {
    setSelectedCompanyId(null);
  };

  const handleDownloadPlan = () => {
    // Mock functionality - in a real app, this would generate a PDF
    console.log("Downloading plan for", selectedCompanyId);
    toast.success("Report download started", {
      description: "Your business report will be ready in a few moments"
    });
  };

  // Find the selected company if one is selected
  const selectedCompany = selectedCompanyId 
    ? exampleCompanies.find(c => c.id === selectedCompanyId) 
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      <ExamplesListView 
        companies={exampleCompanies} 
        onSelectCompany={handleSelectCompany} 
      />
      
      <CompanyModal
        company={selectedCompany}
        isOpen={selectedCompanyId !== null}
        onClose={handleCloseModal}
        onDownload={handleDownloadPlan}
      />
      
      <Footer />
    </div>
  );
};

export default Examples;
