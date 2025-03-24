
import React from 'react';
import { ArrowRight } from 'lucide-react';

const FAQSection = () => {
  // FAQ data
  const faqs = [
    {
      question: "How accurate are our AI predictions?",
      answer: "Our algorithm delivers 92% accuracy in predicting profitable niches, compared to the industry average of 67%. We combine data from multiple sources for unmatched precision."
    },
    {
      question: "How long does it take to generate a business report?",
      answer: "Most reports are generated in under 30 seconds, giving you instant insights to make informed decisions quickly."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 2 niche reports per month, basic market analysis, and competitor insights. No credit card required to get started."
    },
    {
      question: "How does our AI find profitable niches?",
      answer: "We analyze search trends, social media conversations, and market data to identify growing niches with high demand and low competition."
    },
    {
      question: "Can I use this platform for any industry?",
      answer: "Yes, our platform works across virtually all industries and market segments, from e-commerce to B2B services."
    },
    {
      question: "Do I need technical skills to use this platform?",
      answer: "No technical skills required. Our user-friendly interface is designed for entrepreneurs and business owners, not data scientists."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Curious about our platform? We've got you covered!
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-300 mt-4 group-open:animate-fadeIn">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
