"use client";
import { motion } from "framer-motion";

const FirstPage = () => {
  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center py-16 px-4 md:px-8 lg:px-12">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-8">
                <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold tracking-tight">
                  Transform Your Resume with{" "}
                  <span className="relative">
                    <span className="text-purple-800 dark:text-purple-400">
                      Evalurez
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-800 dark:bg-purple-400"></span>
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  Struggling to get your resume noticed? Evalurez is an
                  AI-powered platform that analyzes your resume, scores it, and
                  provides actionable insights to help you stand out. With its
                  built-in AI Resume Builder, you can create a professional,
                  optimized resume in minutes. Tailor your resume for
                  recruiters, increase your chances of landing your dream job,
                  and take control of your career with Evalurez. Get started
                  today!
                </p>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
                  <div className="p-6 border-l-4 border-purple-800 dark:border-purple-400">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-purple-800 dark:text-purple-400">
                      AI Resume Builder
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Create professional resumes with our intelligent AI that
                      generates tailored content optimized for your target
                      roles.
                    </p>
                  </div>

                  <div className="p-6 border-l-4 border-blue-600 dark:border-blue-400">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                      AI Resume Analyzer
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Get personalized feedback and actionable insights to
                      improve your existing resume and increase your interview
                      chances.
                    </p>
                  </div>
                </div> */}

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                  <button className="px-8 py-4 bg-purple-800 hover:bg-purple-900 text-white text-xl rounded-md font-medium transition-colors">
                    Analyze My Resume
                  </button>
                  <button className="px-8 py-4 border-2 border-purple-800 text-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950 dark:text-purple-400 dark:border-purple-400 text-xl rounded-md font-medium transition-colors">
                    Build New Resume
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md h-[500px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 dark:bg-purple-900/20 rounded-full -z-10 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 dark:bg-blue-900/20 rounded-full -z-10 blur-3xl"></div>

                  <div className="relative z-10 h-full w-full flex items-center justify-center">
                    <div className="relative w-80 h-[450px]">
                      <div className="absolute top-0 right-0 w-64 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl transform rotate-3 z-10">
                        <div className="p-4">
                          <div className="w-full h-6 bg-purple-100 dark:bg-purple-900/50 rounded mb-4"></div>
                          <div className="space-y-2">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-64 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl transform -rotate-6 z-20">
                        <div className="p-4">
                          <div className="mb-4">
                            <div className="w-32 h-4 bg-blue-200 dark:bg-blue-900/50 rounded"></div>
                          </div>
                          <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="space-y-1">
                                <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gray-300 dark:bg-gray-600 rounded-full"
                                    style={{ width: `${90 - i * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="text-lg">ATS-Friendly Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="text-lg">Industry-Specific Keywords</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="text-lg">Expert Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="text-lg">Real-Time Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
