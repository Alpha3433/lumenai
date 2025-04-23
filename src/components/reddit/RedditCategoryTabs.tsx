
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeData } from "@/types/reddit";

interface RedditCategoryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  categories: string[];
  categoryCount: Record<string, number>;
}

const RedditCategoryTabs: React.FC<RedditCategoryTabsProps> = ({
  activeTab,
  setActiveTab,
  categories,
  categoryCount
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="w-full bg-white/80 dark:bg-gray-800/80 overflow-auto flex flex-nowrap justify-start p-1 rounded-xl">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.toLowerCase()} 
            value={category.toLowerCase()}
            className="flex-nowrap whitespace-nowrap"
          >
            {category} {categoryCount[category.toLowerCase()] > 0 && 
              <span className="ml-1 text-xs py-0.5 px-1.5 bg-gray-200/70 dark:bg-gray-700 rounded-full">
                {categoryCount[category.toLowerCase()]}
              </span>
            }
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default RedditCategoryTabs;
