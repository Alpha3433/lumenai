
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertCircle, MinusCircle, Triangle } from 'lucide-react';
import { SwotComponents } from '@/utils/swotUtils';
import { extractProblemsFromSwot, ProblemCategory } from '@/utils/problemMatrixUtils';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemPriorityMatrixProps {
  swotData: SwotComponents;
}

const ProblemPriorityMatrix: React.FC<ProblemPriorityMatrixProps> = ({ swotData }) => {
  const problemCategories = extractProblemsFromSwot(swotData);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-700 dark:text-red-300',
          bulletColor: 'text-red-500',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          icon: CheckCircle,
        };
      case 'Medium':
        return {
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          textColor: 'text-amber-700 dark:text-amber-300',
          bulletColor: 'text-amber-500',
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          icon: AlertCircle,
        };
      case 'Low':
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          textColor: 'text-gray-700 dark:text-gray-300',
          bulletColor: 'text-gray-500',
          iconBg: 'bg-gray-100 dark:bg-gray-900/30',
          icon: MinusCircle,
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          textColor: 'text-gray-700 dark:text-gray-300',
          bulletColor: 'text-gray-500',
          iconBg: 'bg-gray-100 dark:bg-gray-900/30',
          icon: MinusCircle,
        };
    }
  };

  return (
    <Card className="mt-6 border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Triangle className="h-5 w-5 text-amber-500" />
            </div>
            Problem Priority Matrix
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
            Strategic issue management
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[15%] font-semibold">PRIORITY</TableHead>
                <TableHead className="w-[45%] font-semibold">PROBLEMS</TableHead>
                <TableHead className="w-[40%] font-semibold">RECOMMENDED ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problemCategories.map((category, index) => {
                const { bgColor, textColor, bulletColor, iconBg, icon: Icon } = getPriorityStyles(category.priority);
                
                return (
                  <TableRow key={index} className={`${bgColor} hover:${bgColor}`}>
                    <TableCell className="align-top py-4">
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center justify-center rounded-full p-1 ${iconBg}`}>
                          <Icon className={`h-4 w-4 ${textColor}`} />
                        </span>
                        <span className={`font-medium ${textColor}`}>{category.priority}</span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top py-4">
                      <ul className="space-y-2">
                        {category.problems.map((problem, problemIndex) => (
                          <li key={problemIndex} className="flex gap-2">
                            <span className={`font-medium ${bulletColor} mt-1`}>•</span>
                            <span>{problem}</span>
                          </li>
                        ))}
                        {category.problems.length === 0 && (
                          <li className="text-gray-500 italic">None identified</li>
                        )}
                      </ul>
                    </TableCell>
                    <TableCell className="align-top py-4">
                      <p className={`font-medium ${textColor} mb-1`}>{category.action}</p>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemPriorityMatrix;
