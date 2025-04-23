
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Search, MessageSquare, Lightbulb, Users, Calendar } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const REDDIT_API_KEY = "RC8VS8rybbX7WFL3xBKZFDefn9QMwQ";

interface ThemeData {
  theme: string;
  description: string;
  posts: number;
  insights: number;
  subreddits: number;
  daysAgo: number;
  created: string;
  category: "Success Stories" | "Aspirations & Goals" | "Pain Points" | "Emerging Trends";
  color: string;
}

const categoryColors = {
  "Success Stories": "bg-green-100 text-green-800",
  "Aspirations & Goals": "bg-blue-100 text-blue-800",
  "Pain Points": "bg-yellow-100 text-yellow-800",
  "Emerging Trends": "bg-purple-100 text-purple-800"
};

// Mock data based on the image
const mockThemeData: ThemeData[] = [
  {
    theme: "Product Development and Launch Success",
    description: "Success stories around product development, launches, and achieving significant milestones.",
    posts: 237,
    insights: 429,
    subreddits: 12,
    daysAgo: 3,
    created: "18 days ago",
    category: "Success Stories",
    color: "bg-green-100"
  },
  {
    theme: "Product Development and Improvement",
    description: "Goals related to developing, improving, and scaling products",
    posts: 198,
    insights: 310,
    subreddits: 14,
    daysAgo: 5,
    created: "18 days ago",
    category: "Aspirations & Goals",
    color: "bg-blue-100"
  },
  {
    theme: "Personal and Financial Strain",
    description: "Personal challenges and financial strains faced by individuals in startups.",
    posts: 194,
    insights: 467,
    subreddits: 13,
    daysAgo: 6,
    created: "18 days ago",
    category: "Pain Points",
    color: "bg-yellow-100"
  },
  {
    theme: "AI Tools and Platforms",
    description: "Suggestions about AI tools, platforms, and their applications in various fields.",
    posts: 156,
    insights: 238,
    subreddits: 11,
    daysAgo: 3,
    created: "18 days ago",
    category: "Emerging Trends",
    color: "bg-purple-100"
  },
  {
    theme: "Personal and Team Development",
    description: "Personal growth, team building, and finding the right partners or co-founders",
    posts: 151,
    insights: 280,
    subreddits: 13,
    daysAgo: 4,
    created: "18 days ago",
    category: "Aspirations & Goals",
    color: "bg-blue-100"
  },
  {
    theme: "Marketing and Messaging",
    description: "Strategies for effective marketing, messaging, and branding",
    posts: 146,
    insights: 255,
    subreddits: 12,
    daysAgo: 3,
    created: "18 days ago",
    category: "Aspirations & Goals",
    color: "bg-blue-100"
  }
];

// Function to fetch real Reddit data and transform it into themed data
const fetchRedditThemes = async (searchQuery: string = ""): Promise<ThemeData[]> => {
  // In a real implementation, you would:
  // 1. Call the Reddit API
  // 2. Process the data
  // 3. Group posts by themes
  // 4. Return the formatted data
  
  try {
    // This would be your actual API call
    // const response = await fetch(`https://oauth.reddit.com/search?q=${encodeURIComponent(searchQuery)}`, {
    //   headers: {
    //     'Authorization': `Bearer ${REDDIT_API_KEY}`, 
    //     'User-Agent': 'RedditInsights/1.0.0'
    //   }
    // });
    // const data = await response.json();
    
    // Process and analyze data to extract themes
    // For now, we'll use mockThemeData filtered by searchQuery
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    if (!searchQuery) return mockThemeData;
    
    return mockThemeData.filter(
      theme => theme.theme.toLowerCase().includes(searchQuery.toLowerCase()) || 
               theme.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    return [];
  }
};

export default function RedditInsights() {
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const themesPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetchRedditThemes().then(data => {
      setThemeData(data);
      setIsLoading(false);
    });
  }, []);

  const runSearch = async () => {
    setSearching(true);
    setThemeData([]);
    const result = await fetchRedditThemes(search);
    setThemeData(result);
    setSearching(false);
    setCurrentPage(1);
  };

  // Calculate pagination
  const indexOfLastTheme = currentPage * themesPerPage;
  const indexOfFirstTheme = indexOfLastTheme - themesPerPage;
  const currentThemes = themeData.slice(indexOfFirstTheme, indexOfLastTheme);
  const totalPages = Math.ceil(themeData.length / themesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff] to-[#fee6d8] dark:from-gray-900 dark:to-orange-950/40">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-12 pt-24 px-4">
        <div className="flex items-center mb-8">
          <Globe className="h-8 w-8 text-[#FF4500] mr-2" />
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
            placeholder="Search for themes (e.g. product, marketing, team development)"
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
        
        {(isLoading || searching) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <Skeleton className="h-7 w-[80%] mb-2" />
                  <Skeleton className="h-4 w-[90%] mb-1" />
                  <Skeleton className="h-4 w-[60%]" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 rounded-md" />
                    <Skeleton className="h-16 rounded-md" />
                    <Skeleton className="h-16 rounded-md" />
                    <Skeleton className="h-16 rounded-md" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-6 w-[30%] rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {themeData.length === 0 ? (
              <div className="text-muted-foreground text-center py-12">
                <Globe className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No themes found</h3>
                <p>Try searching with different keywords or browse all themes.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentThemes.map((theme, i) => (
                    <Card key={i} className="relative group">
                      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                      
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">{theme.theme}</CardTitle>
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
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Created {theme.created}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[theme.category]}`}>
                            {theme.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {themeData.length > themesPerPage && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={currentPage === i + 1}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
