
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare, Lightbulb, Users, Calendar } from "lucide-react";

type ThemeData = {
  theme: string;
  description: string;
  posts: number;
  insights: number;
  subreddits: number;
  daysAgo: number|string;
  created: string;
  category: string;
  color: string;
};

const categoryColors = {
  "Success Stories": "bg-green-100 text-green-800",
  "Aspirations & Goals": "bg-blue-100 text-blue-800",
  "Pain Points": "bg-yellow-100 text-yellow-800",
  "Emerging Trends": "bg-purple-100 text-purple-800",
  "Search Results": "bg-orange-100 text-orange-800",
  "Common Advice Given": "bg-amber-100 text-amber-800",
  "Tool Mentions": "bg-indigo-100 text-indigo-800"
};

interface RedditThemeCardProps {
  theme: ThemeData;
}

const RedditThemeCard: React.FC<RedditThemeCardProps> = ({ theme }) => (
  <Card className="relative group hover:shadow-md transition-shadow duration-300">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg font-bold">{theme.theme}</CardTitle>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[theme.category] || "bg-gray-100 text-gray-800"}`}>
          {theme.category}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{theme.description}</p>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md flex flex-col items-center justify-center">
          <MessageSquare className="h-5 w-5 text-gray-500 mb-1" />
          <p className="font-bold">{theme.posts} Posts</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md flex flex-col items-center justify-center">
          <Lightbulb className="h-5 w-5 text-gray-500 mb-1" />
          <p className="font-bold">{theme.insights} Insights</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md flex flex-col items-center justify-center">
          <Users className="h-5 w-5 text-gray-500 mb-1" />
          <p className="font-bold">{theme.subreddits} Subreddits</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md flex flex-col items-center justify-center">
          <Calendar className="h-5 w-5 text-gray-500 mb-1" />
          <p className="font-bold">{theme.daysAgo} days ago</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        Created {theme.created}
      </div>
    </CardContent>
  </Card>
);

export default RedditThemeCard;
