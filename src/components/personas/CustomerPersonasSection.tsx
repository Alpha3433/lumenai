
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, AlertCircle } from 'lucide-react';

interface CustomerPersonasSectionProps {
  businessName: string;
  businessDescription: string;
}

const CustomerPersonasSection: React.FC<CustomerPersonasSectionProps> = ({ 
  businessName,
  businessDescription
}) => {
  // Generate personas based on business description
  const personas = generatePersonas(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Customer Persona Deep-Dive
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Understanding your target audience
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, index) => (
          <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {persona.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{persona.name}, {persona.age}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{persona.occupation}</p>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>Day-in-the-Life</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{persona.dayInLife}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <AlertCircle className="h-4 w-4 text-rose-500" />
                      <span>Pain Point Mapping</span>
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      {persona.painPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Helper function to generate personas based on business info
function generatePersonas(businessName: string, businessDescription: string) {
  // In a real app, this would be more dynamic and based on actual analysis
  // For now, we'll provide realistic but generic personas
  return [
    {
      emoji: "👩‍💼",
      name: "Sarah",
      age: "35",
      occupation: "Marketing Manager",
      dayInLife: `Sarah checks ${businessName} during her lunch break to track her progress. She values the convenience and how it fits into her busy schedule between meetings.`,
      painPoints: [
        `Decision fatigue solved by ${businessName}'s personalized recommendations`,
        "Needs flexibility with her unpredictable work schedule",
        "Wants data-driven insights without feeling overwhelmed"
      ]
    },
    {
      emoji: "👨‍💻",
      name: "Michael",
      age: "28",
      occupation: "Software Developer",
      dayInLife: `Michael uses ${businessName} first thing in the morning to plan his day. He appreciates the technical aspects and enjoys analyzing the metrics.`,
      painPoints: [
        "Struggles with maintaining consistency in routines",
        `${businessName}'s reminder system helps him stay accountable`,
        "Values privacy and data security with health information"
      ]
    },
    {
      emoji: "👵",
      name: "Barbara",
      age: "62",
      occupation: "Retired Teacher",
      dayInLife: `Barbara uses ${businessName} in the evenings to track her daily activities and plan for tomorrow. She appreciates the easy-to-use interface.`,
      painPoints: [
        "Needs simple, accessible technology without a steep learning curve",
        `${businessName}'s clear visuals help with her declining vision`,
        "Looks for supportive community features to stay motivated"
      ]
    },
    {
      emoji: "👨‍⚕️",
      name: "Dr. James",
      age: "45",
      occupation: "Healthcare Provider",
      dayInLife: `Dr. James recommends ${businessName} to patients and checks in on their progress during appointments. He values the professional reporting features.`,
      painPoints: [
        "Needs scientific, evidence-based solutions for patients",
        `${businessName}'s integration capabilities save time on data entry`,
        "Values secure data sharing between patients and providers"
      ]
    }
  ];
}

export default CustomerPersonasSection;
