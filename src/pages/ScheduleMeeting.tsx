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
          
          {/* Date & Time - Redesigned */}
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
            <Card className="overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                    <CalendarIconFull className="w-5 h-5 text-white" />
                  </div>
                  Select Date & Time
                </CardTitle>
                <CardDescription className="text-base">Choose when you'd like to meet with our team</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 pb-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-lg font-medium text-gray-700 dark:text-gray-200">Select a Date</Label>
                      <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-medium">
                        {selectedDate ? format(selectedDate, "MMMM yyyy") : "No date selected"}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl transform rotate-1"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-xl transform -rotate-1"></div>
                      <div className="relative border-2 border-blue-200/50 dark:border-blue-700/30 rounded-xl bg-white dark:bg-gray-800/70 overflow-hidden shadow-lg p-1">
                        <Calendar 
                          mode="single" 
                          selected={selectedDate} 
                          onSelect={setSelectedDate} 
                          disabled={date => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          className="mx-auto rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <Label className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" /> 
                      Available Time Slots
                    </Label>
                    <div className="relative p-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl transform rotate-1"></div>
                      <div className="relative max-h-[320px] overflow-y-auto rounded-xl scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-700 p-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              disabled={!selectedDate}
                              className={cn(
                                "relative h-14 rounded-lg font-medium transition-all overflow-hidden",
                                !selectedDate && "opacity-50 cursor-not-allowed",
                                selectedTime === time
                                  ? "shadow-md shadow-blue-600/10 border-0 text-white"
                                  : "border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white/80 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200"
                              )}
                            >
                              {selectedTime === time && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient"></div>
                              )}
                              <span className="relative flex items-center justify-center gap-2 h-full">
                                <Clock className="h-3.5 w-3.5" />
                                {time}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Meeting Details - Redesigned */}
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
            <Card className="overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-6 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                    <ClipboardList className="w-5 h-5 text-white" />
                  </div>
                  Meeting Details
                </CardTitle>
                <CardDescription className="text-base">Tell us what you'd like to discuss</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                    <div className="relative bg-white dark:bg-gray-800/80 rounded-lg border border-purple-200 dark:border-purple-700/30 p-6 space-y-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                          <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <Label htmlFor="topic" className="text-lg font-medium">Topic <span className="text-red-500">*</span></Label>
                      </div>
                      <Input 
                        id="topic" 
                        placeholder="e.g., Business Strategy Discussion" 
                        value={topic} 
                        onChange={e => setTopic(e.target.value)} 
                        className="h-12 border-purple-200 dark:border-purple-700/50 bg-white/80 dark:bg-gray-800/30 focus:border-purple-400 focus:ring-purple-400/20 shadow-sm" 
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-xl blur-sm"></div>
                    <div className="relative bg-white dark:bg-gray-800/80 rounded-lg border border-pink-200 dark:border-pink-700/30 p-6 space-y-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                          <FileText className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                        </div>
                        <Label htmlFor="notes" className="text-lg font-medium">Additional Notes</Label>
                      </div>
                      <Textarea 
                        id="notes" 
                        placeholder="Any specific points you'd like to discuss..." 
                        rows={4} 
                        value={notes} 
                        onChange={e => setNotes(e.target.value)} 
                        className="resize-none border-pink-200 dark:border-pink-700/50 bg-white/80 dark:bg-gray-800/30 focus:border-pink-400 focus:ring-pink-400/20 shadow-sm" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                      <Upload className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <Label className="text-lg font-medium">Upload Business Plan Document</Label>
                  </div>
                  <div 
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors overflow-hidden",
                      isDragging 
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    )} 
                    onDragOver={handleDragOver} 
                    onDragLeave={handleDragLeave} 
                    onDrop={handleDrop}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 opacity-70"></div>
                    
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      onChange={handleFileInputChange} 
                      accept=".pdf,.doc,.docx" 
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-6 relative z-10">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center shadow-inner">
                        <Upload className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                      </div>
                      {businessPlanFile ? (
                        <div className="space-y-2">
                          <p className="text-base font-medium text-blue-600 dark:text-blue-400">
                            Selected: {businessPlanFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Click or drag and drop to replace
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                            Drag and drop your business plan here
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports PDF, DOC, DOCX (max 10MB)
                          </p>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Summary & Confirmation - Keep unchanged */}
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

                  {businessPlanFile && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Plan</p>
                        <p className="text-base font-medium flex gap-2 items-center text-blue-600 break-all">
                          <FileText className="h-4 w-4" />
                          {businessPlanFile.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-0">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleScheduleMeeting} 
                  disabled={!selectedDate || !selectedTime || !topic || submitting} 
                  className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {submitting ? "Scheduling..." : "Schedule Meeting"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>;
}
