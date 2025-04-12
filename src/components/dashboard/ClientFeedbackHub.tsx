
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';
import Testimonial from '@/components/Testimonial';

const ClientFeedbackHub = () => {
  // Sample testimonials - in a real app, these would come from a database
  const testimonials = [
    {
      content: "The business plan generated helped me secure funding for my startup within weeks!",
      author: "Sarah Johnson",
      role: "Founder, TechStart",
      rating: 5,
      imageSrc: "https://source.unsplash.com/random/100x100/?woman"
    },
    {
      content: "Incredibly detailed market analysis that gave me insights I hadn't considered.",
      author: "Michael Chen",
      role: "CEO, GrowthHub",
      rating: 4,
      imageSrc: "https://source.unsplash.com/random/100x100/?man"
    }
  ];
  
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Client Feedback Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-sm">
              <Testimonial 
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
                imageSrc={testimonial.imageSrc}
              />
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No client feedback collected yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientFeedbackHub;
