
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const FAQAccordion = () => {
  const faqs = [
    {
      question: "Is Foster AI suitable for various size businesses?",
      answer: "Yes, our platform is designed to help businesses of all sizes, from startups to established enterprises. We offer flexible plans to accommodate different needs and growth stages."
    },
    {
      question: "Can customers integrate existing analytics? What APIs are included?",
      answer: "Absolutely! Our platform integrates seamlessly with most popular analytics tools and provides robust APIs for custom integrations with your existing systems."
    },
    {
      question: "What if I don't have the capacity to handle all feedback changes?",
      answer: "Our AI-powered system helps prioritize feedback based on impact and feasibility, allowing you to focus on the most important changes while planning for future improvements."
    },
    {
      question: "What is the pricing?",
      answer: "We offer a freemium model with 2 free reports per month. Premium plans start at $29/month with unlimited reports and advanced features. Enterprise plans with custom solutions are also available."
    },
    {
      question: "How can we increase feedback from customers?",
      answer: "Our platform includes engagement tools designed to encourage user feedback through intuitive interfaces and automated follow-ups, significantly increasing your feedback collection rate."
    }
  ];

  return (
    <section className="py-20 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 py-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion;
