
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

    const targetSubreddits = [
      'Entrepreneurship', 'SideProject', 'SaaS', 'smallbusiness',
      'startups', 'indiehackers', 'EntrepreneurRideAlong', 'business',
      'startup', 'ycombinator', 'growmybusiness', 'Entrepreneurs', 'advancedentrepreneur'
    ];

    // Get token
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

    // Define theme descriptors with search queries
    const themeDescriptors = [
      {
        key: "Technical Challenges",
        keywords: ["error", "bug", "debugging", "technical challenge", "developer problem"],
        searchQuery: "error OR bug OR debugging OR technical challenge OR developer problem",
        description: "Common technical challenges and debugging issues developers face.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Development Bottlenecks",
        keywords: ["performance", "optimization", "bottleneck", "scaling", "slow"],
        searchQuery: "performance OR optimization OR bottleneck OR scaling OR slow",
        description: "Performance issues and optimization challenges in development.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Revenue Milestones",
        keywords: ["revenue", "profit", "MRR", "ARR", "growth", "milestone"],
        searchQuery: "revenue OR profit OR MRR OR ARR OR milestone",
        description: "Success stories about reaching significant revenue milestones.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Product Market Fit",
        keywords: ["product market fit", "PMF", "validation", "success story"],
        searchQuery: "product market fit OR PMF OR validation",
        description: "Stories of achieving product-market fit and validation.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Scaling Goals",
        keywords: ["scale", "growth plan", "expansion", "goals", "target"],
        searchQuery: "scaling OR growth strategy OR expansion OR growth goals",
        description: "Discussions about scaling strategies and growth targets.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Market Expansion",
        keywords: ["market expansion", "new market", "international", "growth strategy"],
        searchQuery: "market expansion OR new market OR international expansion",
        description: "Plans and strategies for entering new markets.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "AI Integration",
        keywords: ["AI", "machine learning", "ML", "artificial intelligence", "GPT"],
        searchQuery: "AI integration OR machine learning OR GPT OR AI implementation",
        description: "Trends in AI integration and implementation.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Web3 Development",
        keywords: ["web3", "blockchain", "crypto", "NFT", "decentralized"],
        searchQuery: "web3 OR blockchain OR crypto OR NFT OR decentralized",
        description: "Emerging trends in Web3 and blockchain development.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Development Tools",
        keywords: ["IDE", "editor", "tool", "plugin", "extension"],
        searchQuery: "development tool OR IDE OR editor OR plugin OR extension",
        description: "Popular development tools and utilities being discussed.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Testing Tools",
        keywords: ["testing", "test", "jest", "cypress", "selenium"],
        searchQuery: "testing framework OR jest OR cypress OR selenium OR test automation",
        description: "Tools and frameworks for testing applications.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      }
    ];

    // Final results
    let allPosts = [];
    let subredditsSet = new Set();
    const themes = [];

    // Process each theme individually
    for (const theme of themeDescriptors) {
      const posts = [];
      
      // Use the search query specific to this theme
      const baseQuery = search || theme.searchQuery;
      
      // Try to get data from each subreddit for this theme
      for (const subreddit of targetSubreddits) {
        console.log(`Fetching for theme "${theme.key}" in subreddit "r/${subreddit}"`);
        
        const subredditQuery = `${baseQuery} subreddit:${subreddit}`;
        const encodedQuery = encodeURIComponent(subredditQuery);
        const url = `https://oauth.reddit.com/search?limit=10&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;
        
        try {
          const resp = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${tokenData.access_token}`,
              "User-Agent": "RedditInsights/1.0.0"
            }
          });
          
          if (!resp.ok) {
            console.error(`Error for theme "${theme.key}" in subreddit "${subreddit}": ${resp.status} ${resp.statusText}`);
            continue;
          }
          
          const data = await resp.json();
          const subredditPosts = data?.data?.children?.map(x => x.data) || [];
          
          if (subredditPosts.length > 0) {
            posts.push(...subredditPosts);
            subredditPosts.forEach(post => subredditsSet.add(post.subreddit));
          }
        } catch (error) {
          console.error(`Failed fetching for theme "${theme.key}" in subreddit "${subreddit}":`, error.message);
        }
      }
      
      // Only add theme if we found posts
      if (posts.length > 0) {
        const latestPostDate = Math.max(...posts.map(p => p.created_utc * 1000));
        const daysAgo = Math.round((Date.now() - latestPostDate) / 86400000);
        
        themes.push({
          theme: theme.key,
          description: theme.description,
          posts: posts.length,
          insights: posts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
          subreddits: new Set(posts.map(p => p.subreddit)).size,
          daysAgo,
          created: `${daysAgo} days ago`,
          category: theme.category,
          color: theme.color,
          relatedPosts: posts.slice(0, 5).map(post => ({
            title: post.title,
            selftext: post.selftext,
            num_comments: post.num_comments,
            subreddit: post.subreddit,
            created_utc: post.created_utc,
            url: `https://reddit.com${post.permalink}`
          }))
        });
        
        allPosts.push(...posts);
      }
    }

    // If no themes were created, add a fallback theme
    if (themes.length === 0) {
      console.log("No themes found with posts, adding fallback theme");
      
      // Try to get some general posts from the listed subreddits
      const fallbackPosts = [];
      for (const subreddit of targetSubreddits.slice(0, 3)) { // Try just a few subreddits
        try {
          const url = `https://oauth.reddit.com/r/${subreddit}/hot?limit=5`;
          const resp = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${tokenData.access_token}`,
              "User-Agent": "RedditInsights/1.0.0"
            }
          });
          
          if (resp.ok) {
            const data = await resp.json();
            const posts = data?.data?.children?.map(x => x.data) || [];
            fallbackPosts.push(...posts);
            posts.forEach(post => subredditsSet.add(post.subreddit));
          }
        } catch (error) {
          console.error(`Failed fetching fallback posts for subreddit "${subreddit}":`, error.message);
        }
      }
      
      if (fallbackPosts.length > 0) {
        const latestPostDate = Math.max(...fallbackPosts.map(p => p.created_utc * 1000));
        const daysAgo = Math.round((Date.now() - latestPostDate) / 86400000);
        
        themes.push({
          theme: "Entrepreneurship Discussions",
          description: "General discussions about entrepreneurship and startups.",
          posts: fallbackPosts.length,
          insights: fallbackPosts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
          subreddits: new Set(fallbackPosts.map(p => p.subreddit)).size,
          daysAgo,
          created: `${daysAgo} days ago`,
          category: "General",
          color: "bg-blue-100",
          relatedPosts: fallbackPosts.map(post => ({
            title: post.title,
            selftext: post.selftext,
            num_comments: post.num_comments,
            subreddit: post.subreddit,
            created_utc: post.created_utc,
            url: `https://reddit.com${post.permalink}`
          }))
        });
        
        allPosts.push(...fallbackPosts);
      }
    }

    return new Response(JSON.stringify({
      themes,
      meta: {
        totalPosts: allPosts.length,
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
