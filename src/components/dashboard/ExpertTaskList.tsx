
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, Plus, ArrowUpDown } from 'lucide-react';
import NewTaskDialog from './NewTaskDialog';

interface Task {
  id: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueIn?: string;
}

const ExpertTaskList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const handleTaskCreate = (newTask: { description: string; priority: 'high' | 'medium' | 'low' }) => {
    setTasks([...tasks, {
      id: Date.now().toString(),
      description: newTask.description,
      completed: false,
      priority: newTask.priority
    }]);
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleSort = () => {
    setSortByPriority(!sortByPriority);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortByPriority) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Workflow & Tasks
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSort}
            className={sortByPriority ? "bg-blue-50 dark:bg-blue-900/20" : ""}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Task
          </Button>
        </div>
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
          {sortedTasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-start gap-3 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleTaskToggle(task.id)}
              />
              <div className="flex-1">
                <p className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.description}
                </p>
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
      <NewTaskDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onTaskCreate={handleTaskCreate}
      />
    </Card>
  );
};

export default ExpertTaskList;
