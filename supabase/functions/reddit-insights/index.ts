
// Supabase Edge Function: reddit-insights/index.ts
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

Deno.serve(async (req) => {
  // CORS preflight
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

    // Limited set of subreddits for faster reliable testing
    const targetSubreddits = [
      'startup', 'startups', 'Entrepreneur', 'Entrepreneurship', 'SideProject', 
      'webdev', 'programming', 'javascript', 'reactjs'
    ];

    // Get token
    console.log("Fetching Reddit access token...");
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      console.error("Failed to obtain Reddit access token:", tokenData);
      throw new Error('Failed to obtain Reddit access token');
    }

    console.log("Successfully obtained Reddit access token");
    
    // Define simpler themes for more focused searches
    const themes = [
      {
        theme: "Technical Challenges",
        query: "error OR bug OR debugging",
        description: "Common technical challenges and debugging issues developers face.",
        category: "Pain Points",
        color: "bg-red-100",
        posts: [],
      },
      {
        theme: "Product Market Fit",
        query: "product market fit OR validation",
        description: "Stories of achieving product-market fit and validation.",
        category: "Success Stories",
        color: "bg-green-100",
        posts: [],
      },
      {
        theme: "Development Tools",
        query: "development tools OR programming tools",
        description: "Popular development tools and utilities being discussed.",
        category: "Tool Mentions",
        color: "bg-orange-100",
        posts: [],
      },
      {
        theme: "AI Integration",
        query: "AI OR artificial intelligence OR ChatGPT",
        description: "Trends in AI integration and implementation.",
        category: "Emerging Trends",
        color: "bg-purple-100",
        posts: [],
      },
      {
        theme: "Revenue Growth",
        query: "revenue OR profit OR growth",
        description: "Success stories about revenue growth and profitability.",
        category: "Success Stories",
        color: "bg-green-100",
        posts: [],
      }
    ];

    // Define a global set to track all posts
    const allPosts = new Set();
    const subredditsSet = new Set();
    
    // Loop through each theme and fetch relevant posts
    for (const theme of themes) {
      let themeQuery = search || theme.query;
      console.log(`Fetching posts for theme: ${theme.theme} with query: ${themeQuery}`);
      
      // Try with each subreddit
      for (const subreddit of targetSubreddits) {
        try {
          const searchUrl = `https://oauth.reddit.com/r/${subreddit}/search?q=${encodeURIComponent(themeQuery)}&restrict_sr=on&limit=5&sort=relevance&t=month`;
          console.log(`Fetching from ${subreddit} with URL: ${searchUrl}`);
          
          const response = await fetch(searchUrl, {
            headers: {
              'Authorization': `Bearer ${tokenData.access_token}`,
              'User-Agent': 'RedditInsights/1.0.0'
            }
          });
          
          if (!response.ok) {
            console.error(`Error fetching from r/${subreddit}: ${response.status} ${response.statusText}`);
            continue;
          }
          
          const data = await response.json();
          const posts = data?.data?.children || [];
          
          if (posts.length > 0) {
            console.log(`Found ${posts.length} posts in r/${subreddit} for theme "${theme.theme}"`);
            
            // Add posts to the theme
            posts.forEach(post => {
              const postData = post.data;
              if (!allPosts.has(postData.id)) {
                theme.posts.push({
                  id: postData.id,
                  title: postData.title,
                  selftext: postData.selftext?.substring(0, 300) || "",
                  num_comments: postData.num_comments,
                  subreddit: postData.subreddit,
                  created_utc: postData.created_utc,
                  url: `https://reddit.com${postData.permalink}`
                });
                allPosts.add(postData.id);
                subredditsSet.add(postData.subreddit);
              }
            });
          } else {
            console.log(`No posts found in r/${subreddit} for theme "${theme.theme}"`);
          }
        } catch (error) {
          console.error(`Error with subreddit ${subreddit} for theme ${theme.theme}:`, error);
        }
      }
    }

    // If no theme has any posts, try a more general approach as fallback
    if (Array.from(allPosts).length === 0) {
      console.log("No themed posts found, fetching general posts as fallback");
      
      // Try to fetch any recent popular posts from these subreddits
      for (const subreddit of targetSubreddits) {
        try {
          const generalUrl = `https://oauth.reddit.com/r/${subreddit}/hot?limit=3`;
          console.log(`Fetching general posts from ${subreddit}`);
          
          const response = await fetch(generalUrl, {
            headers: {
              'Authorization': `Bearer ${tokenData.access_token}`,
              'User-Agent': 'RedditInsights/1.0.0'
            }
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          const posts = data?.data?.children || [];
          
          if (posts.length > 0) {
            // Create a general theme
            if (!themes.find(t => t.theme === "General Discussion")) {
              themes.push({
                theme: "General Discussion",
                query: "general",
                description: "Recent popular discussions from entrepreneur communities.",
                category: "General",
                color: "bg-blue-100",
                posts: []
              });
            }
            
            const generalTheme = themes.find(t => t.theme === "General Discussion");
            
            // Add posts to the general theme
            posts.forEach(post => {
              const postData = post.data;
              if (!allPosts.has(postData.id)) {
                generalTheme.posts.push({
                  id: postData.id,
                  title: postData.title,
                  selftext: postData.selftext?.substring(0, 300) || "",
                  num_comments: postData.num_comments,
                  subreddit: postData.subreddit,
                  created_utc: postData.created_utc,
                  url: `https://reddit.com${postData.permalink}`
                });
                allPosts.add(postData.id);
                subredditsSet.add(postData.subreddit);
              }
            });
          }
        } catch (error) {
          console.error(`Error with fallback for subreddit ${subreddit}:`, error);
        }
      }
    }

    // Process themes for output
    const themeResults = themes.map(theme => {
      if (theme.posts.length === 0) return null;
      
      const latestPostDate = Math.max(...theme.posts.map(p => p.created_utc * 1000));
      const daysAgo = Math.round((Date.now() - latestPostDate) / 86400000);
      
      return {
        theme: theme.theme,
        description: theme.description,
        posts: theme.posts.length,
        insights: theme.posts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
        subreddits: new Set(theme.posts.map(p => p.subreddit)).size,
        daysAgo,
        created: `${daysAgo} days ago`,
        category: theme.category,
        color: theme.color,
        relatedPosts: theme.posts.slice(0, 5) // Limit to 5 posts per theme
      };
    }).filter(Boolean);

    console.log(`Returning ${themeResults.length} themes with posts`);
    
    if (themeResults.length === 0) {
      console.log("WARNING: No themes with posts found!");
    }

    return new Response(JSON.stringify({
      themes: themeResults,
      meta: {
        totalPosts: allPosts.size,
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
      message: err.message,
      stack: err.stack
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
