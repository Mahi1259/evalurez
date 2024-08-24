import React from "react";

const FourthPage = () => {
  return (
    <div className="container mx-auto my-auto">
      <h1 className="text-4xl font-bold text-black dark:text-white text-center underline underline-offset-8 decoration-purple-800">
        The Future of Resume Enhancement
      </h1>
      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-purple-800 transition-shadow cursor-pointer">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 ">
            AI-Powered Accuracy
          </h2>
          <p className="text-gray-700 hover:text-green-500">
            Utilize the latest advancements in AI technology to ensure your
            resume is accurately analyzed against job descriptions, giving you
            an edge in the job market.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-purple-800 transition-shadow cursor-pointer">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Personalized Feedback
          </h2>
          <p className="text-gray-700 hover:text-green-500">
            Receive tailored feedback and actionable insights to optimize your
            resume for each job application, maximizing your chances of success.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-purple-800 transition-shadow cursor-pointer">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Time and Cost Efficiency
          </h2>
          <p className="text-gray-700 hover:text-green-500">
            Save time and resources by streamlining the resume improvement
            process. With Evalurez, enhance your resume efficiently and
            effectively.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-purple-800 transition-shadow cursor-pointer">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Stay Ahead of the Competition
          </h2>
          <p className="text-gray-700 hover:text-green-500">
            Gain a competitive advantage in the job market by aligning your
            resume with employer expectations and showcasing your qualifications
            effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FourthPage;
