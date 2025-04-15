import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Plus } from 'lucide-react';

const ExpertTaskList = () => {
  const tasks = [
    {
      id: '1',
      description: 'Approve logo draft',
      completed: false,
      priority: 'high',
      dueIn: '2 days'
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
  ];
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Workflow & Tasks
        </CardTitle>
        <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Task Completion</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-start gap-3 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <input
                type="checkbox"
                checked={task.completed}
                className="mt-1"
                onChange={() => {}}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{task.description}</p>
                {task.priority === 'high' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 mt-1 inline-block">
                    High Priority
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertTaskList;
