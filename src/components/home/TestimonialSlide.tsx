
import React from 'react';
import { TestimonialItem } from '@/data/testimonials';

interface TestimonialSlideProps {
  testimonial: TestimonialItem;
}

const TestimonialSlide: React.FC<TestimonialSlideProps> = ({ testimonial }) => {
  // Extract first few words for the headline
  const headline = testimonial.content.split(' ').slice(0, 5).join(' ') + '...';

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          "{headline}"
        </h3>
        <p className="text-lg text-gray-300 mb-8">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={testimonial.imageSrc} alt={testimonial.author} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-white">{testimonial.author}</h4>
          <p className="text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlide;
