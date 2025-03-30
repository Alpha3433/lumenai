
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface GeneralSectionsRendererProps {
  sections: string[];
}

const GeneralSectionsRenderer: React.FC<GeneralSectionsRendererProps> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;
  
  // Extract any tabular data from sections (key-value pairs)
  const tableData = extractTableData(sections);
  
  return (
    <>
      <Separator className="my-6" />
      
      {tableData.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Key Points</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map(([key, value], index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <div className="prose dark:prose-invert max-w-none text-sm space-y-4">
        {sections
          .filter(para => !containsKeyValuePair(para))
          .map((paragraph, index) => (
            <div key={index} className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

// Helper function to detect if a paragraph might contain key-value information
function containsKeyValuePair(text: string): boolean {
  return text.includes(':') && text.split(':')[0].length < 30;
}

// Helper function to extract tabular data from paragraphs
function extractTableData(paragraphs: string[]): [string, string][] {
  const tableData: [string, string][] = [];
  
  paragraphs.forEach(paragraph => {
    // Look for key-value patterns like "Key: Value"
    if (containsKeyValuePair(paragraph)) {
      const [key, ...valueParts] = paragraph.split(':');
      const value = valueParts.join(':').trim();
      
      if (key && value) {
        tableData.push([key.trim(), value]);
      }
    }
  });
  
  return tableData;
}

export default GeneralSectionsRenderer;
