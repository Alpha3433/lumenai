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

  // Make sure we're showing tesla, apple, and amazon at the beginning
  const sortedCompanies = [...exampleCompanies].sort((a, b) => {
    // Put tesla, apple, amazon first in that order
    const priority = ['tesla', 'apple', 'amazon'];
    const indexA = priority.indexOf(a.id);
    const indexB = priority.indexOf(b.id);
    
    // If both are in priority list, sort by priority
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only a is in priority, a comes first
    if (indexA !== -1) {
      return -1;
    }
    // If only b is in priority, b comes first
    if (indexB !== -1) {
      return 1;
    }
    // For the rest, keep original order
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      <ExamplesListView 
        companies={sortedCompanies} 
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
