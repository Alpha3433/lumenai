
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
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://videosholder.s3.ap-southeast-2.amazonaws.com/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA26SVGFECKPNEFPVY%2F20250404%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250404T055303Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkYwRAIgaqMdni48yGz24NDbnUiXWK0jwVqkbbUhyU%2Bdgq%2B4QmACIDQNnrp0OCRC7TBOK7OoGxyr3B9xa2yh4AWbisD0jS10KvECCP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzUyODcxNjgwMjYwIgx3O6EX7tBnyD8UGRAqxQIRC7ny45w47n1%2FQYIFn1byXDw5%2BhFIz7mxf6lvkJ9NMvt8tpx4ro8XIIGXGgzXlGiz%2BnUezpPLo6x7CZ%2FD8UlLh9xyTNBFwSqynDLSbhFDpTXrYd5wB125F7W%2B236S6ld9PRwE%2FRzYNZ4y9ZQjOUPQPlhOotpKwhnJSziQxgJT8V03yyO3jBDV6GRPJlD%2F7yE6tt0NbqN8TGhv5%2F3ZbJfr3X6pR5UEIGnTnPgZIsmVH%2BsXjYtb8X5clzKeZful4hDeWuxIl3i5fgPxqKKf6w7uy573AKMx02nSiNpBm4%2FucVEzpAR6SQIUa6uOh8IikNt2tF9QXzP7l5vrcr4%2F8DIZpEqa546BywrdDNCSbAtnU6HAcAZ5XO08CG2wxG6nwBBFhu98KD2nLlR2TbCjmkteSzIc3EkTaK%2Bjgh9YCqVOhATd7G6rMMDlvb8GOrQCYlZk8FabPqBN0ztlbs8xSkG4wci7W1QWBjiDDuwZO5kn13M7wPPIhS%2FUw4bN8nigV8Bm51CD1gSbcbo6dG%2BcX%2Fnnp7ACFbtc7HyQuNg8B1%2BZU7%2F47hRXQ0Xs9wqgPdQHvIvSN%2BOtKCEU9pOUCeeuND6uEiMTqWVy5es336wTcsPfU7Uv08aakHZkiG3VUmHjsPNXnbvJFtwNHeFboxlZWkcySqU13z%2Bh0uAi%2F%2BjA9maweSqKWxmACILY50Eep3yaMXF6un%2BO7U0gOqJT05MaAft8eZ0FSfT1U4rbraWF3y6jme9358S%2BOLvpcWywShhOFY1J8FNk%2BnUb3D7xH0w%2BvFtWZzWHIUNwGNsF%2FfZCpeREsZTpOrQWM8fF9SRyDPxNqvQ6VQchpy4r5U%2FvGQvwxe1SpDQ%3D&X-Amz-Signature=9f0dffb4eac8e181c11c8d320c8b04c86e2f769fb44c4d19c37caeea7983a8b0&X-Amz-SignedHeaders=host&response-content-disposition=inline" type="video/mp4" />
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

