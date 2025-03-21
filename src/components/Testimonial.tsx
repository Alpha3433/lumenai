
import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  rating: number;
  imageSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  content,
  author,
  role,
  rating,
  imageSrc = 'https://source.unsplash.com/random/100x100/?portrait'
}) => {
  return (
    <Card className="p-6 border-0 shadow-md rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{content}"
      </p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img 
            src={imageSrc} 
            alt={author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-sm">{author}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default Testimonial;
