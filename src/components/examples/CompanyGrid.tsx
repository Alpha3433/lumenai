
import React from 'react';
import CompanyCard from './CompanyCard';

interface CompanyGridProps {
  companies: any[];
  onViewReport: (company: any) => void;
}

const CompanyGrid: React.FC<CompanyGridProps> = ({ companies, onViewReport }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {companies.map((company) => (
        <CompanyCard 
          key={company.id} 
          company={company} 
          onViewReport={onViewReport} 
        />
      ))}
    </div>
  );
};

export default CompanyGrid;
