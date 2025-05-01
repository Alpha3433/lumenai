import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Upload, Calendar as CalendarIconFull, ClipboardList, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { motion } from "framer-motion";
const timeSlots = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];
export default function ScheduleMeeting() {
  const {
    user,
    loading
  } = useAuth();
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
        const {
          error: uploadError
        } = await supabase.storage.from('business-plans').upload(filePath, businessPlanFile);
        if (uploadError) throw uploadError;
        const {
          data: {
            publicUrl
          }
        } = supabase.storage.from('business-plans').getPublicUrl(filePath);
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
      const {
        error
      } = await supabase.from('meeting_requests').insert(meetingDetails);
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
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <Navbar />
        <div className="container max-w-6xl mx-auto px-4 py-8 pt-24">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-blue-600 dark:text-blue-400">Loading...</div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      
      <div className="container max-w-5xl mx-auto px-4 py-12 pt-24">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Schedule a Meeting</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Book a session with our team of experts to discuss your business plans and strategies.</p>
        </motion.div>
        
        <div className="grid gap-8">
          {/* Steps indicator */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                <CalendarIconFull className="w-5 h-5" />
              </div>
              <div className="h-1 w-12 bg-blue-600"></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${selectedDate && selectedTime ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className={`h-1 w-12 ${topic ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${topic ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
          
          {/* Date & Time */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CalendarIconFull className="w-5 h-5 text-blue-500" />
                  Select Date & Time
                </CardTitle>
                <CardDescription>Choose when you'd like to meet with our team</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-medium">Available Interview Slots</Label>
                      <div className="text-sm text-blue-600 font-medium">
                        {selectedDate ? format(selectedDate, "MMMM yyyy") : "Select a date"}
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={date => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }} className="mx-auto rounded-xl px-[83px]" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Time</Label>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {timeSlots.map(time => <Button key={time} type="button" variant={selectedTime === time ? "default" : "outline"} onClick={() => setSelectedTime(time)} disabled={!selectedDate} className={cn("h-12 justify-start gap-2", selectedTime === time ? "bg-green-600 hover:bg-green-700 text-white border-0" : "hover:bg-gray-100 dark:hover:bg-gray-700")}>
                          <Clock className="h-4 w-4" />
                          {time}
                        </Button>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Meeting Details */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-500" />
                  Meeting Details
                </CardTitle>
                <CardDescription>Tell us what you'd like to discuss</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="topic" className="text-base">Topic <span className="text-red-500">*</span></Label>
                    <Input id="topic" placeholder="e.g., Business Strategy Discussion" value={topic} onChange={e => setTopic(e.target.value)} className="h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="notes" className="text-base">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any specific points you'd like to discuss..." rows={4} value={notes} onChange={e => setNotes(e.target.value)} className="resize-none border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Upload Business Plan Document</Label>
                  <div className={cn("border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors", isDragging ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600")} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <Input type="file" className="hidden" id="file-upload" onChange={handleFileInputChange} accept=".pdf,.doc,.docx" />
                    <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      {businessPlanFile ? <div className="space-y-1">
                          <p className="text-base font-medium text-blue-600 dark:text-blue-400">
                            Selected: {businessPlanFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Click or drag and drop to replace
                          </p>
                        </div> : <div className="space-y-1">
                          <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                            Drag and drop your business plan here
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports PDF, DOC, DOCX (max 10MB)
                          </p>
                        </div>}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Summary & Confirmation */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-800/20 dark:to-purple-800/20 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Confirm Your Meeting
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white/60 dark:bg-gray-800/40 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                      <p className="text-lg font-medium">{selectedDate ? format(selectedDate, "MMMM do, yyyy") : "Not selected"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p className="text-lg font-medium">{selectedTime || "Not selected"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Topic</p>
                      <p className="text-lg font-medium">{topic || "Not specified"}</p>
                    </div>
                  </div>

                  {businessPlanFile && <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Plan</p>
                        <p className="text-base font-medium flex gap-2 items-center text-blue-600 break-all">
                          <FileText className="h-4 w-4" />
                          {businessPlanFile.name}
                        </p>
                      </div>
                    </div>}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-0">
                <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full sm:w-auto order-2 sm:order-1">
                  Cancel
                </Button>
                <Button onClick={handleScheduleMeeting} disabled={!selectedDate || !selectedTime || !topic || submitting} className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  {submitting ? "Scheduling..." : "Schedule Meeting"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>;
}