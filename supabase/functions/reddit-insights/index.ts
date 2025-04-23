
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

    // Get Reddit client ID and secret from Supabase secrets
    const clientId = Deno.env.get("REDDIT_CLIENT_ID");
    const clientSecret = Deno.env.get("REDDIT_CLIENT_SECRET");
    
    console.log("Checking Reddit API credentials:", clientId ? "ID found" : "ID missing", clientSecret ? "Secret found" : "Secret missing");
    
    if (!clientId || !clientSecret) {
      return new Response(JSON.stringify({ 
        error: "Reddit API credentials missing.", 
        message: "Please set the REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in your Supabase project." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Define target subreddits
    const targetSubreddits = [
      'Entrepreneurship',
      'SideProject',
      'SaaS',
      'smallbusiness',
      'startups',
      'indiehackers',
      'EntrepreneurRideAlong',
      'business',
      'startup',
      'ycombinator',
      'growmybusiness',
      'Entrepreneurs',
      'advancedentrepreneur'
    ];

    // Build the search query - if search is provided use it, otherwise use default query
    let query = search ? search : "startup OR SaaS OR pricing OR founders OR repeat+purchase OR product+market+fit";
    if (search && !search.includes('OR') && !search.includes('AND')) {
      query = `${search} OR "${search}" OR ${search}+tips OR ${search}+strategy`;
    }
    
    // Add subreddit restriction to the query
    const subredditQuery = targetSubreddits.map(sub => `subreddit:${sub}`).join(' OR ');
    query = `(${query}) AND (${subredditQuery})`;
    
    console.log("Search query:", query);
    
    // First, get an access token using client credentials
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
      throw new Error('Failed to obtain Reddit access token');
    }

    // Use Reddit's search API
    const encodedQuery = encodeURIComponent(query);
    const url = `https://oauth.reddit.com/search?limit=100&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;

    console.log("Sending request to Reddit API");
    
    let posts = [];
    let subredditsSet = new Set<string>();

    // Fetch data from Reddit API
    const resp = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${tokenData.access_token}`,
        "User-Agent": "RedditInsights/1.0.0"
      }
    });

    if (!resp.ok) {
      console.error("Reddit API error:", resp.status, resp.statusText);
      const errorText = await resp.text();
      console.error("Error details:", errorText);
      throw new Error(`Reddit API request failed: ${resp.status} ${resp.statusText}`);
    }
    
    const data = await resp.json();
    posts = data?.data?.children?.map((x: any) => x.data) || [];
    
    console.log(`Found ${posts.length} posts for query: "${query}"`);
    posts.forEach((post: any) => subredditsSet.add(post.subreddit));

    // Enhanced theme descriptors with more categories
    const themeDescriptors = [
      {
        key: "Technical Challenges",
        keywords: ["error", "bug", "issue", "problem", "stuck", "help", "debugging"],
        description: "Common technical challenges and debugging issues developers face.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Development Bottlenecks",
        keywords: ["slow", "performance", "optimization", "bottleneck", "scaling"],
        description: "Performance issues and optimization challenges in development.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Revenue Milestones",
        keywords: ["revenue", "profit", "MRR", "ARR", "growth", "milestone"],
        description: "Success stories about reaching significant revenue milestones.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Product Market Fit",
        keywords: ["product market fit", "PMF", "validation", "success story"],
        description: "Stories of achieving product-market fit and validation.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Scaling Goals",
        keywords: ["scale", "growth plan", "expansion", "goals", "target"],
        description: "Discussions about scaling strategies and growth targets.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Market Expansion",
        keywords: ["market expansion", "new market", "international", "growth strategy"],
        description: "Plans and strategies for entering new markets.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "AI Integration",
        keywords: ["AI", "machine learning", "ML", "artificial intelligence", "GPT"],
        description: "Trends in AI integration and implementation.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Web3 Development",
        keywords: ["web3", "blockchain", "crypto", "NFT", "decentralized"],
        description: "Emerging trends in Web3 and blockchain development.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Development Tools",
        keywords: ["IDE", "editor", "tool", "plugin", "extension"],
        description: "Popular development tools and utilities being discussed.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Testing Tools",
        keywords: ["testing", "test", "jest", "cypress", "selenium"],
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
        description: `Posts specifically discussing "${search}" related topics.`,
        category: "Search Results",
        color: "bg-yellow-100"
      });
    }

    // Group posts into themes
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
        color: theme.color,
        relatedPosts: filteredPosts.slice(0, 5).map(post => ({
          title: post.title,
          selftext: post.selftext,
          num_comments: post.num_comments,
          subreddit: post.subreddit,
          created_utc: post.created_utc,
          url: `https://reddit.com${post.permalink}`
        }))
      };
    }).filter(t => t !== null);

    console.log(`Returning ${themes.length} themes`);

    return new Response(JSON.stringify({
      themes,
      meta: {
        totalPosts: posts.length,
        uniqueSubreddits: subredditsSet.size,
        searchQuery: search || 'default'
      }
    }), {
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

