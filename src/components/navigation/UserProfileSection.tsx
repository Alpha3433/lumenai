
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/AuthProvider';

interface UserProfileSectionProps {
  onClose?: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ onClose }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-2 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-8 h-8 flex items-center justify-center font-medium text-gray-700 dark:text-gray-300">
        {user.email?.substring(0, 2).toUpperCase() || 'JD'}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
          <Badge variant="outline" className="px-2 py-0 text-[10px] bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
            Free Plan
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
