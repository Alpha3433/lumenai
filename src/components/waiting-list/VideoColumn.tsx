
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
            <source src="https://videosholder.s3.ap-southeast-2.amazonaws.com/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA26SVGFECGQVJSC7X%2F20250403%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250403T112641Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAPt0yjuM44L7bNypSQqUsKHLe6pBrH374O53DVIt35LMAiBdOZrgnMdHDD%2BALzH%2BY7PYu6gCSRY3Gx4ge0j8O4FF9iqiAgjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDc1Mjg3MTY4MDI2MCIMRR1uPaX2BaCt%2Fb7SKvYBQJQwChDFY3bXKYYsT56K5OrWzi8eM5%2FlE8kDGXZfhtIEmGBOIncxffD1oXkCRh1cpyr9i9ael%2BssDh0plw0tCg2DbqyqQdqfPHXqZvHOT8uNXFaMYYQ21p9nZVbU2uxeAF5AJAwT7vpXlaVI46MkfF8tyBZPwRssZsQ0h%2BygxIRYZAkHEIZuNtj%2FNPUhZhGQy%2FeEQqzLvhnK2NAcABiCU5fsarfLt5yRAiWiVm7mCnYH7EFGg8erVMkJiv4m%2F5URrfcYENATzO2DF0u%2Fp0EKfkmTgF7asaROU9reMHQZ60GFl6MbxypaxVt4pNtQYa2APsYy4121MIDLub8GOt8BKqr%2B6rzrzFFsSKmULNOgfNsbNc9ngVd0zRpDAYchukC7cSJ%2BDcX1vdL84RXKBPMdgBAE0em3uziCddVUlQC2XqHcFWl6qyGS0%2BNmDIGALZYUxjr5oum1z%2BbC3v%2BGZLYGhjxElHhUSifpEVfBz1xODQ3TqwAHxDJt9MlVcOlMdMwZ7CqMFHB%2BaZR0FyONISq%2FsjEw5snLtFNKqYMLm61C1pWI7v0sf6B%2FM7%2BZdd2nMDR5gnt7VvC0i5qyXDDED5h3bWv%2BkC2dpdbJsVE95ztNwWzut9EANCUbx%2BNzDgoobQ%3D%3D&X-Amz-Signature=7e56d489dee103cbf86b4b0ea60a420876cb08b9f7c24cd7fa0e729d939eea98&X-Amz-SignedHeaders=host&response-content-disposition=inline" type="video/mp4" />
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
