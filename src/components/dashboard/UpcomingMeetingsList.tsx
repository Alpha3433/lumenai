
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingMeetingsList = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="border border-green-100 dark:border-green-800/30 shadow-md h-full w-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 p-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded-full">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
        </div>
        <Button 
          onClick={() => navigate('/schedule-meeting')}
          className="bg-green-500 hover:bg-green-600"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Schedule
        </Button>
      </CardHeader>

      <CardContent className="p-4 flex-grow flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No meetings scheduled. Click "Schedule" to add one.
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsList;
