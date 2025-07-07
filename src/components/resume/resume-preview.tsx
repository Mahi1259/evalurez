import type { ResumeData } from "@/types/resume"
import styles from "./resume-preview.module.css"

interface ResumePreviewProps {
  resumeData: ResumeData
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  // Create contact info array with separators
  const contactItems = []

  if (resumeData.personalInfo.email) {
    contactItems.push(
      <a key="email" href={`mailto:${resumeData.personalInfo.email}`} className={styles.contactLink}>
        {resumeData.personalInfo.email}
      </a>,
    )
  }

  if (resumeData.personalInfo.phone) {
    contactItems.push(<span key="phone">{resumeData.personalInfo.phone}</span>)
  }

  if (resumeData.personalInfo.location) {
    contactItems.push(<span key="location">{resumeData.personalInfo.location}</span>)
  }

  if (resumeData.personalInfo.linkedin) {
    contactItems.push(
      <a
        key="linkedin"
        href={resumeData.personalInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactLink}
      >
        LinkedIn
      </a>,
    )
  }

  if (resumeData.personalInfo.github) {
    contactItems.push(
      <a
        key="github"
        href={resumeData.personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactLink}
      >
        GitHub
      </a>,
    )
  }

  if (resumeData.personalInfo.portfolio) {
    contactItems.push(
      <a
        key="portfolio"
        href={resumeData.personalInfo.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactLink}
      >
        Portfolio
      </a>,
    )
  }

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 p-4">
      {/* Single Page */}
      <div className={styles.resumePage}>
        {/* Header - Name only */}
        <div className={styles.header}>
          <h1 className={styles.name}>{resumeData.personalInfo.name}</h1>
          <div className={styles.contactInfo}>
            {contactItems.map((item, index) => (
              <span key={index}>
                {item}
                {index < contactItems.length - 1 && <span className={styles.separator}> | </span>}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>SUMMARY</h2>
            <p className={styles.summaryText}>{resumeData.personalInfo.summary}</p>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>EDUCATION</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className={styles.subsection}>
                <div className={styles.subsectionHeader}>
                  <div>
                    <h3 className={styles.institutionName}>{edu.institution}</h3>
                    <p className={styles.degree}>{edu.degree}</p>
                  </div>
                  <div className={styles.dateLocation}>
                    <p className={styles.dateRange}>
                      {edu.startDate} -- {edu.endDate}
                    </p>
                    <p className={styles.location}>{edu.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.subsectionHeader}>
                  <div>
                    <h3 className={styles.companyName}>{exp.company}</h3>
                    <p className={styles.position}>{exp.position}</p>
                  </div>
                  <div className={styles.dateLocation}>
                    <p className={styles.dateRange}>
                      {exp.startDate} -- {exp.endDate}
                    </p>
                  </div>
                </div>
                <ul className={styles.responsibilityList}>
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
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>PROJECTS</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className={styles.projectItem}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDate}>{project.date}</p>
                </div>
                <div className={styles.projectDescription}>
                  <span className={styles.bullet}></span>
                  <p className={styles.descriptionText}>{project.description}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Technical Skills */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>TECHNICAL SKILLS</h2>
          <div className={styles.skillsContainer}>
            <div className={styles.skillRow}>
              <span className={styles.skillLabel}>Languages:</span>
              <span className={styles.skillText}>{resumeData.skills.languages.join(", ")}</span>
            </div>
            <div className={styles.skillRow}>
              <span className={styles.skillLabel}>Frameworks/Libraries:</span>
              <span className={styles.skillText}>{resumeData.skills.frameworks.join(", ")}</span>
            </div>
            <div className={styles.skillRow}>
              <span className={styles.skillLabel}>Tools & Technologies:</span>
              <span className={styles.skillText}>{resumeData.skills.tools.join(", ")}</span>
            </div>
          </div>
        </section>

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ACHIEVEMENTS & CERTIFICATIONS</h2>
            <ul className={styles.achievementList}>
              {resumeData.achievements.map((achievement, index) => (
                <li key={index} className={styles.achievementItem}>
                  <span className={styles.bullet}></span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
