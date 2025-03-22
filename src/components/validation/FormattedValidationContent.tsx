
import React from 'react';
import { formatValidationText } from '@/utils/businessValidation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
          {heading.includes('/100') ? (
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  {/* Extract score if available */}
                  {heading.match(/(\d+)\/100/) ? (
                    <div className="flex-shrink-0 mr-4">
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-lg px-3 py-1.5 rounded-md border-2 font-semibold",
                          parseInt(heading.match(/(\d+)\/100/)?.[1] || '0') >= 70 
                            ? "border-green-400 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                            : parseInt(heading.match(/(\d+)\/100/)?.[1] || '0') >= 50
                              ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                              : "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                        )}
                      >
                        {heading.match(/(\d+)\/100/)?.[0] || ''}
                      </Badge>
                    </div>
                  ) : null}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{heading.replace(/\d+\/100/, '').replace(/^\d+\.\s+/, '').trim()}</h3>
                    {/* Display the explanation points for this score */}
                    {formattedContent.points[index] && formattedContent.points[index].length > 0 && (
                      <p className="text-muted-foreground">{formattedContent.points[index][0]}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : heading.toLowerCase().includes('key strengths') || 
               heading.toLowerCase().includes('key challenges') || 
               heading.toLowerCase().includes('recommendations') ? (
            <Alert className={cn(
              "border-l-4 bg-muted/50 py-4",
              heading.toLowerCase().includes('strengths') 
                ? "border-l-emerald-500" 
                : heading.toLowerCase().includes('challenges')
                  ? "border-l-amber-500"
                  : "border-l-blue-500"
            )}>
              <AlertTitle className="text-lg font-semibold">{heading}</AlertTitle>
              {formattedContent.points[index] && formattedContent.points[index].length > 0 && (
                <ul className="mt-3 space-y-2 pl-2">
                  {formattedContent.points[index].map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <span className={cn(
                        "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        heading.toLowerCase().includes('strengths') 
                          ? "bg-emerald-500" 
                          : heading.toLowerCase().includes('challenges')
                            ? "bg-amber-500"
                            : "bg-blue-500"
                      )}></span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Alert>
          ) : (
            <div>
              <h3 className="font-semibold text-lg">{heading}</h3>
              
              {/* Display bullet points */}
              {formattedContent.points[index] && formattedContent.points[index].length > 0 && (
                <ul className="space-y-2 pl-6 mt-2">
                  {formattedContent.points[index].map((point, pointIndex) => (
                    <li key={pointIndex} className="list-disc text-sm text-muted-foreground">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormattedValidationContent;
