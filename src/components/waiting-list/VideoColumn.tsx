
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoColumn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

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
          <video
            ref={videoRef}
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://videosholder.s3.ap-southeast-2.amazonaws.com/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA26SVGFECJHPXXG7E%2F20250403%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250403T111851Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIgE5mNmXd3ODVh7Pg56aO8enyeV3dce2NvwTzAnGqSXmECIQC28dUMwvFGrvlyqL8whk5bLpxYlcINOJ02JFpDa013DSqiAgjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDc1Mjg3MTY4MDI2MCIM6QBYsbWtxk7sbd2sKvYBOGr61OGs6EHd8QGv0BOTqE7%2F88ceV00TV82mmaSXbplKnkJc53w9h%2BmOfxi%2B8gKNjV8QLpOoo7%2B2qSA8ZZeQoQ0QWlvlQdHT3%2FwN7fZcyLAdIUbseE1KaVs3KwjufsX0xJyjQiDZJVNf9Px24PIOCi2BLpbAYvg24oVDqNXEvgst68bWcyLtG2HLY%2BUNkLmbWNnPKb2BVjRbXcl%2BCDiqoJnPZBb4x0EwRRVgFEdJklOs4aU4MGQ3m%2FWASINGCjde7du29CCZGt2ZOBQvUCIE4Og8imGyDc4ZHkS1N14NRD6ZHrlp3Iw3KQfuysFvpKpNX7NwSf31MIDLub8GOt8BBjpXgr0PkbdejYCbH8NGKCemNeRR%2FsU%2B8jhcy90Yx%2FnTY1cVg%2FHU8B4dywZY4zcyljy6jxesCua%2BDjPlgIRD7BxiXg%2Fdv8otjmUwlXqZ8aeUuCLC7kQ5jk19ZhH8UyI02D%2BXUqR2izjKZrmqgIW92spRYhK9qCHJMxgrRrPITLVia0am2JejyQLdLwWeEpqYnHPIUVmj1f72%2FU5aUbVSB9M3ayzHZNx4VgI13H58xcTzB0nrq2JUWqaGHg5yafNXmUs%2FZDyjYN83WKeFS4%2F7QChaiZYMUewTqvoHfxSn0Q%3D%3D&X-Amz-Signature=9c2f1ef152a2042da71fe04de654e16a14b332b0ef625511a077a7c7a604b267&X-Amz-SignedHeaders=host&response-content-disposition=inline" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          Coming Soon
        </div>
      </div>
    </motion.div>
  );
};

export default VideoColumn;
