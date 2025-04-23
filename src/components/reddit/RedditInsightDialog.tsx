
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Users, Calendar, ArrowRight } from "lucide-react";

interface RedditPost {
  title: string;
  selftext: string;
  num_comments: number;
  subreddit: string;
  created_utc: number;
  url: string;
}

interface RedditInsightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: {
    theme: string;
    description: string;
    posts: number;
    insights: number;
    subreddits: number;
    daysAgo: number|string;
    created: string;
    category: string;
    relatedPosts?: RedditPost[];
  };
}

const RedditInsightDialog: React.FC<RedditInsightDialogProps> = ({
  open,
  onOpenChange,
  theme,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{theme.theme}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <MessageSquare className="h-5 w-5 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Total Posts</p>
              <p className="text-2xl font-bold">{theme.posts}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <Users className="h-5 w-5 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Communities</p>
              <p className="text-2xl font-bold">{theme.subreddits}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <MessageSquare className="h-5 w-5 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Total Insights</p>
              <p className="text-2xl font-bold">{theme.insights}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">Last Activity</p>
              <p className="text-2xl font-bold">{theme.daysAgo} days ago</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Related Discussions</h3>
            {theme.relatedPosts?.map((post, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <a 
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-medium group-hover:text-blue-600 transition-colors">{post.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      r/{post.subreddit} • {post.num_comments} comments
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedditInsightDialog;
