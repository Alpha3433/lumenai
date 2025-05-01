
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DemoStep } from './types';

interface DashboardStepProps {
  step: DemoStep;
}

const DashboardStep: React.FC<DashboardStepProps> = ({ step }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');

  // Time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", 
    "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM"
  ];
  
  // Today's date for the calendar
  const today = new Date();

  return (
    <section 
      id={step.id}
      className="py-20 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">
                Step 7
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {step.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {step.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Real-time scheduling
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Automatic notifications
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm mt-2">
                <CheckCircle className="h-4 w-4" />
                Expert validation calls
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-3/5 space-y-6"
          >
            {/* Meeting Scheduler Card */}
            <div className="rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
                <div className="absolute left-10 bottom-0 w-16 h-16 bg-white/10 rounded-full -mb-8"></div>
                <h3 className="text-xl font-semibold flex items-center gap-2 relative z-10">
                  <Calendar className="h-5 w-5 text-white" />
                  Schedule Your Validation Meeting
                </h3>
                <p className="text-indigo-100 text-sm relative z-10">
                  Book a time with our startup validation experts
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Selection Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        1
                      </div>
                      <h4 className="font-medium">Select Date & Time</h4>
                    </div>
                    
                    {/* Calendar */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800/50">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md pointer-events-auto"
                        disabled={(date) => 
                          date < today || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </div>
                    
                    {/* Time Slots */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Available Time Slots:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTimeSlot(time)}
                            className={`py-2 px-1 text-sm rounded-md transition-colors ${
                              selectedTimeSlot === time 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{time}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Meeting Details Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        2
                      </div>
                      <h4 className="font-medium">Meeting Details</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="topic">Meeting Topic</Label>
                        <Select
                          value={topic}
                          onValueChange={setTopic}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business-model">Business Model Validation</SelectItem>
                            <SelectItem value="market-research">Market Research Review</SelectItem>
                            <SelectItem value="user-testing">User Testing Strategy</SelectItem>
                            <SelectItem value="growth-plan">Growth Plan Creation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                        disabled={!selectedDate || !selectedTimeSlot || !name || !email || !topic}
                      >
                        Schedule Meeting
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Testimonials */}
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">
                        "The validation meeting helped me pivot my startup idea and save months of wasted development."
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Jessica Chen</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Fintech Founder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/80 p-5 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Next steps</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      After scheduling, you'll get an email with a confirmation and meeting link.
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardStep;
