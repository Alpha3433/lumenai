
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the idea validation?",
    answer: "Our validation process uses AI to analyze market data, competition, trends, and consumer behavior. While no validation can guarantee 100% accuracy, our system typically provides 85-90% confidence levels based on available data points."
  },
  {
    question: "How long does the validation process take?",
    answer: "Most idea validations are completed within 10-15 minutes, compared to weeks or months of traditional market research. Complex ideas with multiple industries might take up to 30 minutes."
  },
  {
    question: "What if my idea is confidential?",
    answer: "We take data privacy very seriously. All submissions are encrypted, and our system doesn't store your idea details after analysis. You can also use our NDA feature for additional protection."
  },
  {
    question: "Can I validate multiple ideas?",
    answer: "Yes! Our standard plan allows for up to 5 idea validations per month, while our premium plan offers unlimited validations."
  },
  {
    question: "How do I interpret the validation results?",
    answer: "Your results include a validation score (0-100), market opportunity assessment, competitor analysis, and specific recommendations. We also provide personalized guidance on how to interpret your specific results."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our startup validation platform
          </p>
        </motion.div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem value={`item-${index}`} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-white text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
