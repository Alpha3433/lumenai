
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MeetingsCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="border border-blue-100 dark:border-blue-800/30 shadow-lg overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/80">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-b border-blue-100 dark:border-blue-800/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Calendar
            </span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/schedule-meeting')} 
            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-1 text-xs font-medium"
          >
            Schedule <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
            classNames={{
              day_today: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium"
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingsCalendar;
