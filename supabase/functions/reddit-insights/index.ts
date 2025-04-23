
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

    const themeSearches = {
      "Technical Challenges": "error OR bug OR debugging OR (technical AND challenge) OR (developer AND problem)",
      "Development Bottlenecks": "performance OR optimization OR bottleneck OR scaling OR slow",
      "Revenue Milestones": "revenue OR MRR OR ARR OR (revenue AND milestone) OR (revenue AND growth)",
      "Product Market Fit": "product market fit OR PMF OR validation OR (product AND validation)",
      "Scaling Goals": "scaling OR growth strategy OR expansion OR (growth AND goals)",
      "Market Expansion": "market expansion OR new market OR international expansion",
      "AI Integration": "AI integration OR machine learning OR GPT OR AI implementation",
      "Web3 Development": "web3 OR blockchain OR crypto OR NFT OR decentralized",
      "Development Tools": "development tool OR IDE OR editor OR plugin OR extension",
      "Testing Tools": "testing framework OR jest OR cypress OR selenium OR (test AND automation)"
    };

    let query = search || Object.values(themeSearches).join(" OR ");

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

    let posts = [];
    let subredditsSet = new Set();

    for (const subreddit of targetSubreddits) {
      const subredditQuery = `${query} subreddit:${subreddit}`;
      const encodedQuery = encodeURIComponent(subredditQuery);
      const url = `https://oauth.reddit.com/search?limit=25&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;

      const resp = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${tokenData.access_token}`,
          "User-Agent": "RedditInsights/1.0.0"
        }
      });

      if (!resp.ok) {
        console.error(`Error for subreddit ${subreddit}:`, resp.statusText);
        continue;
      }

      const data = await resp.json();
      const subredditPosts = data?.data?.children?.map((x) => x.data) || [];
      posts.push(...subredditPosts);
      subredditPosts.forEach(post => subredditsSet.add(post.subreddit));
    }

    const themeDescriptors = [
      {
        key: "Technical Challenges",
        keywords: ["error", "bug", "debugging", "technical challenge", "developer problem"],
        description: "Common technical challenges and debugging issues developers face.",
        category: "Pain Points",
        color: "bg-red-100"
      },
      {
        key: "Development Bottlenecks",
        keywords: ["performance", "optimization", "bottleneck", "scaling", "slow"],
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

    const themes = themeDescriptors.map(theme => {
      const filteredPosts = posts.filter(post =>
        theme.keywords.some(kw =>
          (post.title?.toLowerCase() || "").includes(kw.toLowerCase()) ||
          (post.selftext?.toLowerCase() || "").includes(kw.toLowerCase())
        )
      );
      if (filteredPosts.length === 0) return null;

      const latestPostDate = Math.max(...filteredPosts.map(p => p.created_utc * 1000));
      const daysAgo = Math.round((Date.now() - latestPostDate) / 86400000);

      return {
        theme: theme.key,
        description: theme.description,
        posts: filteredPosts.length,
        insights: filteredPosts.reduce((acc, post) => acc + (post.num_comments || 0), 0),
        subreddits: new Set(filteredPosts.map(p => p.subreddit)).size,
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
    }).filter(Boolean);

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
