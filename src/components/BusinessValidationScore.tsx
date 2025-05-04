
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle, Award, Dumbbell } from 'lucide-react';
import ValidationMetrics from './validation/ValidationMetrics';
import StrengthsAndChallenges from './validation/StrengthsAndChallenges';
interface BusinessValidationScoreProps {
  businessText: string;
  businessName: string;
}
const BusinessValidationScore: React.FC<BusinessValidationScoreProps> = ({
  businessText,
  businessName
}) => {
  // This is a mockup, in a real app this would be calculated from the businessText
  const score = 85;

  // Sample validation points (in a real app, these would be generated from the analysis)
  const positives = ["Recurring revenue model potential", "Large target market (obese individuals)", "Personalization through AI creates defensibility", "Growing demand for digital health solutions"];
  const negatives = ["High competition in fitness app space", "Customer acquisition costs may be high", "User retention challenges in fitness apps", "Requires continuous AI training and updates"];

  // Sample metrics for different aspects of the business
  const metrics = [{
    name: "Market Potential",
    score: 89,
    description: "Large addressable market with growing demand for weight loss solutions."
  }, {
    name: "Revenue Model",
    score: 92,
    description: "Subscription-based approach offers strong recurring revenue potential."
  }, {
    name: "Competitive Landscape",
    score: 72,
    description: "Competitive market but clear differentiation with AI personalization."
  }, {
    name: "Technical Feasibility",
    score: 88,
    description: "AI implementation is achievable with current technology stack."
  }];

  // Add state for the editable text and its position
  const [editableText, setEditableText] = useState(businessName);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0
  });
  const textRef = useRef<HTMLDivElement>(null);

  // Handlers for dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const parentRect = textRef.current?.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const newX = e.clientX - parentRect.left - dragOffset.x;
        const newY = e.clientY - parentRect.top - dragOffset.y;
        setPosition({
          x: newX,
          y: newY
        });
      }
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse events outside the component
  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const parentRect = textRef.current?.parentElement?.getBoundingClientRect();
        if (parentRect) {
          const newX = e.clientX - parentRect.left - dragOffset.x;
          const newY = e.clientY - parentRect.top - dragOffset.y;
          setPosition({
            x: newX,
            y: newY
          });
        }
      }
    };
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragOffset]);
  return <div className="bg-white dark:bg-gray-800 p-6 rounded-xl" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">Validation Score</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Business idea analysis based on market trends and success factors
            </p>
          </div>
          <Badge className={`px-3 py-1 ${score >= 80 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}`}>
            {score >= 80 ? "Strong Potential" : "Needs Work"}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="16" className="text-gray-100 dark:text-gray-800" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="16" strokeDasharray={553} strokeDashoffset={553 - 553 * score / 100} className="text-blue-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">{score}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overall Score</div>
                </div>
              </div>
            </div>
            
            {/* Simple editable text without formatting */}
            <div 
              ref={textRef}
              style={{ 
                position: 'relative',
                left: position.x, 
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              className="mt-4"
              onMouseDown={handleMouseDown}
            >
              <div 
                contentEditable 
                suppressContentEditableWarning 
                className="focus:outline-none"
                onBlur={(e) => setEditableText(e.currentTarget.textContent || businessName)}
              >
                {editableText}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-6">
            {metrics.map((metric, i) => <div key={i} className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{metric.name}</p>
                  <p className="text-sm font-semibold">{metric.score}%</p>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Extended Key Strengths and Areas for Improvement */}
      <div className="space-y-8">
        <StrengthsAndChallenges positives={positives} negatives={negatives} />
      </div>
    </div>;
};
export default BusinessValidationScore;
