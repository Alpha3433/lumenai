import { useState, useEffect } from "react";
import { ThemeData } from "@/types/reddit";
import { toast } from "sonner";

export const useRedditThemes = () => {
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const fetchRedditThemes = async (searchQuery: string = "") => {
    setSearching(true);
    setSearchAttempted(true);
    setError(null);
    
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

      setThemeData(Array.isArray(data.themes) ? data.themes : []);
    } catch (err) {
      console.error("Unable to fetch Reddit themes:", err);
      setError(err instanceof Error ? err.message : 'Failed to load themes');
      toast.error(`Failed to fetch data from Reddit: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSearching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRedditThemes();
  }, []);

  return {
    themeData,
    isLoading,
    error,
    searching,
    searchAttempted,
    setSearchAttempted,
    fetchRedditThemes
  };
};
