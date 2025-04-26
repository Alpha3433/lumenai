
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoColumn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    // Auto-play video when component mounts (if browser allows)
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Video playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.error(e));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full md:w-1/2 max-w-lg"
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden">
          <div className="relative">
            <div className="aspect-video w-full">
              <iframe 
                src="https://player.vimeo.com/video/1077686359?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                className="w-full h-full pointer-events-none"
                title="Product Demo Video"
              />
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="text-sm font-semibold mb-1">See how it works:</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Our all-in-one platform streamlines your business operations from planning to execution.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium">
          Early Access
        </div>
      </div>
    </motion.div>
  );
};

export default VideoColumn;
