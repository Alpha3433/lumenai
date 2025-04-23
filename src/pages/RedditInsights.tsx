
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Reddit, Search } from "lucide-react";

const REDDIT_API_KEY = "RC8VS8rybbX7WFL3xBKZFDefn9QMwQ";

interface ThemeGroup {
  theme: string;
  suggestions: string[];
}

// Placeholder: replace with inferred themes and suggestions from Reddit fetch
const mockThemeGroups: ThemeGroup[] = [
  {
    theme: "Product Market Fit",
    suggestions: [
      "Look for posts where users discuss repeat purchases or organic engagement.",
      "Find threads that highlight actual customer pain points being solved.",
    ]
  },
  {
    theme: "Pricing & Revenue",
    suggestions: [
      "See how founders discuss pricing strategies in /r/startups.",
      "Filter out advice around SaaS vs. one-time payment models."
    ]
  },
];

const fetchRedditGroupedSuggestions = async (
  query: string
): Promise<ThemeGroup[]> => {
  // In real implementation, use the Reddit API plus your clustering logic.
  // This is pseudo-code showing where to put API integration:
  // const res = await fetch(
  //   `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`,
  //   { headers: { Authorization: `Bearer ${REDDIT_API_KEY}` } }
  // );
  // Process, group by theme, and return mapped data...
  
  // Mock, fast response:
  await new Promise(res => setTimeout(res, 1200));
  return mockThemeGroups.filter(g => 
    g.theme.toLowerCase().includes(query.toLowerCase()) || query === ""
  );
};

export default function RedditInsights() {
  const [themeGroups, setThemeGroups] = useState<ThemeGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchRedditGroupedSuggestions("").then(groups => {
      setThemeGroups(groups);
      setIsLoading(false);
    });
  }, []);

  const runSearch = async () => {
    setSearching(true);
    setThemeGroups([]);
    const result = await fetchRedditGroupedSuggestions(search);
    setThemeGroups(result);
    setSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff] to-[#fee6d8] dark:from-gray-900 dark:to-orange-950/40">
      <Navbar />
      <div className="container max-w-3xl mx-auto py-12 pt-24 px-4">
        <div className="flex items-center mb-8">
          <Reddit className="h-8 w-8 text-[#FF4500] mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Reddit Insights & Trends
          </h1>
        </div>
        <p className="mb-8 text-muted-foreground">
          Instantly access and organize insightful suggestions from Reddit discussions &mdash; auto-grouped into actionable themes.
        </p>
        <div className="flex gap-2 mb-10">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]/50 dark:bg-[#1a1310] bg-white text-base"
            placeholder="Search for a theme (e.g. pricing, marketing, onboarding)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") runSearch(); }}
          />
          <button
            onClick={runSearch}
            disabled={search.trim() === "" || searching}
            className="bg-[#FF4500] hover:bg-[#da3c00] text-white font-medium px-4 py-2 rounded-md transition"
          >
            <Search className="inline-block mr-1 h-4 w-4" />
            Search
          </button>
        </div>
        <div className="space-y-6">
          {(isLoading || searching) ? (
            Array(3).fill(0).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <CardHeader>
                  <Skeleton className="h-5 w-[60%] mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-[80%] mb-1" />
                  <Skeleton className="h-4 w-[70%] mb-1" />
                  <Skeleton className="h-4 w-[40%]" />
                </CardContent>
              </Card>
            ))
          ) : (
            (themeGroups.length === 0 ? (
              <div className="text-muted-foreground text-center py-12">
                No suggestions found for "{search.trim()}".
              </div>
            ) : (
              themeGroups.map((group, i) => (
                <Card key={group.theme + i}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Reddit className="h-5 w-5 text-[#FF4500] mr-2" />
                      {group.theme}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 text-base space-y-2">
                      {group.suggestions.map((s, ii) => (
                        <li key={ii}>{s}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            ))
          )}
        </div>
      </div>
    </div>
  );
}
