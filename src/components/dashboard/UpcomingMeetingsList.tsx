
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from '@/components/ui/badge';

const UpcomingMeetingsList = () => {
  const navigate = useNavigate();
  
  // Mock data for meetings
  const meetings = [
    {
      id: 1,
      date: "Today, April 15",
      count: 1,
      items: [
        {
          id: 101,
          time: "9:00 AM",
          duration: "30 min",
          title: "Business Strategy",
          description: "Initial consultation",
          status: "pending"
        }
      ]
    },
    {
      id: 2,
      date: "Tomorrow, April 16",
      count: 2,
      items: [
        {
          id: 102,
          time: "11:00 AM",
          duration: "45 min",
          title: "Marketing Review",
          description: "Quarterly marketing plan review",
          status: "confirmed"
        },
        {
          id: 103,
          time: "2:00 PM",
          duration: "60 min",
          title: "Investor Pitch",
          description: "Presentation to potential investors",
          status: "scheduled"
        }
      ]
    },
    {
      id: 3,
      date: "April 17",
      count: 1,
      items: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Scheduled</Badge>;
    }
  };

  return (
    <Card className="border border-green-100 dark:border-green-800/30 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 p-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded-full">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
        </div>
        <Button 
          onClick={() => navigate('/schedule-meeting')}
          className="bg-green-500 hover:bg-green-600"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Schedule
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {meetings.map((day) => (
            <div key={day.id} className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">{day.date}</h4>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30">
                  {day.count} meeting{day.count !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {day.items.map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="flex items-start border-l-4 border-green-400 pl-4 py-2 bg-white dark:bg-gray-800/70 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{meeting.time}</span>
                        <span className="text-xs text-gray-500">({meeting.duration})</span>
                        {getStatusBadge(meeting.status)}
                      </div>
                      <h5 className="font-medium mt-1">{meeting.title}</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{meeting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsList;
