
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

    // Simple parsing logic - extract points after each heading
    const sections = text.split(/strengths|weaknesses|opportunities|threats/i);
    
    if (sections.length > 1) components.strengths = extractPoints(sections[1]);
    if (sections.length > 2) components.weaknesses = extractPoints(sections[2]);
    if (sections.length > 3) components.opportunities = extractPoints(sections[3]);
    if (sections.length > 4) components.threats = extractPoints(sections[4]);
    
    return components;
  };

  const extractPoints = (text: string) => {
    // Extract bullet points or numbered lists
    const points = text.split(/•|-|\d+\./).filter(point => 
      point.trim().length > 5 && !point.toLowerCase().includes("weaknesses") && 
      !point.toLowerCase().includes("opportunities") && !point.toLowerCase().includes("threats")
    );
    return points.map(point => point.trim()).filter(Boolean);
  };

  const { strengths, weaknesses, opportunities, threats } = extractSwotComponents(swotText);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <h3 className="font-bold text-green-700 mb-2">Strengths</h3>
          <ul className="list-disc pl-5 space-y-1">
            {strengths.length ? strengths.map((strength, i) => (
              <li key={i} className="text-sm">{strength}</li>
            )) : <li className="text-sm">{swotText}</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <h3 className="font-bold text-red-700 mb-2">Weaknesses</h3>
          <ul className="list-disc pl-5 space-y-1">
            {weaknesses.length ? weaknesses.map((weakness, i) => (
              <li key={i} className="text-sm">{weakness}</li>
            )) : <li className="text-sm">Analysis not available in structured format.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <h3 className="font-bold text-blue-700 mb-2">Opportunities</h3>
          <ul className="list-disc pl-5 space-y-1">
            {opportunities.length ? opportunities.map((opportunity, i) => (
              <li key={i} className="text-sm">{opportunity}</li>
            )) : <li className="text-sm">Analysis not available in structured format.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4">
          <h3 className="font-bold text-amber-700 mb-2">Threats</h3>
          <ul className="list-disc pl-5 space-y-1">
            {threats.length ? threats.map((threat, i) => (
              <li key={i} className="text-sm">{threat}</li>
            )) : <li className="text-sm">Analysis not available in structured format.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwotAnalysis;
