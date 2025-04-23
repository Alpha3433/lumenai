
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import RedditThemeCard from "@/components/reddit/RedditThemeCard";
import RedditSearchBar from "@/components/reddit/RedditSearchBar";
import RedditLoadingGrid from "@/components/reddit/RedditLoadingGrid";
import { Globe } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { toast } from "sonner";

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
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    // Added safeguard: Fallback to default if themes is missing
    return Array.isArray(data.themes) ? data.themes : [];
  } catch (error) {
    console.error("Unable to fetch Reddit themes:", error);
    toast.error("Failed to fetch data from Reddit. Please try again later.");
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
    setSearchAttempted(true);
    try {
      const result = await fetchRedditThemes(search);
      setThemeData(result);
      if (result.length === 0) {
        toast.info("No themes found for your search. Try different keywords.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setSearching(false);
      setCurrentPage(1);
    }
  };

  // Pagination
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
        <RedditSearchBar
          search={search}
          setSearch={setSearch}
          runSearch={runSearch}
          searching={searching}
        />
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
                      fetchRedditThemes().then(data => setThemeData(data));
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Reset search
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentThemes.map((theme, i) => (
                    <RedditThemeCard theme={theme} key={i} />
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
