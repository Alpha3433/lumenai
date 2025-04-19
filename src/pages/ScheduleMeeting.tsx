import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const timeSlots = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];

export default function ScheduleMeeting() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [businessPlanFile, setBusinessPlanFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const handleFileSelected = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast.error("File is too large. Maximum size is 10MB.");
      return;
    }
    setBusinessPlanFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  };
  
  const handleScheduleMeeting = async () => {
    if (!selectedDate || !selectedTime || !topic) {
      toast.error("Please complete all required fields");
      return;
    }
    
    setSubmitting(true);
    
    try {
      let fileUrl = '';
      
      if (businessPlanFile) {
        const fileExt = businessPlanFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('business-plans')
          .upload(filePath, businessPlanFile);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('business-plans')
          .getPublicUrl(filePath);
          
        fileUrl = publicUrl;
      }
      
      const meetingDetails = {
        selected_date: format(selectedDate, "yyyy-MM-dd"),
        selected_time: selectedTime,
        topic,
        notes,
        business_plan_url: fileUrl || null,
        user_id: user?.id
      };
      
      const { error } = await supabase
        .from('meeting_requests')
        .insert(meetingDetails);
        
      if (error) throw error;
      
      toast.success("Meeting scheduled successfully!", {
        description: `Your meeting has been scheduled for ${format(selectedDate, "MMMM do")} at ${selectedTime}`
      });

      // Reset form
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setTopic("");
      setNotes("");
      setBusinessPlanFile(null);

      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
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
                      disabled={date => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        // Only disable past dates, allow weekends
                        return date < today;
                      }} 
                      className="p-3 pointer-events-auto" 
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={value => setSelectedTime(value)}>
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
                    {timeSlots.map(time => (
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
                  onChange={e => setTopic(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific points you'd like to discuss..." 
                  rows={3} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Business Plan Document</Label>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                    isDragging 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Input 
                    type="file" 
                    className="hidden" 
                    id="file-upload" 
                    onChange={handleFileInputChange}
                    accept=".pdf,.doc,.docx" 
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    {businessPlanFile ? (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Selected: {businessPlanFile.name}
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Drag and drop your business plan here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, DOCX (max 10MB)
                        </p>
                      </>
                    )}
                  </Label>
                </div>
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

              {businessPlanFile && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Plan</p>
                  <p className="font-medium text-blue-600 break-all">
                    {businessPlanFile.name}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleScheduleMeeting} 
              disabled={!selectedDate || !selectedTime || !topic || submitting}
            >
              {submitting ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
