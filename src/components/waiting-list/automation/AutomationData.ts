
import { Clock, CheckCircle, Zap, Database } from 'lucide-react';
import React from 'react';
import { AutomationTaskProps } from './TaskAutomationCard';

export const automationData: AutomationTaskProps[] = [
  { task: "Market research", manual: "1-2 weeks", automated: "2 minutes", icon: <Database className="h-5 w-5" /> },
  { task: "Competitor analysis", manual: "3-5 days", automated: "1 minute", icon: <Zap className="h-5 w-5" /> },
  { task: "Customer persona", manual: "1 week", automated: "3 minutes", icon: <CheckCircle className="h-5 w-5" /> },
  { task: "Launch planning", manual: "2 weeks", automated: "5 minutes", icon: <Clock className="h-5 w-5" /> }
];
