
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

export default function ScheduleMeeting() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleScheduleMeeting = () => {
    if (!selectedDate || !selectedTime || !topic) {
      toast.error("Please complete all required fields");
      return;
    }

    // In a real app, you would send this data to your backend
    const meetingDetails = {
      date: format(selectedDate, "MMMM do, yyyy"),
      time: selectedTime,
      topic,
      notes,
      user: user?.email
    };
    
    console.log("Meeting scheduled:", meetingDetails);
    
    toast.success("Meeting scheduled successfully!", {
      description: `Your meeting has been scheduled for ${format(selectedDate, "MMMM do")} at ${selectedTime}`
    });
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setTopic("");
    setNotes("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <Navbar />
        <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Schedule a Meeting</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose when you'd like to meet with our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        // Disable past dates and weekends
                        const day = date.getDay();
                        return date < today || day === 0 || day === 6;
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={(value) => setSelectedTime(value)}>
                  <SelectTrigger className="w-full" disabled={!selectedDate}>
                    <SelectValue placeholder="Select time">
                      {selectedTime ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {selectedTime}
                        </div>
                      ) : (
                        <span>Select time</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>Provide information about your meeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic <span className="text-red-500">*</span></Label>
                <Input 
                  id="topic" 
                  placeholder="e.g., Business Strategy Discussion" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific points you'd like to discuss..." 
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6 bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle>Confirm Your Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Date</p>
                  <p className="font-medium">{selectedDate ? format(selectedDate, "MMMM do, yyyy") : "Not selected"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Time</p>
                  <p className="font-medium">{selectedTime || "Not selected"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Topic</p>
                <p className="font-medium">{topic || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {
              setSelectedDate(undefined);
              setSelectedTime(undefined);
              setTopic("");
              setNotes("");
            }}>
              Reset
            </Button>
            <Button 
              onClick={handleScheduleMeeting}
              disabled={!selectedDate || !selectedTime || !topic}
            >
              Schedule Meeting
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
