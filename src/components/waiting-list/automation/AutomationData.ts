
import { Clock, CheckCircle, Zap, Database, Search, Users } from 'lucide-react';
import React from 'react';
import { AutomationTaskProps } from './TaskAutomationCard';

export const automationData: AutomationTaskProps[] = [
  { 
    task: "Market research", 
    manual: "40 hours", 
    automated: "2 minutes", 
    icon: React.createElement(Search, { className: "h-5 w-5" }) 
  },
  { 
    task: "Competitor analysis", 
    manual: "35 hours", 
    automated: "1 minute", 
    icon: React.createElement(Zap, { className: "h-5 w-5" }) 
  },
  { 
    task: "Customer validation", 
    manual: "60 hours", 
    automated: "3 minutes", 
    icon: React.createElement(Users, { className: "h-5 w-5" }) 
  },
  { 
    task: "Data processing", 
    manual: "25 hours", 
    automated: "30 seconds", 
    icon: React.createElement(Database, { className: "h-5 w-5" }) 
  }
];
