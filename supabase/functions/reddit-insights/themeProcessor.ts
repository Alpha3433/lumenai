
import { ThemeDescriptor, RedditPost, ProcessedTheme } from "./types.ts";

export function processThemes(
  posts: RedditPost[], 
  themeDescriptors: ThemeDescriptor[]
): ProcessedTheme[] {
  return themeDescriptors.map(theme => {
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
  }).filter(Boolean) as ProcessedTheme[];
}
