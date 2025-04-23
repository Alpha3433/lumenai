
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
    const url = `https://oauth.reddit.com/search?limit=50&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;

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

    // Expanded theme extraction with more categories and better descriptions
    const themeDescriptors = [
      {
        key: "Product Development and Launch Success",
        keywords: ["launched", "launch", "success", "growth", "product released", "milestone"],
        description:
          "Success stories around product development, launches, and achieving significant milestones.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Pricing & Revenue Discussions",
        keywords: ["pricing", "revenue", "plan", "subscription", "SaaS", "one-time payment", "trial", "ARR"],
        description:
          "How founders discuss pricing strategies, SaaS vs. one-time models, and revenue experiments.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Customer Pain Points Solved",
        keywords: ["pain point", "solved", "problem", "customer", "user feedback", "struggle"],
        description:
          "Threads that highlight actual customer pain points being solved with real examples.",
        category: "Pain Points",
        color: "bg-yellow-100"
      },
      {
        key: "Repeat Purchases & Organic Engagement",
        keywords: ["repeat", "purchase", "retention", "organic", "engagement", "usage"],
        description:
          "Users discussing repeat purchases or organic/viral engagement—signals of product market fit.",
        category: "Emerging Trends",
        color: "bg-purple-100"
      },
      {
        key: "Marketing & Messaging",
        keywords: ["marketing", "messaging", "branding", "positioning", "campaign"],
        description:
          "Strategies for effective marketing, messaging, and branding.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Startup Team/Co-founder Journeys",
        keywords: ["cofounder", "team", "partner", "joined", "hired", "fired", "bootstrapped"],
        description:
          "Personal growth, team building, and founder journeys including challenges and wins.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      // Added new themes
      {
        key: "Common Advice Given to Founders",
        keywords: ["advice", "recommend", "suggestion", "tip", "avoid", "recommend", "start with"],
        description: 
          "Common advice and recommendations shared with founders and startup creators.",
        category: "Common Advice Given",
        color: "bg-amber-100"
      },
      {
        key: "Customer Acquisition Strategies",
        keywords: ["acquisition", "CAC", "customer acquisition", "lead gen", "funnel", "conversion", "onboarding"],
        description: 
          "Strategies and tactics for acquiring new customers and optimizing acquisition costs.",
        category: "Pain Points",
        color: "bg-yellow-100"
      },
      {
        key: "Product Market Fit Stories",
        keywords: ["PMF", "product market fit", "found traction", "market validation", "breakthrough"],
        description: 
          "Stories and indicators of achieving product market fit and market validation.",
        category: "Success Stories",
        color: "bg-green-100"
      },
      {
        key: "Funding & Investment Discussions",
        keywords: ["funding", "investor", "angel", "VC", "pitch", "deck", "valuation", "bootstrap"],
        description: 
          "Discussions around funding options, investor relations, and capital raising strategies.",
        category: "Aspirations & Goals",
        color: "bg-blue-100"
      },
      {
        key: "Tools & Software Recommendations",
        keywords: ["tool", "software", "platform", "recommend", "using", "switched to", "tech stack"],
        description: 
          "Tools, software platforms, and technology stack recommendations for startups.",
        category: "Tool Mentions",
        color: "bg-indigo-100"
      },
      {
        key: "AI & Automation Implementation",
        keywords: ["AI", "GPT", "automation", "automate", "machine learning", "workflow", "API"],
        description: 
          "Implementations and use cases of AI, automation, and emerging technologies.",
        category: "Emerging Trends",
        color: "bg-purple-100"
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
      
      return {
        theme: theme.key,
        description: theme.description,
        posts: filteredPosts.length,
        insights: filteredPosts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
        subreddits: new Set(filteredPosts.map((p: any) => p.subreddit)).size,
        daysAgo: filteredPosts.length > 0
          ? Math.round(
              (Date.now() - (Math.min(...filteredPosts.map((p: any) => (p.created_utc * 1000)))))/86400000
            ) : "-",
        created: filteredPosts.length > 0
          ? `${Math.round(
              (Date.now() - Math.max(...filteredPosts.map((p: any) => (p.created_utc * 1000))))/86400000
            )} days ago` : "-",
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
