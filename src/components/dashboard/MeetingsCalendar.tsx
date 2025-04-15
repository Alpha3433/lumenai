import React, { useState, useEffect } from 'react';
import { format, isToday, isSameDay, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, CalendarIcon, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

      if (error) {
        throw error;
      }

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
  
  const getUpcomingMeetings = () => {
    const today = new Date();
    return meetings
      .filter(meeting => {
        const meetingDate = new Date(meeting.selected_date);
        return meetingDate >= today;
      })
      .slice(0, 3); // Get only next 3 upcoming meetings
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <Card className="border border-blue-100 dark:border-blue-800/30 shadow-lg overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/80">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-b border-blue-100 dark:border-blue-800/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Upcoming Meetings
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
        <CardDescription>Track your scheduled consultations</CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid grid-cols-1 gap-5">
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
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
          
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {selectedDate ? (
                  <span className="font-semibold">
                    {isToday(selectedDate) ? (
                      <span className="flex items-center gap-1">
                        Today <Sparkles className="h-3 w-3 text-amber-500" />
                      </span>
                    ) : format(selectedDate, "MMMM d, yyyy")}
                  </span>
                ) : (
                  <span>Select a date</span>
                )}
              </h3>
              {selectedDate && getMeetingsForSelectedDate().length > 0 && (
                <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 px-2.5 py-0.5">
                  {getMeetingsForSelectedDate().length} {getMeetingsForSelectedDate().length === 1 ? "meeting" : "meetings"}
                </Badge>
              )}
            </div>

            {loading ? (
              <div className="text-center py-4 text-sm text-gray-500">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                {getMeetingsForSelectedDate().length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table className="w-full border-collapse">
                      <TableHeader>
                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                          <TableHead className="w-24 text-xs text-gray-600 dark:text-gray-400">Time</TableHead>
                          <TableHead className="text-xs text-gray-600 dark:text-gray-400">Topic</TableHead>
                          <TableHead className="w-28 text-xs text-gray-600 dark:text-gray-400">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getMeetingsForSelectedDate().map((meeting) => (
                          <TableRow 
                            key={meeting.id} 
                            className="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <TableCell className="font-medium text-sm">{meeting.selected_time}</TableCell>
                            <TableCell className="text-sm">{meeting.topic}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(meeting.status)} text-xs`}>
                                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex flex-col items-center space-y-2">
                    <CalendarIcon className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                    {selectedDate ? "No meetings scheduled for this date." : "Please select a date to view meetings."}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/schedule-meeting')}
                      className="mt-2 text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 dark:border-gray-800 pt-4 bg-gray-50 dark:bg-gray-800/30 flex flex-col">
        <div className="w-full">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> 
            Next Upcoming
          </h4>
          {getUpcomingMeetings().length > 0 ? (
            <div className="space-y-2">
              {getUpcomingMeetings().map((meeting) => (
                <div 
                  key={meeting.id} 
                  className="flex items-center justify-between py-2.5 px-3.5 text-sm rounded-md bg-white dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="font-medium">{format(new Date(meeting.selected_date), "MMM dd")} · {meeting.selected_time}</span>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.topic}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-3 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800/50 rounded-md">
              No upcoming meetings. <Button onClick={() => navigate('/schedule-meeting')} variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 font-medium">Schedule one?</Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MeetingsCalendar;
