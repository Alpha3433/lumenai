
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface GenerationTimerProps {
  generating: boolean;
}

const GenerationTimer = ({ generating }: GenerationTimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (generating) {
      setTimeElapsed(0);
      intervalId = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [generating]);

  if (!generating || timeElapsed === 0) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
      <Clock className="h-4 w-4" />
      <span>Time Elapsed: {formatTime(timeElapsed)}</span>
    </div>
  );
};

export default GenerationTimer;
