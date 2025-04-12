
import React, { useState, useEffect } from 'react';
import { format, isToday, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  
  // Helper to get meetings for the selected date
  const getMeetingsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.selected_date);
      return isSameDay(meetingDate, selectedDate);
    });
  };
  
  // Function to get all dates with meetings for highlighting on calendar
  const getDatesWithMeetings = () => {
    return meetings.map(meeting => new Date(meeting.selected_date));
  };
  
  // Upcoming meetings (regardless of selected date)
  const getUpcomingMeetings = () => {
    const today = new Date();
    return meetings
      .filter(meeting => {
        const meetingDate = new Date(meeting.selected_date);
        return meetingDate >= today;
      })
      .slice(0, 3); // Get only next 3 upcoming meetings
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Upcoming Meetings
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Track your scheduled consultations
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <Card className="border border-gray-200 dark:border-gray-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                booked: getDatesWithMeetings(),
              }}
              modifiersStyles={{
                booked: { 
                  fontWeight: 'bold',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%' 
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Meetings for selected date */}
        <Card className="border border-gray-200 dark:border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {selectedDate ? (
                  <span>
                    Meetings for {isToday(selectedDate) ? "Today" : format(selectedDate, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span>Select a date</span>
                )}
              </div>
              {selectedDate && getMeetingsForSelectedDate().length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {getMeetingsForSelectedDate().length} {getMeetingsForSelectedDate().length === 1 ? "meeting" : "meetings"}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading meetings...</div>
            ) : (
              <>
                {getMeetingsForSelectedDate().length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getMeetingsForSelectedDate().map((meeting) => (
                        <TableRow key={meeting.id}>
                          <TableCell className="font-medium">{meeting.selected_time}</TableCell>
                          <TableCell>{meeting.topic}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                meeting.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                  : meeting.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }
                            >
                              {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    {selectedDate ? "No meetings scheduled for this date." : "Please select a date to view meetings."}
                  </div>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">Upcoming Meetings</h4>
              {getUpcomingMeetings().length > 0 ? (
                <div className="space-y-2">
                  {getUpcomingMeetings().map((meeting) => (
                    <div 
                      key={meeting.id} 
                      className="flex items-center justify-between py-2 px-3 text-sm rounded-md bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{format(new Date(meeting.selected_date), "MMM dd")} · {meeting.selected_time}</span>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {meeting.topic}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-500 dark:text-gray-400 text-sm">
                  No upcoming meetings.
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default MeetingsCalendar;
