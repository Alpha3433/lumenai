
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { FileText, PieChart, BarChart, Globe, Scale, Users, ShieldCheck } from 'lucide-react';

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
    <div className="w-72 border-r border-gray-200 dark:border-gray-800 px-6 py-8 h-screen sticky top-0 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
      <h3 className="font-bold text-xl mb-6">Business Plan</h3>
      <Separator className="mb-6" />
      <div className="space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="w-full flex items-center gap-3 py-3 px-4 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <div className="p-1.5 bg-primary/10 dark:bg-primary/20 rounded-full">
              {section.icon}
            </div>
            <span className="font-medium">{section.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportSidePanel;
