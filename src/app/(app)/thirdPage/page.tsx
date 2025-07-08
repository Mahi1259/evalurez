"use client"

import { motion } from "framer-motion"

const ThirdPage = () => {
  return (
    <div className="w-full py-20 px-4 md:px-6 lg:px-8">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 dark:from-purple-400 dark:to-purple-300">
              Powerful Tools for Your Career
            </span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            Evalurez offers two complementary solutions to help you land your dream job
          </p>
        </motion.div>

        {/* Resume Builder Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="p-8">
                <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-800 dark:text-purple-400"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <line x1="10" y1="9" x2="8" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-400">
                  Professional Resume Builder
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Create professional, ATS-friendly resumes with our intuitive builder. Take complete control over every
                  section, customize the layout to match your style, and build a resume that truly represents your
                  unique experience and skills.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Step-by-step guided resume creation process",
                    "Professional templates designed for modern job markets",
                    "Complete customization control over all sections and content",
                    "Export in PDF format ready for submission",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-500 dark:from-purple-900/30 dark:to-purple-800/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform rotate-6 flex flex-col p-4">
                    <div className="w-full h-6 bg-purple-100 dark:bg-purple-900/50 rounded mb-3 flex items-center">
                      <div className="w-20 h-3 bg-purple-800 dark:bg-purple-400 rounded ml-2"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ))}
                      <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* AI Resume Analyzer Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <div className="p-8">
                <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">AI Resume Analyzer</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Upload your existing resume and receive instant, personalized feedback. Our AI analyzes your document
                  against industry standards and job requirements to help you stand out from the competition.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Get a comprehensive score and detailed analysis of your resume",
                    "Receive actionable recommendations for improvement",
                    "Identify missing keywords and skills for your target roles",
                    "Compare your resume against industry benchmarks",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-1 flex justify-center"
            >
              <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-500 dark:from-blue-900/30 dark:to-blue-800/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-32 h-4 bg-blue-200 dark:bg-blue-900/50 rounded"></div>
                      <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        85
                      </div>
                    </div>
                    <div className="space-y-4 flex-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                              style={{ width: `${75 - i * 15}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 space-y-2">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdPage
