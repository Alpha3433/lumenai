// Supabase Edge Function: reddit-insights/index.ts
// This function calls the Reddit API securely, using the secret key set in Supabase,
// and returns grouped themes for the frontend.

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

    // Get API key from Supabase secret
    const redditApiKey = Deno.env.get("REDDIT_KEY");
    
    console.log("Checking for Reddit API key:", redditApiKey ? "Key found" : "Key NOT found");
    
    if (!redditApiKey) {
      return new Response(JSON.stringify({ 
        error: "Reddit API Key missing.", 
        message: "Please set the REDDIT_KEY secret in your Supabase project." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build the search query - if search is provided use it, otherwise use default query
    let query = search ? search : "startup OR SaaS OR pricing OR founders OR repeat+purchase OR product+market+fit";
    if (search && !search.includes('OR') && !search.includes('AND')) {
      // If it's a simple search term, make it more flexible for better results
      query = `${search} OR "${search}" OR ${search}+tips OR ${search}+strategy`;
    }
    
    console.log("Search query:", query);
    
    // Use Reddit's search API with sensible defaults to get insightful discussions
    const encodedQuery = encodeURIComponent(query);
    const url = `https://oauth.reddit.com/search?limit=30&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;

    // Use the Reddit API key as bearer token
    const accessToken = redditApiKey;

    // Fetch Reddit posts
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "User-Agent": "RedditInsights/1.0.0 by LovableApp",
    };

    console.log("Sending request to Reddit API");
    
    let posts = [];
    let subredditsSet = new Set<string>();

    // Fetch data from Reddit API
    const resp = await fetch(url, { headers });
    if (!resp.ok) {
      console.error("Reddit API error:", resp.status, resp.statusText);
      const errorText = await resp.text();
      console.error("Error details:", errorText);
      throw new Error(`Reddit API request failed: ${resp.status} ${resp.statusText}`);
    }
    
    const data = await resp.json();
    posts = data?.data?.children?.map((x: any) => x.data) || [];
    
    console.log(`Found ${posts.length} posts for query: "${query}"`);
    
    // Collect subreddit names for interest stats
    posts.forEach((post: any) => subredditsSet.add(post.subreddit));

    // Enhanced theme descriptors with more categories
    const themeDescriptors = [
      {
        key: "Common Development Problems",
        keywords: ["error", "bug", "issue", "problem", "stuck", "help needed", "debugging"],
        description: "Frequently discussed technical challenges and debugging issues developers face.",
        category: "Pain Points",
        color: "bg-yellow-100"
      },
      {
        key: "Architecture Decisions",
        keywords: ["architecture", "microservices", "monolith", "database", "infrastructure", "stack"],
        description: "Discussions around architectural choices and their implications.",
        category: "Pain Points",
        color: "bg-yellow-100"
      },
      {
        key: "Product Market Fit Success",
        keywords: ["product market fit", "PMF", "success story", "milestone", "growth"],
        description: "Stories of achieving product-market fit and significant growth milestones.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Revenue Milestones",
        keywords: ["revenue", "MRR", "ARR", "milestone", "profitable", "bootstrap"],
        description: "Success stories about reaching revenue milestones and profitability.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Technical Stack Choices",
        keywords: ["tech stack", "framework", "language", "database", "infrastructure"],
        description: "Popular technology stack choices and their implementation outcomes.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Learning Resources",
        keywords: ["tutorial", "guide", "resource", "learning", "documentation", "course"],
        description: "Recommended learning resources and educational content.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Scaling Challenges",
        keywords: ["scale", "scaling", "growth", "performance", "optimization"],
        description: "Discussions about scaling applications and handling growth.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "AI Integration Trends",
        keywords: ["AI", "machine learning", "ML", "artificial intelligence", "GPT", "LLM"],
        description: "Emerging trends in AI integration and implementation.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Cloud Native Patterns",
        keywords: ["kubernetes", "docker", "cloud", "serverless", "containers"],
        description: "Trends in cloud-native development and deployment.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Development Tools",
        keywords: ["IDE", "editor", "tool", "plugin", "extension", "utility"],
        description: "Popular development tools and utilities being discussed.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "CI/CD Tools",
        keywords: ["CI", "CD", "pipeline", "automation", "deployment", "github actions", "jenkins"],
        description: "Tools and practices for continuous integration and deployment.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Testing Tools",
        keywords: ["testing", "test", "jest", "cypress", "selenium", "playwright"],
        description: "Tools and frameworks for testing applications.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      }
    ];

    // Add search-specific themes when user is searching
    if (search) {
      themeDescriptors.push({
        key: `${search.charAt(0).toUpperCase() + search.slice(1)} Insights`,
        keywords: [search.toLowerCase()],
        description: `Posts specifically discussing "${search}" related topics and strategies.`,
        category: "Search Results",
        color: "bg-orange-100"
      });
      
      // Add variations of the search term
      const searchWords = search.toLowerCase().split(' ');
      if (searchWords.length > 1) {
        for (const word of searchWords) {
          if (word.length > 3) { // Only use meaningful words
            themeDescriptors.push({
              key: `${word.charAt(0).toUpperCase() + word.slice(1)} Discussions`,
              keywords: [word],
              description: `Discussions related to "${word}" within the searched topics.`,
              category: "Search Results",
              color: "bg-orange-100"
            });
          }
        }
      }
    }

    // Group posts into themes by looking for keywords
    const themes = themeDescriptors.map(theme => {
      const filteredPosts = posts.filter(post =>
        theme.keywords.some(kw =>
          (post.title?.toLowerCase() || "").includes(kw.toLowerCase()) ||
          (post.selftext?.toLowerCase() || "").includes(kw.toLowerCase())
        )
      );
      
      if (filteredPosts.length === 0) {
        return null;
      }

      const latestPostDate = Math.max(...filteredPosts.map((p: any) => p.created_utc * 1000));
      const daysAgo = Math.round((Date.now() - latestPostDate) / 86400000);
      
      return {
        theme: theme.key,
        description: theme.description,
        posts: filteredPosts.length,
        insights: filteredPosts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
        subreddits: new Set(filteredPosts.map((p: any) => p.subreddit)).size,
        daysAgo,
        created: `${daysAgo} days ago`,
        category: theme.category,
        color: theme.color
      };
    }).filter(t => t !== null);

    // Include stats for context
    const totalPosts = posts.length;
    const totalSubreddits = subredditsSet.size;

    const result = {
      summary: {
        totalPosts,
        totalSubreddits,
        searchedFor: search,
      },
      themes
    };

    console.log(`Returning ${themes.length} themes`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error processing request:", err);
    return new Response(JSON.stringify({ 
      error: "Could not fetch from Reddit.",
      message: err.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
