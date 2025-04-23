
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  type CarouselApi 
} from "@/components/ui/carousel";
import TestimonialSlide from './TestimonialSlide';
import TestimonialDots from './TestimonialDots';
import { testimonialsList } from '@/data/testimonials';

// Auto-play interval in milliseconds
const AUTO_PLAY_INTERVAL = 5000;

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Store the API instance when carousel is mounted
  const onApiChange = useCallback((api: CarouselApi) => {
    setApi(api);
  }, []);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;
    
    const onChange = () => {
      const currentSlide = api.selectedScrollSnap();
      setCurrentIndex(currentSlide);
    };
    
    api.on('select', onChange);
    // Set initial value
    onChange();
    
    return () => {
      api.off('select', onChange);
    };
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;
    
    const startAutoPlay = () => {
      clearAutoPlayTimer();
      autoPlayTimerRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonialsList.length;
        api.scrollTo(nextIndex);
      }, AUTO_PLAY_INTERVAL);
    };
    
    const clearAutoPlayTimer = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
    
    startAutoPlay();
    
    // Clean up timer when component unmounts
    return () => clearAutoPlayTimer();
  }, [api, currentIndex]);

  // Navigate to a specific testimonial
  const goToTestimonial = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section 
      style={{ background: "#0F1A0F" }} 
      className="py-20 px-4 relative overflow-hidden bg-gray-700"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium"
          >
            Success Stories
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            What Our Clients Have To Say
          </motion.h2>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              skipSnaps: false,
              duration: 24, // smooth animation between slides
            }}
            setApi={onApiChange}
            className="w-full"
          >
            <CarouselContent>
              {testimonialsList.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="p-1">
                    <TestimonialSlide testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Desktop navigation arrows */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-4 top-1/2 bg-white/10 hover:bg-white/20 border-0 text-white" />
              <CarouselNext className="absolute -right-4 top-1/2 bg-white/10 hover:bg-white/20 border-0 text-white" />
            </div>
          </Carousel>

          {/* Mobile navigation buttons */}
          <div className="flex justify-center gap-3 mt-8 md:hidden">
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation dots */}
          <TestimonialDots 
            count={testimonialsList.length}
            currentIndex={currentIndex}
            onDotClick={goToTestimonial}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
