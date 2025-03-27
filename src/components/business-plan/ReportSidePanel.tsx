
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { FileText, PieChart, LineChart, Users, Globe, BarChart, Scale, ShieldCheck } from 'lucide-react';

interface SectionLink {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const ReportSidePanel = () => {
  const sections: SectionLink[] = [
    { id: 'executive-summary', title: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'dashboard', title: 'Dashboard', icon: <PieChart className="h-4 w-4" /> },
    { id: 'swot-analysis', title: 'SWOT Analysis', icon: <BarChart className="h-4 w-4" /> },
    { id: 'pestel-analysis', title: 'PESTEL Analysis', icon: <Globe className="h-4 w-4" /> },
    { id: 'porter-five-forces', title: "Porter's Five Forces", icon: <Scale className="h-4 w-4" /> },
    { id: 'marketing-plan', title: 'Marketing Plan', icon: <Users className="h-4 w-4" /> },
    { id: 'business-models', title: 'Business Models', icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-52 border-r border-gray-200 dark:border-gray-800 pr-2 h-screen sticky top-0 overflow-y-auto bg-background">
      <h3 className="font-medium text-md mb-4 pl-4 pt-6">Business Plan</h3>
      <Separator className="mb-4" />
      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="w-full flex items-center gap-2 py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            {section.icon}
            <span>{section.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportSidePanel;
