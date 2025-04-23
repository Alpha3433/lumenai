
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

  const { search = "" } = req.method === "POST" ? await req.json().catch(() => ({})) : {};

  // Get API key from Supabase secret
  const redditApiKey = Deno.env.get("Reddit_Key");
  if (!redditApiKey) {
    return new Response(JSON.stringify({ error: "Reddit API Key missing." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const query = search ? encodeURIComponent(search) : "startup OR SaaS OR pricing OR founders OR repeat+purchase OR product+market+fit";
  // We'll use Reddit's search API with some sensible defaults to get insightful discussions
  const url = `https://oauth.reddit.com/search?limit=30&q=${query}&restrict_sr=false&sort=relevance&t=month`;

  // Obtain an OAuth access token to call the Reddit API (script application flow)
  let accessToken = "";
  try {
    // This requires a userless script app. In real world, you use client_id/secret.
    // For now, let's assume the Reddit API key is directly usable as a bearer (per your earlier usage pattern).
    accessToken = redditApiKey; // If you have client_id/client_secret, you'd do a proper OAuth2 call.
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unable to obtain Reddit access token." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Fetch Reddit posts
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "User-Agent": "RedditInsights/1.0.0 by LovableApp",
  };

  let posts = [];
  let subredditsSet = new Set<string>();

  try {
    const resp = await fetch(url, { headers });
    if (!resp.ok) {
      throw new Error("Reddit API request failed: " + resp.statusText);
    }
    const data = await resp.json();
    posts = data?.data?.children?.map((x: any) => x.data) || [];
    // Collect subreddit names for interest stats
    posts.forEach((post: any) => subredditsSet.add(post.subreddit));
  } catch (err) {
    console.error("Reddit API error:", err);
    return new Response(JSON.stringify({ error: "Could not fetch from Reddit." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Theme extraction (naive approach to group by keywords in title/selftext)
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
    }
  ];

  // Group posts into themes by looking for keywords
  const themes = themeDescriptors.map(theme => {
    const filteredPosts = posts.filter(post =>
      theme.keywords.some(kw =>
        (post.title?.toLowerCase() || "").includes(kw.toLowerCase()) ||
        (post.selftext?.toLowerCase() || "").includes(kw.toLowerCase())
      )
    );
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
  }).filter(t => t.posts > 0);

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

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
