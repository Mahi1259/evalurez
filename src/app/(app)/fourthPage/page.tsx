"use client";
import { motion } from "framer-motion";

const FourthPage = () => {
  return (
    <div className="w-full py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Elevate Your Career?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
        >
          Join Evalurez today and unlock the power of AI to transform your
          resume and land your dream job.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="px-6 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-md font-medium transition-colors">
            Watch Video
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FourthPage;
