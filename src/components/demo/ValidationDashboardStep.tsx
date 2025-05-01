
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarIcon, Clock, FileText, ArrowRight, CheckCircle, MessageSquare, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { DemoStep } from './types';

interface ValidationDashboardStepProps {
  step: DemoStep;
}

const ValidationDashboardStep: React.FC<ValidationDashboardStepProps> = ({
  step
}) => {
  // Meeting scheduler state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [topic, setTopic] = useState("");
  
  // Get current month and year for calendar display
  const today = new Date();
  const currentMonth = format(today, 'MMMM yyyy');
  
  // Generate dates for the demo calendar
  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = startDate.getDay();
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: '', isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(today.getFullYear(), today.getMonth(), i);
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        date: dayDate,
        isPast: dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      });
    }
    
    return days;
  };
  
  // Generate time slots
  const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", 
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM"
  ];
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  // Handle continue to step 2
  const handleContinueToStep2 = () => {
    setStep1Complete(true);
  };
  
  // Handle schedule meeting
  const handleScheduleMeeting = () => {
    setStep2Complete(true);
    setMeetingScheduled(true);
  };
  
  // Handle start over
  const handleStartOver = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep1Complete(false);
    setStep2Complete(false);
    setMeetingScheduled(false);
    setTopic("");
  };
  
  // Calendar days
  const calendarDays = generateCalendarDays();
  
  return (
    <section id={step.id} className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} 
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">Step 8</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Try out our meeting scheduler to connect with our validation experts and get personalized feedback on your business idea.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Expert validation
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                1:1 coaching
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Actionable feedback
              </div>
            </div>
            
            {!meetingScheduled ? (
              <Button 
                className={`${meetingScheduled ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'}`}
                onClick={() => window.location.href = '/schedule-meeting'}
              >
                {meetingScheduled ? 'View Your Meeting' : 'Schedule a Meeting'}
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                >
                  View Your Meeting
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleStartOver}
                >
                  Schedule Another
                </Button>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }} 
            className="lg:w-2/3 space-y-6"
          >
            {/* Meeting Scheduler Demo */}
            <Card className="overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-800/90">
              {/* Progress Indicator */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-full"></div>
              
              {!meetingScheduled ? (
                <div>
                  {!step1Complete ? (
                    <div className="p-6">
                      {/* Step 1: Select Date & Time */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">Select Date & Time</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Choose when you'd like to meet with our team</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Date Selection */}
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium">Select a Date</h4>
                              <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm rounded-full px-3 py-1">
                                {selectedDate ? format(selectedDate, 'MMMM d') : 'No date selected'}
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                              {/* Calendar Header */}
                              <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                                  <X className="h-4 w-4" />
                                </button>
                                <h5 className="font-medium">{currentMonth}</h5>
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              </div>
                              
                              {/* Calendar Days */}
                              <div className="p-4">
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                                    <div key={i} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                                      {day}
                                    </div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                  {calendarDays.map((day, i) => (
                                    <button
                                      key={i}
                                      disabled={!day.isCurrentMonth || (day.isPast ?? false)}
                                      onClick={() => day.date && handleDateSelect(day.date)}
                                      className={cn(
                                        "h-9 w-9 rounded-full flex items-center justify-center text-sm",
                                        !day.isCurrentMonth && "invisible",
                                        day.isPast && "text-gray-300 dark:text-gray-600 cursor-not-allowed",
                                        selectedDate && day.date && format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd')
                                          ? "bg-blue-600 text-white"
                                          : day.isCurrentMonth && !day.isPast
                                          ? "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                          : ""
                                      )}
                                    >
                                      {day.day}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Time Selection */}
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                Available Time Slots
                              </h4>
                              <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm rounded-full px-3 py-1">
                                {selectedTime || 'No time selected'}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 max-h-[240px] overflow-y-auto pr-2 customized-scroll">
                              {timeSlots.map((time, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleTimeSelect(time)}
                                  disabled={!selectedDate}
                                  className={cn(
                                    "flex items-center justify-center gap-2 p-2 rounded-lg border text-sm transition-all",
                                    !selectedDate
                                      ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700"
                                      : selectedTime === time
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 border-gray-200 dark:border-gray-700"
                                  )}
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={!selectedDate || !selectedTime}
                            onClick={handleContinueToStep2}
                          >
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      {/* Step 2: Meeting Details */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">Meeting Details</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tell us what you'd like to discuss</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Meeting Topic */}
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                            <label htmlFor="topic" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Meeting Topic <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="topic"
                              type="text"
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                              placeholder="e.g., Business Strategy Discussion"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              Please provide a brief topic for the meeting
                            </p>
                          </div>
                          
                          {/* Meeting Information */}
                          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h5 className="font-medium mb-4">Meeting Information</h5>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                <span className="font-medium">{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '-'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Time:</span>
                                <span className="font-medium">{selectedTime || '-'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                <span className="font-medium">30 minutes</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Format:</span>
                                <span className="font-medium">Video Call</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setStep1Complete(false)}
                          >
                            Back
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={!topic}
                            onClick={handleScheduleMeeting}
                          >
                            Schedule Meeting <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  {/* Success message */}
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Meeting Scheduled!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your meeting has been scheduled for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''} at {selectedTime}.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 max-w-md mx-auto mb-6">
                    <h5 className="font-medium mb-4 text-left">Meeting Details</h5>
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Topic:</span>
                        <span className="font-medium">{topic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="font-medium">{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Time:</span>
                        <span className="font-medium">{selectedTime || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                        <span className="font-medium">30 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Format:</span>
                        <span className="font-medium">Video Call</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add to Calendar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleStartOver}
                    >
                      Schedule Another
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Customer Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/90"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">What Our Customers Say</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                      "The validation meeting was eye-opening! The expert helped me identify critical flaws in my business model that I had completely overlooked."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">FinTech Founder</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                      "Worth every minute! The team provided actionable insights that helped me pivot my product roadmap and better align with market needs."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-gray-500">SaaS Entrepreneur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValidationDashboardStep;
