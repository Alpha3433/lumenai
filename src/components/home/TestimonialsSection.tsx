import React from 'react';
import Testimonial from '@/components/Testimonial';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const TestimonialsSection = () => {
  // Updated testimonials data
  const testimonials = [{
    content: "I honestly thought it was too good to be true, this is worth hundreds, if not thousands, for just $50 I got my first sale within 3 days. The store came with everything I needed design, product, supplier, strategy insane stuff.",
    author: "Kieran Flanagan",
    role: "CMO at Zapier",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }, {
    content: "As a first-time founder with just an idea, Visionary Plans helped me validate my concept in less than a day. Their market analysis showed me exactly where to focus, and now my startup has gained its first 100 customers!",
    author: "Sarah Johnson",
    role: "Founder, TaskMaster",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }, {
    content: "I had zero business experience when I started. The consulting team guided me through market research and helped identify a niche that competitors overlooked. One month in, and I've already acquired my first paying customers!",
    author: "Michael Chen",
    role: "Founder, NutriTech",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }, {
    content: "Their business model validation saved my startup before we even launched. As a solo founder with limited resources, their pricing strategy recommendations helped me achieve profitability within the first six weeks!",
    author: "Emma Rodriguez",
    role: "Founder, StyleConnect",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }, {
    content: "Starting with no industry connections, their competitor analysis revealed an underserved market segment perfect for my skills. Three months later, I've gone from idea to launching my MVP with 50 beta users!",
    author: "Olivia Thompson",
    role: "Founder, FitJourney",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }, {
    content: "In just 48 hours, I went from a side-hustle idea to a solid business plan. Their consultants helped me identify my target audience and develop a marketing strategy that brought in my first 10 clients within weeks!",
    author: "James Wilson",
    role: "Founder, GreenLogistics",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }];
  return <section style={{
    background: "#0F1A0F"
  }} className="py-20 px-4 relative overflow-hidden bg-gray-700">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium">
            Success Stories
          </motion.div>
          
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-3xl md:text-5xl font-bold mb-4 text-white">
            What Our Clients Have To Say
          </motion.h2>
        </div>
        
        <div className="relative">
          <Carousel opts={{
          loop: true
        }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="md:basis-full">
                  <div className="p-1">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 min-h-[380px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-1 mb-6">
                          {Array.from({
                        length: 5
                      }).map((_, i) => <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                            </svg>)}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                          "{testimonial.content.split(' ').slice(0, 5).join(' ')}..."
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
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-4 top-1/2 bg-white/10 hover:bg-white/20 border-0 text-white" />
              <CarouselNext className="absolute -right-4 top-1/2 bg-white/10 hover:bg-white/20 border-0 text-white" />
            </div>
          </Carousel>

          {/* Mobile navigation buttons */}
          <div className="flex justify-center gap-3 mt-8 md:hidden">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => <button key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;