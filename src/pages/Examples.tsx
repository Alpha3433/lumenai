
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExamplesListView from '@/components/examples/ExamplesListView';
import CompanyReportView from '@/components/examples/CompanyReportView';
import { exampleCompanies, ExampleCompany } from '@/data/exampleCompanies';
import { toast } from 'sonner';

const Examples = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
    // Scroll to top when a company is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
    // Scroll to top when returning to the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPlan = () => {
    // Mock functionality - in a real app, this would generate a PDF
    console.log("Downloading plan for", selectedCompany);
    toast.success("Report download started", {
      description: "Your business report will be ready in a few moments"
    });
  };

  // Find the selected company if one is selected
  const company = selectedCompany 
    ? exampleCompanies.find(c => c.id === selectedCompany) 
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      {!selectedCompany ? (
        <ExamplesListView 
          companies={exampleCompanies} 
          onSelectCompany={handleSelectCompany} 
        />
      ) : company ? (
        <CompanyReportView 
          company={company} 
          onBackToList={handleBackToList} 
          onDownload={handleDownloadPlan} 
        />
      ) : null}
      
      <Footer />
    </div>
  );
};

export default Examples;
