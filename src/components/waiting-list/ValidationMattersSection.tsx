
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeId: string;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  description, 
  thumbnailUrl, 
  youtubeId,
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <a 
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
          >
            <PlayCircle className="w-16 h-16 text-white" />
          </a>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ValidationMattersSection = () => {
  const videos = [
    {
      title: "How to Get and Test Startup Ideas",
      description: "Michael Seibel (YC) explains why talking to users early is critical to success.",
      thumbnailUrl: "/lovable-uploads/40f4a29f-4c1e-4e26-9383-564227ec29d0.png", 
      youtubeId: "vDXkpJw16os"
    },
    {
      title: "My Side Hustle Failed - Why Most Ideas Don't Work",
      description: "Honest breakdown of a failed side project and the importance of validating ideas early.",
      thumbnailUrl: "/lovable-uploads/e6d65b0a-c618-46b8-b61b-d12835202499.png",
      youtubeId: "4_MDP6TcHwU"
    },
    {
      title: "How To Validate Your SaaS Idea",
      description: "Practical steps to test and validate your SaaS idea before investing time and resources.",
      thumbnailUrl: "/lovable-uploads/d259ecaf-29dc-4167-9eca-2605d0c93e7f.png",
      youtubeId: "31U9X_XD63c"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Idea Validation Matters
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Before you build, validate. These founders, investors, and creators share 
            how they save time and money by testing before launching.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              index={index}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              youtubeId={video.youtubeId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValidationMattersSection;
