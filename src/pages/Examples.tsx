
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExamplesListView from '@/components/examples/ExamplesListView';
import CompanyReportView from '@/components/examples/CompanyReportView';
import { exampleCompanies } from '@/data/exampleCompanies';

const Examples = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
  };

  const handleDownloadPlan = () => {
    // Mock functionality - in a real app, this would generate a PDF
    console.log("Downloading plan for", selectedCompany);
  };

  // Find the selected company if one is selected
  const company = selectedCompany 
    ? exampleCompanies.find(c => c.id === selectedCompany) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
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
