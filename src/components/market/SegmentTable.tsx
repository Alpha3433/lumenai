
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart } from 'lucide-react';
import { MarketSegment } from '@/utils/marketDataUtils';

interface SegmentTableProps {
  segments: MarketSegment[];
}

const SegmentTable: React.FC<SegmentTableProps> = ({ segments }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <LineChart className="h-4 w-4 text-purple-500" />
          Market Segments Breakdown
        </h3>
        <div className="overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead>Market Share</TableHead>
                <TableHead>Est. Revenue</TableHead>
                <TableHead>Potential</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segments.map((segment) => (
                <TableRow key={segment.name} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{segment.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${segment.percent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{segment.percent}%</span>
                    </div>
                  </TableCell>
                  <TableCell>${segment.revenue}B</TableCell>
                  <TableCell>
                    <Badge variant={segment.percent > 30 ? "default" : segment.percent > 15 ? "secondary" : "outline"}>
                      {segment.percent > 30 ? "High" : segment.percent > 15 ? "Medium" : "Low"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentTable;
