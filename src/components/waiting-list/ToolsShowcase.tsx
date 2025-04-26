
import React from 'react';
import { motion } from 'framer-motion';
import { RedditLogoIcon, PaletteIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ToolsShowcase = () => {
  const tools = [
    {
      title: "Reddit Insights",
      description: "Uncover valuable market insights and trending topics by analyzing Reddit communities relevant to your business niche.",
      icon: <RedditLogoIcon className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Logo Creation",
      description: "Generate professional and unique logos for your business using our AI-powered design tools.",
      icon: <PaletteIcon className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Powerful AI Tools at Your Fingertips
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to validate and build your business idea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {tool.icon}
                    </div>
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
