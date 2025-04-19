
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
          <Bell className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <DropdownMenuLabel className="text-lg font-semibold p-0">
            Notifications
          </DropdownMenuLabel>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-4 text-center text-muted-foreground">
          No notifications
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild className="cursor-pointer">
          <div className="flex justify-center w-full p-2">
            <Link to="/settings" className="text-xs text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setOpen(false)}>
              Notification Settings
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
