
import React from 'react';
import KeyInsightCard from './KeyInsightCard';
import { Lightbulb, Activity } from 'lucide-react';

interface InsightsGridProps {
  strengths: string[];
  opportunities: string[];
}

const InsightsGrid: React.FC<InsightsGridProps> = ({ strengths, opportunities }) => {
  // Process strengths to ensure they're complete sentences and not accidentally split
  const processedStrengths = strengths.map(strength => {
    const trimmed = strength.trim();
    // Check if this strength appears to be a fragment (ends without punctuation and starts with lowercase)
    const seemsFragmented = !trimmed.match(/[.!?]$/) && 
                            !trimmed.match(/^[A-Z]/) && 
                            strengths.length > 1;
    
    // Add a period if needed
    return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
  });
  
  // Process opportunities to ensure they're complete sentences
  const processedOpportunities = opportunities.map(opportunity => 
    opportunity.trim().endsWith('.') ? opportunity : `${opportunity}.`
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <KeyInsightCard 
        title="Key Strengths"
        icon={Lightbulb}
        iconColor="text-amber-500"
        insights={processedStrengths}
        prefix="S"
        badgeColors={{
          bg: "bg-amber-50",
          darkBg: "bg-amber-900/20",
          text: "text-amber-700",
          darkText: "text-amber-300",
          border: "border-amber-200",
          darkBorder: "border-amber-800"
        }}
      />

      {/* Opportunities */}
      <KeyInsightCard 
        title="Key Opportunities"
        icon={Activity}
        iconColor="text-emerald-500"
        insights={processedOpportunities}
        prefix="O"
        badgeColors={{
          bg: "bg-emerald-50",
          darkBg: "bg-emerald-900/20",
          text: "text-emerald-700",
          darkText: "text-emerald-300",
          border: "border-emerald-200",
          darkBorder: "border-emerald-800"
        }}
      />
    </div>
  );
};

export default InsightsGrid;
