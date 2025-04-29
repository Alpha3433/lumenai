
import React from 'react';
import { motion } from 'framer-motion';
import FailureStatistics from './failures/FailureStatistics';
import IdeaGeneratorCard from './idea-generator/IdeaGeneratorCard';

const WhyStartupsFail: React.FC = () => {
  const failureReasons = [
    { reason: "No Market Need", percentage: 42 },
    { reason: "Ran Out of Cash", percentage: 29 },
    { reason: "Wrong Team", percentage: 23 },
    { reason: "Get Outcompeted", percentage: 19 }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Most Ideas <span className="text-red-500">Fail</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            42% of startups fail due to no market need. Don't let your idea become another statistic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FailureStatistics failureReasons={failureReasons} />
          <IdeaGeneratorCard />
        </div>
      </div>
    </section>
  );
};

export default WhyStartupsFail;
