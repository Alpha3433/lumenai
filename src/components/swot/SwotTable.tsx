
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { SwotComponents } from '@/utils/swotUtils';

interface SwotTableProps {
  swotData: SwotComponents;
}

const SwotTable: React.FC<SwotTableProps> = ({ swotData }) => {
  const { strengths, weaknesses, opportunities, threats } = swotData;

  // Helper function to get a more informative empty state message
  const getEmptyMessage = (category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats') => {
    switch (category) {
      case 'strengths':
        return "No significant strengths identified. This could indicate a new business or limited competitive advantages.";
      case 'weaknesses':
        return "No significant weaknesses identified. This suggests your business model may be solid, but consider potential blind spots.";
      case 'opportunities':
        return "No significant opportunities identified. Consider exploring adjacent markets or innovations that could create new opportunities.";
      case 'threats':
        return "No significant threats identified. While positive, remain vigilant about market changes and emerging competitors.";
      default:
        return "No items identified for this category.";
    }
  };

  // Ensure we have at least one row even if all categories are empty
  const maxItems = Math.max(1, 
    Math.min(strengths.length, 4), 
    Math.min(weaknesses.length, 4), 
    Math.min(opportunities.length, 4), 
    Math.min(threats.length, 4)
  );

  return (
    <div className="rounded-lg overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-center font-semibold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 w-1/4">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Strengths
              </div>
            </TableHead>
            <TableHead className="text-center font-semibold bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 w-1/4">
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Weaknesses
              </div>
            </TableHead>
            <TableHead className="text-center font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 w-1/4">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" />
                Opportunities
              </div>
            </TableHead>
            <TableHead className="text-center font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 w-1/4">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Threats
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(maxItems)].map((_, i) => (
            <TableRow key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              <TableCell className="align-top p-3 border-r">
                {strengths[i] ? (
                  <div className="flex gap-2">
                    <span className="text-green-500 font-medium">•</span>
                    <span style={{ whiteSpace: 'normal' }}>{strengths[i]}</span>
                  </div>
                ) : (i === 0 && strengths.length === 0) ? (
                  <div className="flex gap-2">
                    <span className="text-green-500 font-medium">•</span>
                    <span className="italic text-muted-foreground" style={{ whiteSpace: 'normal' }}>{getEmptyMessage('strengths')}</span>
                  </div>
                ) : null}
              </TableCell>
              <TableCell className="align-top p-3 border-r">
                {weaknesses[i] ? (
                  <div className="flex gap-2">
                    <span className="text-red-500 font-medium">•</span>
                    <span style={{ whiteSpace: 'normal' }}>{weaknesses[i]}</span>
                  </div>
                ) : (i === 0 && weaknesses.length === 0) ? (
                  <div className="flex gap-2">
                    <span className="text-red-500 font-medium">•</span>
                    <span className="italic text-muted-foreground" style={{ whiteSpace: 'normal' }}>{getEmptyMessage('weaknesses')}</span>
                  </div>
                ) : null}
              </TableCell>
              <TableCell className="align-top p-3 border-r">
                {opportunities[i] ? (
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-medium">•</span>
                    <span style={{ whiteSpace: 'normal' }}>{opportunities[i]}</span>
                  </div>
                ) : (i === 0 && opportunities.length === 0) ? (
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-medium">•</span>
                    <span className="italic text-muted-foreground" style={{ whiteSpace: 'normal' }}>{getEmptyMessage('opportunities')}</span>
                  </div>
                ) : null}
              </TableCell>
              <TableCell className="align-top p-3">
                {threats[i] ? (
                  <div className="flex gap-2">
                    <span className="text-amber-500 font-medium">•</span>
                    <span style={{ whiteSpace: 'normal' }}>{threats[i]}</span>
                  </div>
                ) : (i === 0 && threats.length === 0) ? (
                  <div className="flex gap-2">
                    <span className="text-amber-500 font-medium">•</span>
                    <span className="italic text-muted-foreground" style={{ whiteSpace: 'normal' }}>{getEmptyMessage('threats')}</span>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SwotTable;
