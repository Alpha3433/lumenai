
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';

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
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <Play className="h-10 w-10 text-white fill-white" />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <ServiceFeature text="AI Business Plans" />
              <ServiceFeature text="Website Development" />
              <ServiceFeature text="Ad Management" />
              <ServiceFeature text="Backend Services" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium">
          Early Access
        </div>
      </div>
    </motion.div>
  );
};

const ServiceFeature = ({ text }) => (
  <div className="flex items-center gap-1.5">
    <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </div>
);

export default VideoColumn;
