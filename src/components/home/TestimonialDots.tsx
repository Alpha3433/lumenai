
import React from 'react';

interface TestimonialDotsProps {
  count: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const TestimonialDots: React.FC<TestimonialDotsProps> = ({ count, currentIndex, onDotClick }) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            index === currentIndex ? 'bg-white scale-110' : 'bg-white/30'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
};

export default TestimonialDots;
