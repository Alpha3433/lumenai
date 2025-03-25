
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to discover your profitable niche?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start generating data-driven business insights today and validate your ideas in minutes.
          </p>
          <Link to="/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md h-12 px-8 text-base font-medium">
              Try for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. 2 free reports per month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
