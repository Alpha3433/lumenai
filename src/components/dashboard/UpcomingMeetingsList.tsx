
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const UpcomingMeetingsList = () => {
  const navigate = useNavigate();
  
  const { data: meetings, isLoading } = useQuery({
    queryKey: ['upcoming-meetings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meeting_requests')
        .select('*')
        .gte('selected_date', new Date().toISOString().split('T')[0])
        .order('selected_date', { ascending: true })
        .order('selected_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

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

      <CardContent className="p-4 flex-grow overflow-auto">
        {isLoading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading meetings...
          </div>
        ) : meetings && meetings.length > 0 ? (
          <div className="space-y-3">
            {meetings.map((meeting) => (
              <div 
                key={meeting.id}
                className="p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{meeting.topic}</h4>
                  <span className="text-sm text-gray-500">
                    {format(new Date(meeting.selected_date), 'MMM d')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {meeting.selected_time}
                </div>
                {meeting.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {meeting.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No meetings scheduled. Click "Schedule" to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsList;
