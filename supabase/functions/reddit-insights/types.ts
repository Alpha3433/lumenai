
// Types for the Reddit API responses and theme data
export type RedditPost = {
  title: string;
  selftext: string;
  num_comments: number;
  subreddit: string;
  created_utc: number;
  permalink: string;
};

export type ThemeDescriptor = {
  key: string;
  keywords: string[];
  description: string;
  category: string;
  color: string;
};

export type ProcessedTheme = {
  theme: string;
  description: string;
  posts: number;
  insights: number;
  subreddits: number;
  daysAgo: number;
  created: string;
  category: string;
  color: string;
  relatedPosts: Array<{
    title: string;
    selftext: string;
    num_comments: number;
    subreddit: string;
    created_utc: number;
    url: string;
  }>;
};
