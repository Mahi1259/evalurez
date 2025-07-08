"use client"

import { motion } from "framer-motion"

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
          Join Evalurez today and unlock the power of professional resume building and AI-powered analysis to transform
          your career prospects and land your dream job.
        </motion.p>
      </div>
    </div>
  )
}

export default FourthPage
