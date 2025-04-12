
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  milestone: string;
  status: 'pending' | 'completed' | 'overdue';
}

const TaskScheduler = () => {
  // Sample tasks - in a real app, these would come from a database
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete market research',
      dueDate: '2025-05-15',
      milestone: 'Research Phase',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Launch MVP',
      dueDate: '2025-06-30',
      milestone: 'Product Development',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Secure initial funding',
      dueDate: '2025-07-15',
      milestone: 'Financial Planning',
      status: 'pending'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // In a real app, this would update the task's due date based on where it's dropped
    console.log('Task dropped, would update due date');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Task Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="space-y-2 min-h-[150px]"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">{task.milestone}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(task.status)}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </Badge>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tasks scheduled. Drag and drop milestones here.
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic text-center">
          Drag and drop tasks to reschedule
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskScheduler;
