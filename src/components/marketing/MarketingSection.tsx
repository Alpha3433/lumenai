import React from 'react';
import { CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketingSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  checkColor?: string;
  description?: string;
}

function expandBulletPoint(point: string): string {
  if (point.length > 100) return point;
  
  // Enhanced pattern-based expansions with more natural flow
  if (point.toLowerCase().includes('aged') || point.toLowerCase().includes('demographic')) {
    return `Our core audience consists of health-conscious individuals aged 30-50, predominantly female professionals with middle-income backgrounds, seeking personalized wellness guidance and structured support for their health journey.`;
  }
  
  if (point.toLowerCase().includes('fitnessai is')) {
    return `FitnessAi is a personalized fitness app leveraging artificial intelligence to support and guide individuals on their wellness journey. The platform provides customized workout plans, nutrition guidance, and real-time feedback, making it an ideal companion for those seeking to improve their health and fitness levels.`;
  }
  
  if (point.toLowerCase().includes('unlike traditional')) {
    return `Unlike traditional fitness apps, FitnessAi offers tailored workout plans and nutrition guidance based on individual goals, fitness levels, and health conditions. The platform's AI-driven approach ensures each user receives a completely personalized experience that adapts and evolves with their progress.`;
  }
  
  if (point.toLowerCase().includes('empowers users')) {
    return `FitnessAi empowers users by combining advanced technology with empathetic support, helping them overcome barriers to fitness success. The platform's AI algorithms analyze user behavior, preferences, and progress to deliver motivational coaching, personalized recommendations, and adaptive workout plans that ensure sustainable results.`;
  }
  
  if (point.toLowerCase().includes('challenge')) {
    return `Organize a 30-day fitness challenge using the app, encouraging users to share their progress on social media platforms. This community-driven initiative includes daily check-ins, progress tracking, and rewards for milestone achievements, fostering a supportive environment for sustainable fitness habits.`;
  }
  
  if (point.toLowerCase().includes('trial')) {
    return `Provide a comprehensive 14-day free trial to new users, showcasing premium features including personalized AI coaching, custom meal plans, and advanced progress tracking. This trial period includes guided onboarding sessions and daily workout recommendations to maximize user engagement and demonstrate the platform's value.`;
  }
  
  if (point.toLowerCase().includes('online sessions')) {
    return `Host online sessions featuring fitness experts discussing weight loss strategies, using the app, and sharing success stories. These interactive webinars provide valuable insights, answer user questions, and demonstrate how FitnessAi's features can be integrated into various fitness routines.`;
  }
  
  if (point.toLowerCase().includes('collaborate')) {
    return `Collaborate with local gyms and healthcare providers to offer the app as a resource for their clients, including special partnership rates and integrated wellness programs. This partnership program extends to nutritionists and personal trainers, creating a comprehensive support network for users.`;
  }
  
  if (point.toLowerCase().includes('participation in events')) {
    return `Participation in health and wellness events allows for direct engagement, live app demonstrations, and personal interaction with potential users. These events provide opportunities to showcase success stories, offer exclusive sign-up incentives, and gather valuable feedback from the target audience.`;
  }
  
  if (point.toLowerCase().includes('new year')) {
    return `Offer strategic discounts and enhanced features during peak fitness seasons, such as New Year's resolutions or summer preparation periods. These targeted campaigns include special pricing, exclusive content, and additional support resources to maximize user acquisition during high-intent periods.`;
  }
  
  if (point.toLowerCase().includes('community fitness')) {
    return `Host local community fitness events to raise awareness and allow potential users to experience the app firsthand. These events combine group workouts, health workshops, and app demonstrations, creating an engaging environment that showcases the platform's capabilities while building a strong local presence.`;
  }
  
  if (point.toLowerCase().includes('gamification')) {
    return `Create an engaging gamification system within the app, featuring achievement badges, progress milestones, and community leaderboards. This motivational framework includes daily challenges, workout streaks, and social features that encourage consistent app usage and foster a sense of friendly competition.`;
  }
  
  // Additional Customer Acquisition points
  if (point.toLowerCase().includes('referral program')) {
    return `Implement a comprehensive referral program that rewards both existing users and their invited friends with premium features and extended subscription benefits. This program includes tracking tools for referrers to monitor their invites and tiered rewards based on successful conversions.`;
  }
  
  if (point.toLowerCase().includes('corporate wellness')) {
    return `Develop corporate wellness partnerships offering bulk licensing and custom features for employee health programs. This initiative includes detailed analytics for HR departments, team challenges, and specialized content tailored to workplace wellness objectives.`;
  }
  
  if (point.toLowerCase().includes('influencer collaboration')) {
    return `Establish strategic partnerships with fitness influencers and wellness experts to create exclusive content and special promotional campaigns. These collaborations include custom workout programs, expert-led challenges, and authentic testimonials that resonate with target demographics.`;
  }
  
  return point.endsWith('.') ? point : `${point}.`;
}

const MarketingSection: React.FC<MarketingSectionProps> = ({
  title,
  icon,
  items = [],
  checkColor = "indigo-500",
  description
}) => {
  // Only show the first 4 concise points, but expand each
  const displayItems = items.slice(0, 4);
  if (displayItems.length === 0) return null;

  return (
    <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-border/50">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">{title}</h4>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="space-y-3">
        {displayItems.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <CircleCheck className={cn(`h-4 w-4 text-${checkColor} mt-1 flex-shrink-0`)} />
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
              {expandBulletPoint(point)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
