
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpertTask {
  id: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const ExpertTaskList = () => {
  // Sample expert tasks - in a real app, these would come from a database
  const [tasks, setTasks] = React.useState<ExpertTask[]>([
    {
      id: '1',
      description: 'Approve logo draft',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      description: 'Review Q2 ad budget',
      completed: false,
      priority: 'high'
    },
    {
      id: '3',
      description: 'Schedule customer feedback session',
      completed: true,
      priority: 'medium'
    },
    {
      id: '4',
      description: 'Update competitor analysis',
      completed: false,
      priority: 'medium'
    }
  ]);
  
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Expert Task List
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "p-3 rounded-md border flex items-start gap-3 transition-colors",
                task.completed 
                  ? "bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700" 
                  : "bg-white dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
              )}
            >
              <button 
                onClick={() => toggleTaskStatus(task.id)}
                className="flex-shrink-0 mt-0.5"
              >
                {task.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                )}
              </button>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
                )}>
                  {task.description}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs capitalize ${getPriorityColor(task.priority)}`}>
                    {task.priority} priority
                  </span>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tasks from your consultant yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertTaskList;
