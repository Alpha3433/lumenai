
import React, { useState, useEffect } from 'react';
import { format, isToday, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Meeting {
  id: string;
  selected_date: string;
  selected_time: string;
  topic: string;
  notes?: string;
  status: string;
  created_at: string;
}

const MeetingsCalendar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (user) {
      fetchMeetings();
    }
  }, [user]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meeting_requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('selected_date', { ascending: true });

      if (error) throw error;
      setMeetings(data || []);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to load your meetings');
    } finally {
      setLoading(false);
    }
  };

  const getMeetingsForSelectedDate = () => {
    if (!selectedDate) return [];
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.selected_date);
      return isSameDay(meetingDate, selectedDate);
    });
  };

  const getDatesWithMeetings = () => {
    return meetings.map(meeting => new Date(meeting.selected_date));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };

  return (
    <Card className="border border-blue-100 dark:border-blue-800/30 shadow-md">
      <CardHeader className="pb-2 space-y-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Calendar
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/schedule-meeting')}
            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            Schedule <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
        <CardDescription>View and manage your upcoming meetings</CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mx-auto"
              modifiers={{
                booked: getDatesWithMeetings(),
              }}
              modifiersStyles={{
                booked: { 
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                  color: 'white',
                  borderRadius: '50%' 
                }
              }}
              classNames={{
                day_today: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium"
              }}
            />
          </div>

          {!loading && getMeetingsForSelectedDate().length > 0 && (
            <div className="space-y-2">
              {getMeetingsForSelectedDate().map((meeting) => (
                <div 
                  key={meeting.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-sm">{meeting.topic}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{meeting.selected_time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {loading ? (
        <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/30">
          <div className="animate-pulse w-full">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardFooter>
      ) : meetings.length === 0 ? (
        <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/30">
          <div className="text-center w-full text-sm text-gray-500 dark:text-gray-400">
            No meetings scheduled.{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-600 dark:text-blue-400"
              onClick={() => navigate('/schedule-meeting')}
            >
              Schedule one?
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default MeetingsCalendar;
