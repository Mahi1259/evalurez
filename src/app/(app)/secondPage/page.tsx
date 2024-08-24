import React from "react";
import styles from "@/styles/Second.module.css";
import Image from "next/image";

export default function Second() {
  return (
    <div className={styles.container}>
      <h1 className="text-4xl font-bold text-black dark:text-white text-center underline underline-offset-8 decoration-purple-800 dark:decoration-purple-400">
        {" "}
        Key Features
      </h1>
      <div className={styles.bigSquare}>
        <div className={styles["square-container"]}>
          <div className={styles["square-item"]}>
            <div className={styles.square}>
              <div className={styles.innerContent}>
                AI-Powered Resume Analysis
                <div className={styles.description}>
                  Our advanced AI algorithms analyze CVs instantly, matching
                  them with job descriptions to provide personalized scores.
                </div>
              </div>
            </div>
          </div>
          <div className={styles["square-item"]}>
            <div className={styles.square}>
              <div className={styles.innerContent}>
                Actionable Insights
                <div className={styles.description}>
                  Receive valuable feedback and suggestions to improve your
                  resume, helping you tailor it to specific job requirements.
                </div>
              </div>
            </div>
          </div>
          <div className={styles["square-item"]}>
            <div className={styles.square}>
              <div className={styles.innerContent}>
                Efficient Job Matching
                <div className={styles.description}>
                  Increase your chances of landing your ideal job by ensuring
                  your resume is perfectly aligned with employer expectations.
                </div>
              </div>
            </div>
          </div>
          <div className={styles["square-item"]}>
            <div className={styles.square}>
              <div className={styles.innerContent}>
                Community Engagement
                <div className={styles.description}>
                  Join a vibrant community of job seekers leveraging
                  transformative technology to enhance their career prospects.
                </div>
              </div>
            </div>
          </div>
          <div className={styles["square-item"]}>
            <div className={styles.square}>
              <div className={styles.innerContent}>
                Join the Evalurez Community
                <div className={styles.description}>
                  Sign up now to take advantage of Evalurez&apos;s powerful
                  features and unlock new opportunities for career advancement.
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/girl.avif"
          alt="Company Logo"
          width={280}
          height={40}
          className={styles.leftImage}
        />
        <Image
          src="/boy.avif"
          alt="Company Logo"
          width={280}
          height={10}
          className={styles.rightImage}
        />
      </div>
    </div>
  );
}
