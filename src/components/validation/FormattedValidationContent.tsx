
import React from 'react';
import { formatValidationText } from '@/utils/businessValidationUtils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FormattedValidationContentProps {
  validationText: string;
}

const FormattedValidationContent: React.FC<FormattedValidationContentProps> = ({ validationText }) => {
  const formattedContent = formatValidationText(validationText);
  
  return (
    <div className="space-y-6">
      {formattedContent.headings.map((heading, index) => (
        <div key={index} className="space-y-3">
          {/* Format headings based on content */}
          {heading.includes('Overall viability score') || heading.includes(':') ? (
            <div className="flex items-center gap-2 mb-2">
              {/* Extract score if available */}
              {heading.match(/(\d+)\/100/) ? (
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-sm px-2 py-1 rounded-md border-2 font-semibold",
                    parseInt(heading.match(/(\d+)\/100/)?.[1] || '0') >= 70 
                      ? "border-green-400 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      : parseInt(heading.match(/(\d+)\/100/)?.[1] || '0') >= 50
                        ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        : "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                  )}
                >
                  {heading.match(/(\d+)\/100/)?.[0] || ''}
                </Badge>
              ) : null}
              <h3 className="font-semibold text-lg">{heading.replace(/\d+\/100/, '').trim()}</h3>
            </div>
          ) : (
            <Alert className={cn(
              "border-l-4 bg-muted/50",
              heading.toLowerCase().includes('strengths') 
                ? "border-l-emerald-500" 
                : heading.toLowerCase().includes('challenges')
                  ? "border-l-amber-500"
                  : "border-l-blue-500"
            )}>
              <AlertTitle className="font-semibold">{heading}</AlertTitle>
            </Alert>
          )}
          
          {/* Display bullet points */}
          {formattedContent.points[index] && formattedContent.points[index].length > 0 && (
            <ul className="space-y-2 pl-6">
              {formattedContent.points[index].map((point, pointIndex) => (
                <li key={pointIndex} className="list-disc text-sm text-muted-foreground">
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormattedValidationContent;
