
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

    // Build the search query - if search is provided use it, otherwise use default query
    let query = search ? search : "startup OR SaaS OR pricing OR founders OR repeat+purchase OR product+market+fit OR business+advice OR entrepreneurship OR small+business OR marketing+strategy OR customer+acquisition OR revenue+growth OR business+challenges OR startup+success OR business+tools";
    if (search && !search.includes('OR') && !search.includes('AND')) {
      query = `${search} OR "${search}" OR ${search}+tips OR ${search}+strategy`;
    }
    
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

    // Use Reddit's search API with a more reliable limit - reduced from 250 to 100
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

    // Enhanced theme descriptors with more categories and keywords
    const themeDescriptors = [
      {
        key: "Technical Implementation",
        keywords: ["implementation", "coding", "development", "tech stack", "architecture"],
        description: "Technical implementation challenges and solutions.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Customer Acquisition",
        keywords: ["customer acquisition", "CAC", "leads", "conversion", "sales funnel"],
        description: "Strategies and challenges in acquiring customers.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "User Retention",
        keywords: ["retention", "churn", "user engagement", "customer loyalty"],
        description: "Challenges and strategies for retaining users.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Funding Success",
        keywords: ["funding", "investment", "VC", "seed round", "angel"],
        description: "Success stories in securing funding and investment.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Market Validation",
        keywords: ["validation", "product market fit", "customer feedback", "beta testing"],
        description: "Achieving market validation and product-market fit.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Team Building",
        keywords: ["hiring", "team", "recruitment", "talent", "culture"],
        description: "Building and managing successful teams.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "International Expansion",
        keywords: ["international", "global", "expansion", "new markets"],
        description: "Plans for expanding into international markets.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Product Innovation",
        keywords: ["innovation", "new features", "product development", "R&D"],
        description: "Goals for product innovation and development.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Platform Growth",
        keywords: ["platform", "ecosystem", "marketplace", "network effects"],
        description: "Building and scaling platform businesses.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "AI Integration Trends",
        keywords: ["artificial intelligence", "machine learning", "AI", "automation"],
        description: "Trends in AI adoption and integration.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "No-Code Movement",
        keywords: ["no-code", "low-code", "citizen developer", "visual development"],
        description: "The rise of no-code and low-code development.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Remote Work Tools",
        keywords: ["remote work", "collaboration", "virtual teams", "distributed"],
        description: "Tools and practices for remote work.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Analytics Tools",
        keywords: ["analytics", "metrics", "tracking", "data analysis"],
        description: "Tools for tracking and analyzing business metrics.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Marketing Tools",
        keywords: ["marketing tools", "automation", "CRM", "email marketing"],
        description: "Popular marketing and automation tools.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Project Management",
        keywords: ["project management", "task tracking", "workflow", "productivity"],
        description: "Project management and productivity tools.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      {
        key: "Developer Tools",
        keywords: ["IDE", "git", "deployment", "DevOps", "testing tools"],
        description: "Popular development and DevOps tools.",
        category: "Tool Mentions",
        color: "bg-orange-100"
      },
      // Add more themes with varied keywords to increase match chances
      {
        key: "Revenue Models",
        keywords: ["revenue model", "monetization", "pricing strategy", "subscription", "freemium"],
        description: "Different approaches to monetizing products and services.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Startup Failures",
        keywords: ["failure", "mistake", "shutdown", "pivot", "lessons learned"],
        description: "Lessons from startup failures and pivots.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Content Marketing",
        keywords: ["content marketing", "blog", "SEO", "organic growth", "content strategy"],
        description: "Strategies for effective content marketing.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Community Building",
        keywords: ["community", "engagement", "forum", "discord", "slack community"],
        description: "Building and nurturing user communities.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "UX Design",
        keywords: ["user experience", "UX", "design", "usability", "interface"],
        description: "User experience design principles and practices.",
        category: "Pain Points",
        color: "bg-red-100"
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

    // If we don't find any themes, return a friendly error
    if (themes.length === 0) {
      return new Response(JSON.stringify({
        error: "No matching themes found",
        message: "No relevant discussions were found for your search criteria. Try broadening your search terms.",
        meta: {
          totalPosts: posts.length,
          uniqueSubreddits: subredditsSet.size,
          searchQuery: search || 'default'
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

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
