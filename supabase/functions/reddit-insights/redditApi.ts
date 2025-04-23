
export async function getRedditToken(clientId: string, clientSecret: string): Promise<string> {
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

  return tokenData.access_token;
}

export async function fetchSubredditPosts(
  subreddit: string, 
  query: string, 
  accessToken: string
): Promise<any[]> {
  const subredditQuery = `${query} subreddit:${subreddit}`;
  const encodedQuery = encodeURIComponent(subredditQuery);
  const url = `https://oauth.reddit.com/search?limit=5&q=${encodedQuery}&restrict_sr=false&sort=relevance&t=month`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "User-Agent": "RedditInsights/1.0.0"
    }
  });

  if (!response.ok) {
    console.error(`Error fetching from r/${subreddit}:`, response.status, response.statusText);
    return [];
  }

  const data = await response.json();
  return data?.data?.children?.map((x: any) => x.data) || [];
}
