
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "This platform saved me from wasting $50K on an app nobody wanted. The validation report showed clear market gaps I hadn't considered.",
    name: "Michael T.",
    position: "Tech Founder",
    image: "/public/placeholder.svg"
  },
  {
    id: 2,
    quote: "I was about to quit my job to work on my startup idea. The validation showed major problems I hadn't considered. I'm so glad I tested first!",
    name: "Sarah L.",
    position: "First-time Entrepreneur",
    image: "/public/placeholder.svg"
  },
  {
    id: 3,
    quote: "We got a 92% validation score and decided to move forward. Six months later, we've secured $1.2M in funding thanks to the data.",
    name: "David K.",
    position: "CEO, HealthTech Startup",
    image: "/public/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories: Our Idea Validation Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from entrepreneurs who saved time and money by validating their ideas first
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
