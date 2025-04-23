
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RedditSearchBar from "@/components/reddit/RedditSearchBar";
import RedditLoadingGrid from "@/components/reddit/RedditLoadingGrid";
import RedditThemeGrid from "@/components/reddit/RedditThemeGrid";
import RedditCategoryTabs from "@/components/reddit/RedditCategoryTabs";
import RedditError from "@/components/reddit/RedditError";
import { useRedditThemes } from "@/hooks/useRedditThemes";
import { Globe } from "lucide-react";

const categories = [
  "All",
  "Common Advice Given",
  "Pain Points", 
  "Success Stories", 
  "Aspirations & Goals", 
  "Emerging Trends",
  "Tool Mentions"
];

export default function RedditInsights() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const themesPerPage = 12;

  const {
    themeData,
    isLoading,
    error,
    searching,
    searchAttempted,
    fetchRedditThemes
  } = useRedditThemes();

  // Filter themes by selected category
  const filteredThemes = themeData.filter(theme => 
    activeTab === "all" ? true : theme.category.toLowerCase() === activeTab.toLowerCase()
  );

  // Pagination
  const indexOfLastTheme = currentPage * themesPerPage;
  const indexOfFirstTheme = indexOfLastTheme - themesPerPage;
  const currentThemes = filteredThemes.slice(indexOfFirstTheme, indexOfLastTheme);
  const totalPages = Math.ceil(filteredThemes.length / themesPerPage);

  // Get count of themes per category
  const categoryCount = categories.reduce((acc, category) => {
    const count = category.toLowerCase() === "all" 
      ? themeData.length 
      : themeData.filter(theme => theme.category.toLowerCase() === category.toLowerCase()).length;
    return { ...acc, [category.toLowerCase()]: count };
  }, {} as Record<string, number>);

  const runSearch = async () => {
    await fetchRedditThemes(search);
    setCurrentPage(1);
    setActiveTab("all");
  };

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
          <RedditError 
            error={error} 
            onRetry={() => window.location.reload()} 
          />
        )}

        {(isLoading || searching) ? (
          <RedditLoadingGrid />
        ) : (
          <>
            {themeData.length === 0 ? (
              <div className="text-center py-12">
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
                      fetchRedditThemes();
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Reset search
                  </button>
                )}
              </div>
            ) : (
              <>
                <RedditCategoryTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  categories={categories}
                  categoryCount={categoryCount}
                />
                
                <RedditThemeGrid
                  themes={currentThemes}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
