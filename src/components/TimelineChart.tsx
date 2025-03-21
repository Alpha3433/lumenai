
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Calendar, ArrowRight } from 'lucide-react';

interface TimelineChartProps {
  timelineText: string;
}

interface TimelineItem {
  phase: string;
  tasks: string[];
  timeframe: string;
}

const TimelineChart = ({ timelineText }: TimelineChartProps) => {
  // Extract timeline data from text
  const extractTimelineData = (text: string): TimelineItem[] => {
    // Default timeline
    const defaultTimeline: TimelineItem[] = [
      {
        phase: "Planning Phase",
        tasks: ["Market Research", "Business Plan Finalization", "Secure Initial Funding"],
        timeframe: "Months 1-2"
      },
      {
        phase: "Setup Phase",
        tasks: ["Legal Entity Formation", "Acquire Necessary Permits", "Set Up Online Presence"],
        timeframe: "Months 3-4"
      },
      {
        phase: "Launch Phase",
        tasks: ["Product/Service Launch", "Initial Marketing Campaign", "First Customer Acquisition"],
        timeframe: "Months 5-6"
      },
      {
        phase: "Growth Phase",
        tasks: ["Expand Customer Base", "Refine Offerings", "Scale Operations"],
        timeframe: "Months 7-12"
      }
    ];

    try {
      // Extract phases and their details
      const phaseMatches = text.match(/([A-Za-z\s]+Phase|Month[s]?\s+\d+(?:-\d+)?:)[^\n]*/g);
      
      if (phaseMatches && phaseMatches.length > 0) {
        return phaseMatches.map(phaseText => {
          // Extract phase name and timeframe
          const phaseMatch = phaseText.match(/([A-Za-z\s]+Phase|Month[s]?\s+\d+(?:-\d+)?):(.+)/);
          
          if (phaseMatch) {
            const phase = phaseMatch[1].trim();
            const details = phaseMatch[2].trim();
            
            // Extract timeframe
            const timeframeMatch = phase.match(/Month[s]?\s+(\d+(?:-\d+)?)/);
            const timeframe = timeframeMatch ? `Month${timeframeMatch[1].includes('-') ? 's' : ''} ${timeframeMatch[1]}` : "TBD";
            
            // Extract tasks
            const tasks = details.split(/[,;]/).map(task => task.trim()).filter(Boolean);
            
            return {
              phase: timeframeMatch ? "Implementation Phase" : phase,
              tasks: tasks.length > 0 ? tasks : ["Details not specified"],
              timeframe
            };
          }
          
          return defaultTimeline[0]; // Fallback
        });
      }
      
      // Try alternative format (bullet points)
      const bulletMatches = text.match(/[•-]\s+([^\n]+)/g);
      if (bulletMatches && bulletMatches.length > 0) {
        const tasks = bulletMatches.map(task => task.replace(/[•-]\s+/, '').trim());
        
        // Group into phases
        const phasesCount = Math.min(4, Math.ceil(tasks.length / 3));
        const timeline: TimelineItem[] = [];
        
        for (let i = 0; i < phasesCount; i++) {
          const phaseNumber = i + 1;
          const startTask = i * 3;
          const phaseTasks = tasks.slice(startTask, startTask + 3);
          
          timeline.push({
            phase: `Phase ${phaseNumber}`,
            tasks: phaseTasks,
            timeframe: `Month${i > 0 ? 's' : ''} ${i * 3 + 1}${i < phasesCount - 1 ? '-' + (i + 1) * 3 : '+'}`
          });
        }
        
        return timeline;
      }
    } catch (e) {
      console.log("Error parsing timeline:", e);
    }
    
    return defaultTimeline;
  };

  const timelineData = extractTimelineData(timelineText);

  const getPhaseColor = (index: number): string => {
    const colors = ["blue-500", "purple-500", "green-500", "amber-500", "rose-500", "cyan-500"];
    return colors[index % colors.length];
  };

  return (
    <div className="mt-4 space-y-4">
      {timelineData.map((phase, index) => (
        <Card key={index} className={`border-l-4 border-l-${getPhaseColor(index)} hover-scale`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className={`text-${getPhaseColor(index)} h-5 w-5`} />
              <h3 className="font-bold text-lg">{phase.phase}</h3>
              <span className="text-xs px-2 py-1 bg-muted rounded-full ml-auto">
                {phase.timeframe}
              </span>
            </div>
            
            <ul className="space-y-2 mt-3">
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                  <span className="text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex items-center justify-center py-4">
        <div className="h-0.5 w-1/4 bg-gray-200"></div>
        <ArrowRight className="text-gray-400 mx-2" />
        <div className="h-0.5 w-1/4 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default TimelineChart;
