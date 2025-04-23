
import { corsHeaders, targetSubreddits, themeDescriptors } from "./config.ts";
import { getRedditToken, fetchSubredditPosts } from "./redditApi.ts";
import { processThemes } from "./themeProcessor.ts";
import type { RedditPost } from "./types.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { search = "" } = req.method === "POST" ? await req.json().catch(() => ({})) : {};

    const clientId = Deno.env.get("REDDIT_CLIENT_ID");
    const clientSecret = Deno.env.get("REDDIT_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      return new Response(JSON.stringify({
        error: "Reddit API credentials missing.",
        message: "Please set the REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in your Supabase project."
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    console.log("Starting Reddit API request with search:", search);
    
    // Get access token
    const accessToken = await getRedditToken(clientId, clientSecret);
    console.log("Successfully obtained Reddit access token");

    // Collect posts from all subreddits
    const posts: RedditPost[] = [];
    const subredditsSet = new Set<string>();

    for (const subreddit of targetSubreddits) {
      console.log(`Fetching from r/${subreddit}`);
      const subredditPosts = await fetchSubredditPosts(subreddit, search, accessToken);
      posts.push(...subredditPosts);
      subredditPosts.forEach(post => subredditsSet.add(post.subreddit));
    }

    // Process themes
    const themes = processThemes(posts, themeDescriptors);

    // If no themed posts found, try to fetch general posts
    if (themes.length === 0) {
      console.log("No themed posts found, fetching general posts as fallback");
      for (const subreddit of targetSubreddits) {
        const generalUrl = `https://oauth.reddit.com/r/${subreddit}/hot?limit=3`;
        try {
          const response = await fetch(generalUrl, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "User-Agent": "RedditInsights/1.0.0"
            }
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          const generalPosts = data?.data?.children?.map((x: any) => x.data) || [];
          posts.push(...generalPosts);
          generalPosts.forEach(post => subredditsSet.add(post.subreddit));
        } catch (error) {
          console.error(`Error with fallback for subreddit ${subreddit}:`, error);
        }
      }
    }

    return new Response(JSON.stringify({
      themes,
      meta: {
        totalPosts: posts.length,
        uniqueSubreddits: subredditsSet.size,
        searchQuery: search || 'default'
      }
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    console.error("Error processing request:", err);
    return new Response(JSON.stringify({
      error: "Could not fetch from Reddit.",
      message: err.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
