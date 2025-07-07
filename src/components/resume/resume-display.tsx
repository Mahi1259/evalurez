import type { ResumeData } from "@/types/resume"
import styles from "./resume-display.module.css"

interface ResumeDisplayProps {
  resumeData: ResumeData
}

export default function ResumeDisplay({ resumeData }: ResumeDisplayProps) {
  return (
    <div id="resume-display" className={styles.resumeContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{resumeData.personalInfo.name}</h1>
        <div className={styles.contactInfo}>
          <span>📧 {resumeData.personalInfo.email}</span>
          <span>💼 {resumeData.personalInfo.linkedin}</span>
          <span>🔗 {resumeData.personalInfo.github}</span>
          <span>📍 {resumeData.personalInfo.location}</span>
          <span>📞 {resumeData.personalInfo.phone}</span>
        </div>
      </div>

      {/* Summary */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summaryText}>{resumeData.personalInfo.summary}</p>
      </section>

      {/* Education */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <div>
                <h3 className={styles.institutionName}>{edu.institution}</h3>
                <p className={styles.degree}>{edu.degree}</p>
              </div>
              <div className={styles.dateLocation}>
                {/* Fixed: Remove font-bold class to match PDF */}
                <p className={styles.dateRangeNormal}>
                  {edu.startDate} -- {edu.endDate}
                </p>
                <p className={styles.location}>{edu.location}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.subsectionHeader}>
              <div>
                <h3 className={styles.companyName}>{exp.company}</h3>
                <p className={styles.position}>{exp.position}</p>
              </div>
              <div className={styles.dateLocation}>
                {/* Fixed: Remove font-bold class to match PDF */}
                <p className={styles.dateRangeNormal}>
                  {exp.startDate} -- {exp.endDate}
                </p>
              </div>
            </div>
            <ul className={styles.responsibilitiesList}>
              {exp.responsibilities.map((resp, respIndex) => (
                <li key={respIndex} className={styles.responsibilityItem}>
                  <span className={styles.bullet}></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
            <div className={styles.projectHeader}>
              <h3 className={styles.projectName}>{project.name}</h3>
              {/* Fixed: Remove font-bold class to match PDF */}
              <p className={styles.projectDateNormal}>{project.date}</p>
            </div>
            <div className={styles.projectDescription}>
              <span className={styles.bullet}></span>
              <p className={styles.descriptionText}>{project.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillRow}>
            <span className={styles.skillLabel}>Languages:</span>
            <span>{resumeData.skills.languages.join(", ")}</span>
          </div>
          <div className={styles.skillRow}>
            <span className={styles.skillLabel}>Frameworks/Libraries:</span>
            <span>{resumeData.skills.frameworks.join(", ")}</span>
          </div>
          <div className={styles.skillRow}>
            <span className={styles.skillLabel}>Tools & Technologies:</span>
            <span>{resumeData.skills.tools.join(", ")}</span>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className={styles.sectionTitle}>Achievements & Certifications</h2>
        <ul className={styles.achievementsList}>
          {resumeData.achievements.map((achievement, index) => (
            <li key={index} className={styles.achievementItem}>
              <span className={styles.bullet}></span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
