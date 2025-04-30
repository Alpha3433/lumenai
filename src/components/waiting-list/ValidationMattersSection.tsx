
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
      thumbnailUrl: "/lovable-uploads/8593c3fd-9bf5-4cc2-9fb3-26615fd46f96.png", 
      youtubeId: "vDXkpJw16os"
    },
    {
      title: "Use This PROVEN Formula to Validate Your Next Startup Idea",
      description: "Rob Walling breaks down a battle-tested validation method used by bootstrapped founders.",
      thumbnailUrl: "https://img.youtube.com/vi/YZvpGQYLFCE/maxresdefault.jpg",
      youtubeId: "YZvpGQYLFCE"
    },
    {
      title: "Waze Founder on How to Validate Your Startup Idea",
      description: "Uri Levine shares real-world insights from building Waze.",
      thumbnailUrl: "https://img.youtube.com/vi/D6X7OJMKR9g/maxresdefault.jpg",
      youtubeId: "D6X7OJMKR9g"
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
