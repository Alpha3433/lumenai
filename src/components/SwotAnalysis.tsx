
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwotAnalysisProps {
  swotText: string;
}

const SwotAnalysis = ({ swotText }: SwotAnalysisProps) => {
  // Extract SWOT components from the text
  const extractSwotComponents = (text: string) => {
    const components = {
      strengths: [] as string[],
      weaknesses: [] as string[],
      opportunities: [] as string[],
      threats: [] as string[]
    };

    // Simple regex-based parsing to extract each section and its bullet points
    const strengthsMatch = text.match(/\*\*Strengths\*\*([\s\S]*?)(?=\*\*Weaknesses|\*\*Opportunities|\*\*Threats|$)/i);
    const weaknessesMatch = text.match(/\*\*Weaknesses\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Opportunities|\*\*Threats|$)/i);
    const opportunitiesMatch = text.match(/\*\*Opportunities\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Weaknesses|\*\*Threats|$)/i);
    const threatsMatch = text.match(/\*\*Threats\*\*([\s\S]*?)(?=\*\*Strengths|\*\*Weaknesses|\*\*Opportunities|$)/i);
    
    if (strengthsMatch && strengthsMatch[1]) components.strengths = extractBulletPoints(strengthsMatch[1]);
    if (weaknessesMatch && weaknessesMatch[1]) components.weaknesses = extractBulletPoints(weaknessesMatch[1]);
    if (opportunitiesMatch && opportunitiesMatch[1]) components.opportunities = extractBulletPoints(opportunitiesMatch[1]);
    if (threatsMatch && threatsMatch[1]) components.threats = extractBulletPoints(threatsMatch[1]);
    
    // Ensure we have exactly 4 items per category (or fewer if not enough were found)
    Object.keys(components).forEach(key => {
      const typedKey = key as keyof typeof components;
      components[typedKey] = components[typedKey].slice(0, 4);
    });
    
    return components;
  };

  const extractBulletPoints = (text: string) => {
    // Extract bullet points, removing any empty items
    const points = text.split(/•|-|\d+\./)
      .map(point => point.trim())
      .filter(point => point.length > 0);
    return points;
  };

  const { strengths, weaknesses, opportunities, threats } = extractSwotComponents(swotText);

  // Function to calculate whether we have enough data for the table view
  const hasEnoughDataForTable = () => {
    return strengths.length > 0 && weaknesses.length > 0 && 
           opportunities.length > 0 && threats.length > 0;
  };

  // Table view for larger screens with more structured data
  const TableView = () => (
    <div className="hidden md:block rounded-lg overflow-hidden border">
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
          {[...Array(Math.max(
            Math.min(strengths.length, 4), 
            Math.min(weaknesses.length, 4), 
            Math.min(opportunities.length, 4), 
            Math.min(threats.length, 4)
          ))].map((_, i) => (
            <TableRow key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              <TableCell className="align-top p-3 border-r">
                {strengths[i] && (
                  <div className="flex gap-2">
                    <span className="text-green-500 font-medium">•</span>
                    <span>{strengths[i]}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="align-top p-3 border-r">
                {weaknesses[i] && (
                  <div className="flex gap-2">
                    <span className="text-red-500 font-medium">•</span>
                    <span>{weaknesses[i]}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="align-top p-3 border-r">
                {opportunities[i] && (
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-medium">•</span>
                    <span>{opportunities[i]}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="align-top p-3">
                {threats[i] && (
                  <div className="flex gap-2">
                    <span className="text-amber-500 font-medium">•</span>
                    <span>{threats[i]}</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // Card grid view (mobile-friendly)
  const CardGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Strengths
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {strengths.length ? strengths.slice(0, 4).map((strength, i) => (
              <li key={i} className="text-sm">{strength}</li>
            )) : <li className="text-sm italic text-muted-foreground">No strengths identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Weaknesses
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {weaknesses.length ? weaknesses.slice(0, 4).map((weakness, i) => (
              <li key={i} className="text-sm">{weakness}</li>
            )) : <li className="text-sm italic text-muted-foreground">No weaknesses identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Opportunities
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {opportunities.length ? opportunities.slice(0, 4).map((opportunity, i) => (
              <li key={i} className="text-sm">{opportunity}</li>
            )) : <li className="text-sm italic text-muted-foreground">No opportunities identified.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Threats
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {threats.length ? threats.slice(0, 4).map((threat, i) => (
              <li key={i} className="text-sm">{threat}</li>
            )) : <li className="text-sm italic text-muted-foreground">No threats identified.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  // If the data doesn't look structured, show a fallback
  const FallbackView = () => (
    <Card className="mt-4 p-4">
      <CardContent>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          SWOT Analysis
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-line">{swotText}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Check if swotText is actually parsed properly
  const hasStructuredData = strengths.length > 0 || weaknesses.length > 0 || 
                            opportunities.length > 0 || threats.length > 0;

  return (
    <div className="space-y-4 animate-fade-in">
      {hasEnoughDataForTable() && <TableView />}
      <div className={cn(hasEnoughDataForTable() ? "md:hidden" : "")}>
        {hasStructuredData ? <CardGridView /> : <FallbackView />}
      </div>
    </div>
  );
};

export default SwotAnalysis;
