
import { LucideIcon, User, Coffee, Zap, Star, Heart, Music, Camera, PenTool, Leaf, Smile } from 'lucide-react';

// Array of available icons
export const avatarIcons: LucideIcon[] = [
  User, Coffee, Zap, Star, Heart, Music, Camera, PenTool, Leaf, Smile
];

/**
 * Returns a random icon from the avatarIcons array
 * Uses user's email as a consistent seed for the random selection
 */
export const getRandomAvatarIcon = (email: string): LucideIcon => {
  // Simple hash function to get a numeric value from email
  const emailHash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Use the hash to get a consistent index
  const iconIndex = emailHash % avatarIcons.length;
  
  return avatarIcons[iconIndex];
};
