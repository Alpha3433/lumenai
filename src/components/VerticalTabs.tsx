
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Users, 
  Target, 
  Trello, 
  LineChartIcon,
  Globe, 
  ArrowLeftRight, 
  Zap, 
  Landmark,
  ShieldAlert
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface VerticalTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({ activeTab, setActiveTab }) => {
  // List of report sections with their icons
  const tabs: TabItem[] = [
    { id: 'dashboard', label: 'Summary', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'executive-summary', label: 'Executive Summary', icon: <LineChart className="h-4 w-4" /> },
    { id: 'customer-personas', label: 'Customer Personas', icon: <Users className="h-4 w-4" /> },
    { id: 'swot-analysis', label: 'SWOT Analysis', icon: <Target className="h-4 w-4" /> },
    { id: 'competitive-matrix', label: 'Competitive Matrix', icon: <Trello className="h-4 w-4" /> },
    { id: 'pestel-analysis', label: 'PESTEL Analysis', icon: <LineChartIcon className="h-4 w-4" /> },
    { id: 'porter-five-forces', label: 'Porter Analysis', icon: <ArrowLeftRight className="h-4 w-4" /> },
    { id: 'gtm-strategy', label: 'GTM Strategy', icon: <Target className="h-4 w-4" /> },
    { id: 'monetization', label: 'Monetization', icon: <Landmark className="h-4 w-4" /> },
    { id: 'marketing-plan', label: 'Marketing', icon: <Globe className="h-4 w-4" /> },
    { id: 'retention-strategy', label: 'User Retention', icon: <Users className="h-4 w-4" /> },
    { id: 'business-models', label: 'Business Models', icon: <Zap className="h-4 w-4" /> },
    { id: 'risk-mitigation', label: 'Risk Mitigation', icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  // Handle tab click
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    // Scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-full bg-card/70 backdrop-blur-sm border-r border-border rounded-l-xl">
      <ScrollArea className="h-full w-full py-4">
        <div className="space-y-1 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-left transition-colors",
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default VerticalTabs;
