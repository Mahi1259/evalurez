import Link from "next/link";
import React from "react";
import styles from "@/styles/First.module.css";

const FirstPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-between rounded-lg p-7">
      <div className={`space-y-10 ${styles.animateSlideInLeft}`}>
        <h1 className="text-4xl lg:text-7xl font-bold">
          Transform Your Resume with
          <br />{" "}
          <span className="underline underline-offset-8 decoration-purple-800">
            {"Evalurez"}
          </span>
        </h1>
        <p className="">
          Struggling to get your resume noticed in today&apos;s competitive job
          market? Evalurez is an AI-powered platform that analyzes your resume,
          providing insights and a score to help you stand out. With Evalurez,
          you&apos;ll get actionable feedback to tailor your resume for
          recruiters, increasing your chances of landing your dream job. Get
          started today and Upload your resume for analysis!
        </p>
        <Link href="/evaluateResume" className="inline-block group mr-9">
          <div>
            <h1 className="text-3xl font-bold group-hover:text-green-500 transition-all">
              {" "}
              Evaluate your Resume!
            </h1>
            <div className="w-full h-2 bg-purple-800 rounded-full"></div>
            <div className="w-full h-2 bg-purple-300 rounded-full translate-x-3"></div>
          </div>
        </Link>
        <Link
          href="./Home/components/createResume"
          className="inline-block group"
        >
          <div>
            <h1 className="text-3xl font-bold group-hover:text-green-500 transition-all">
              {" "}
              Create your Resume!
            </h1>
            <div className="w-full h-2 bg-purple-800 rounded-full"></div>
            <div className="w-full h-2 bg-purple-300 rounded-full translate-x-3"></div>
          </div>
        </Link>
      </div>
      <div
        className={`w-72 h-72 space-y-3 -rotate-[30deg] ${styles.animateSlideInRight}`}
      >
        <div className="flex gap-3 translate-x-8">
          <div className="w-32 h-32 rounded-2xl bg-purple-300"></div>
          <div className="w-32 h-32 rounded-full bg-purple-800"></div>
        </div>
        <div className="flex gap-3 translate-x-8">
          <div className="w-32 h-32 rounded-2xl bg-purple-800"></div>
          <div className="w-32 h-32 rounded-full bg-purple-300"></div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
