import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Clock, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Tag,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define notification types
export type NotificationCategory = 'milestone' | 'coaching' | 'feature' | 'offer' | 'payment' | 'plan';
export type NotificationPriority = 'urgent' | 'normal' | 'positive';

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  ctaText?: string;
  ctaAction?: () => void;
  ctaLink?: string;
  read: boolean;
  timestamp: Date;
}

// Mock notifications data (in production this would come from a database)
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Revenue Milestone Reached!',
    message: 'Congratulations! Your startup has reached the $10K milestone.',
    category: 'milestone',
    priority: 'positive',
    ctaText: 'View Details',
    ctaLink: '/analytics',
    read: false,
    timestamp: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: '2',
    title: 'Upcoming Coaching Call',
    message: 'Don\'t forget your strategy coaching call tomorrow at 2 PM.',
    category: 'coaching',
    priority: 'normal',
    ctaText: 'Add to Calendar',
    read: false,
    timestamp: new Date(Date.now() - 172800000) // 2 days ago
  },
  {
    id: '3',
    title: 'New AI Assistant Feature',
    message: 'Try our new AI market analysis tool, now available in your dashboard!',
    category: 'feature',
    priority: 'normal',
    ctaText: 'Try It Now',
    ctaLink: '/dashboard',
    read: true,
    timestamp: new Date(Date.now() - 432000000) // 5 days ago
  },
  {
    id: '4',
    title: 'Flash Sale - 50% off Premium',
    message: 'Limited time offer! Upgrade to Premium at half price for the next 48 hours.',
    category: 'offer',
    priority: 'urgent',
    ctaText: 'Upgrade Now',
    ctaLink: '/home#pricing',
    read: false,
    timestamp: new Date(Date.now() - 43200000) // 12 hours ago
  },
  {
    id: '5',
    title: 'Payment Processed',
    message: 'Your monthly subscription payment was successfully processed.',
    category: 'payment',
    priority: 'positive',
    read: true,
    timestamp: new Date(Date.now() - 604800000) // 7 days ago
  }
];

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.ctaAction) {
      notification.ctaAction();
    }
    setOpen(false);
  };
  
  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'milestone': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'coaching': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'feature': return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'offer': return <Tag className="h-4 w-4 text-amber-500" />;
      case 'payment': 
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'plan': 
        return <ArrowUp className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  const getPriorityClass = (priority: NotificationPriority) => {
    switch (priority) {
      case 'urgent': return "border-l-4 border-red-500";
      case 'positive': return "border-l-4 border-green-500";
      default: return "border-l-4 border-blue-500";
    }
  };
  
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white border-0">
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[70vh] overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <DropdownMenuLabel className="text-lg font-semibold p-0">Notifications</DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead} 
                className="text-xs h-auto py-1"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div>
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer ${getPriorityClass(notification.priority)} ${!notification.read ? "bg-blue-50/50 dark:bg-blue-900/20" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getCategoryIcon(notification.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${!notification.read ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    {notification.ctaText && (
                      <Button 
                        size="sm" 
                        variant={notification.priority === 'urgent' ? 'destructive' : notification.priority === 'positive' ? 'outline' : 'secondary'}
                        className="mt-2 h-7 text-xs"
                      >
                        {notification.ctaText}
                      </Button>
                    )}
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
                      {formatTimeAgo(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild className="cursor-pointer">
              <div className="flex justify-center w-full p-2">
                <Link to="/settings" className="text-xs text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setOpen(false)}>
                  Notification Settings
                </Link>
              </div>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
