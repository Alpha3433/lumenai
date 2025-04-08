import React from 'react';
import Testimonial from '@/components/Testimonial';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  // Updated testimonials data focused on early-stage entrepreneurs
  const testimonials = [
    {
      content: "As a first-time founder with just an idea, Visionary Plans helped me validate my concept in less than a day. Their market analysis showed me exactly where to focus, and now my startup has gained its first 100 customers!",
      author: "Sarah Johnson",
      role: "Founder, TaskMaster",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "I had zero business experience when I started. The consulting team guided me through market research and helped identify a niche that competitors overlooked. One month in, and I've already acquired my first paying customers!",
      author: "Michael Chen",
      role: "Founder, NutriTech",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Their business model validation saved my startup before we even launched. As a solo founder with limited resources, their pricing strategy recommendations helped me achieve profitability within the first six weeks!",
      author: "Emma Rodriguez",
      role: "Founder, StyleConnect",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "As a non-technical founder with just a concept, I struggled to articulate my vision. Their platform and consultants helped transform my rough idea into a business plan that secured my pre-seed funding of $50K!",
      author: "David Park",
      role: "Founder, MediConnect",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Starting with no industry connections, their competitor analysis revealed an underserved market segment perfect for my skills. Three months later, I've gone from idea to launching my MVP with 50 beta users!",
      author: "Olivia Thompson",
      role: "Founder, FitJourney",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "In just 48 hours, I went from a side-hustle idea to a solid business plan. Their consultants helped me identify my target audience and develop a marketing strategy that brought in my first 10 clients within weeks!",
      author: "James Wilson",
      role: "Founder, GreenLogistics",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white dark:from-blue-950/10 dark:to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium">
            Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            What Our Customers Are Saying
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Join thousands of first-time founders who've turned ideas into thriving businesses with our platform
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Testimonial
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
                imageSrc={testimonial.imageSrc}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
