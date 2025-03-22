
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ExecutiveSummarySectionProps {
  summaryText: string;
}

const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ summaryText }) => {
  return (
    <section className="mb-12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FileText className="h-6 w-6 text-blue-500" />
        Executive Summary
      </h2>
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
              {summaryText || "Loading..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ExecutiveSummarySection;
