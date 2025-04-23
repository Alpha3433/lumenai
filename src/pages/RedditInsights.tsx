
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import RedditThemeCard from "@/components/reddit/RedditThemeCard";
import RedditSearchBar from "@/components/reddit/RedditSearchBar";
import RedditLoadingGrid from "@/components/reddit/RedditLoadingGrid";
import { Globe, AlertCircle } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// -- Types
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

// -- Fetch via Supabase edge function (backend uses Reddit secret)
const fetchRedditThemes = async (searchQuery: string = ""): Promise<ThemeData[]> => {
  try {
    const response = await fetch(
      "https://lxnhpkyviyvoefbgyzgi.functions.supabase.co/reddit-insights",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ search: searchQuery })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error response:", errorData);
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    // Added safeguard: Fallback to default if themes is missing
    return Array.isArray(data.themes) ? data.themes : [];
  } catch (error) {
    console.error("Unable to fetch Reddit themes:", error);
    toast.error(`Failed to fetch data from Reddit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
};

export default function RedditInsights() {
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const themesPerPage = 12; // Increased from 6 to show more cards

  // All available categories
  const categories = [
    "All",
    "Common Advice Given",
    "Pain Points", 
    "Success Stories", 
    "Aspirations & Goals", 
    "Emerging Trends",
    "Tool Mentions"
  ];

  useEffect(() => {
    const loadInitialThemes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRedditThemes();
        setThemeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load themes');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialThemes();
  }, []);

  const runSearch = async () => {
    setSearching(true);
    setSearchAttempted(true);
    setError(null);
    
    try {
      const result = await fetchRedditThemes(search);
      setThemeData(result);
      if (result.length === 0) {
        toast.info("No themes found for your search. Try different keywords.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error instanceof Error ? error.message : 'Search failed');
      toast.error("Search failed. Please try again.");
    } finally {
      setSearching(false);
      setCurrentPage(1);
      setActiveTab("all"); // Reset to show all results after a search
    }
  };

  // Filter themes by selected category
  const filteredThemes = themeData.filter(theme => 
    activeTab === "all" ? true : theme.category.toLowerCase() === activeTab.toLowerCase()
  );

  // Pagination
  const indexOfLastTheme = currentPage * themesPerPage;
  const indexOfFirstTheme = indexOfLastTheme - themesPerPage;
  const currentThemes = filteredThemes.slice(indexOfFirstTheme, indexOfLastTheme);
  const totalPages = Math.ceil(filteredThemes.length / themesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get count of themes per category
  const categoryCount = categories.reduce((acc, category) => {
    const count = category.toLowerCase() === "all" 
      ? themeData.length 
      : themeData.filter(theme => theme.category.toLowerCase() === category.toLowerCase()).length;
    return { ...acc, [category.toLowerCase()]: count };
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff] to-[#fee6d8] dark:from-gray-900 dark:to-orange-950/40">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-12 pt-24 px-4">
        <div className="flex items-center mb-4">
          <Globe className="h-8 w-8 text-[#FF4500] mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Reddit Insights & Trends
          </h1>
        </div>
        <p className="mb-8 text-muted-foreground">
          Instantly access and organize insightful suggestions from Reddit discussions &mdash; auto-grouped into actionable themes.
        </p>
        <RedditSearchBar
          search={search}
          setSearch={setSearch}
          runSearch={runSearch}
          searching={searching}
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 dark:text-red-300 font-medium">Error loading data</p>
            </div>
            <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-800/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded text-sm font-medium transition-colors"
            >
              Reload page
            </button>
          </div>
        )}

        {(isLoading || searching) ? (
          <RedditLoadingGrid />
        ) : (
          <>
            {themeData.length === 0 ? (
              <div className="text-muted-foreground text-center py-12">
                <Globe className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No themes found</h3>
                <p className="mb-4">
                  {searchAttempted 
                    ? "No results for your search. Try using different keywords." 
                    : "Try searching with specific keywords to find relevant Reddit discussions."}
                </p>
                {searchAttempted && (
                  <button 
                    onClick={() => {
                      setSearch("");
                      setSearchAttempted(false);
                      setIsLoading(true);
                      fetchRedditThemes().then(data => {
                        setThemeData(data);
                        setIsLoading(false);
                      });
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Reset search
                  </button>
                )}
              </div>
            ) : (
              <>
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
                
                {filteredThemes.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentThemes.map((theme, i) => (
                        <RedditThemeCard theme={theme} key={`${theme.theme}-${i}`} />
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
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
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No themes found for this category.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
