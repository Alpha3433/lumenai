
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
    console.log("Downloading plan for", selectedCompanyId);
    toast.success("Report download started", {
      description: "Your business report will be ready in a few moments"
    });
  };

  const selectedCompany = selectedCompanyId 
    ? exampleCompanies.find(c => c.id === selectedCompanyId) 
    : null;

  // Filter out Tesla and reorder companies with Spotify first
  const filteredCompanies = exampleCompanies
    .filter(company => company.id !== 'tesla')
    .sort((a, b) => {
      if (a.id === 'spotify') return -1;
      if (b.id === 'spotify') return 1;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      <div className="pt-12">
        <ExamplesListView 
          companies={filteredCompanies}
          onSelectCompany={handleSelectCompany} 
        />
      </div>
      
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
