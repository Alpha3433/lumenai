
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';

const UpcomingMeetingsList = () => {
  const navigate = useNavigate();
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const queryClient = useQueryClient();
  
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

  const handleDelete = async () => {
    if (selectedMeetings.length === 0) return;

    try {
      // Execute the delete operation and wait for it to complete
      const { error } = await supabase
        .from('meeting_requests')
        .delete()
        .in('id', selectedMeetings);

      if (error) {
        console.error('Error deleting meetings:', error);
        toast.error('Failed to delete meetings');
        return;
      }

      // Only show success message and reset if the delete was successful
      toast.success(`${selectedMeetings.length} meeting${selectedMeetings.length > 1 ? 's' : ''} deleted`);
      
      // Clear selection after successful deletion
      setSelectedMeetings([]);
      
      // Invalidate and refetch both queries to refresh the data
      await queryClient.invalidateQueries({ queryKey: ['upcoming-meetings'] });
      await queryClient.invalidateQueries({ queryKey: ['upcoming-meetings-count'] });
    } catch (error) {
      toast.error('Failed to delete meetings');
      console.error('Error deleting meetings:', error);
    }
  };

  const toggleMeetingSelection = (meetingId: string) => {
    setSelectedMeetings(prev => 
      prev.includes(meetingId) 
        ? prev.filter(id => id !== meetingId)
        : [...prev, meetingId]
    );
  };

  return (
    <Card className="border border-green-100 dark:border-green-800/30 shadow-md h-full w-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 p-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded-full">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
        </div>
        <div className="flex gap-2">
          {selectedMeetings.length > 0 && (
            <Button 
              onClick={handleDelete}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete ({selectedMeetings.length})
            </Button>
          )}
          <Button 
            onClick={() => navigate('/schedule-meeting')}
            className="bg-green-500 hover:bg-green-600"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Schedule
          </Button>
        </div>
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
                className="p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800 flex items-start gap-3"
              >
                <Checkbox
                  checked={selectedMeetings.includes(meeting.id)}
                  onCheckedChange={() => toggleMeetingSelection(meeting.id)}
                  id={`meeting-${meeting.id}`}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No meetings scheduled. Click "Schedule" to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsList;
