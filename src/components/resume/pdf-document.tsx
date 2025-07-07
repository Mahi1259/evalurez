import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import type { ResumeData } from "@/types/resume"

// Register fonts for better PDF rendering
Font.register({
  family: "Arial",
  fonts: [
    { src: "https://fonts.gstatic.com/s/arial/v1/arial-regular.ttf" },
    { src: "https://fonts.gstatic.com/s/arial/v1/arial-bold.ttf", fontWeight: "bold" },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 2,
    marginBottom: 8,
  },
  subsection: {
    marginBottom: 10,
  },
  subsectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  position: {
    fontSize: 11,
    fontStyle: "italic",
  },
  dateRange: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "right",
  },
  location: {
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "right",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 15,
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: "#000",
    borderRadius: 2,
    marginRight: 8,
    marginTop: 4,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    textAlign: "justify",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  projectName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  projectDate: {
    fontSize: 11,
    fontWeight: "bold",
  },
  skillsContainer: {
    gap: 4,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  skillLabel: {
    fontSize: 11,
    fontWeight: "bold",
    minWidth: 140,
  },
  skillList: {
    fontSize: 11,
    flex: 1,
  },
  summaryText: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 1.4,
  },
})

interface PDFDocumentProps {
  resumeData: ResumeData
}

export default function PDFDocument({ resumeData }: PDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
          {resumeData.personalInfo.title && <Text style={styles.title}>{resumeData.personalInfo.title}</Text>}
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>✉ {resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>📞 {resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>📍 {resumeData.personalInfo.location}</Text>
              </View>
            )}
            {resumeData.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text>💼 LinkedIn</Text>
              </View>
            )}
            {resumeData.personalInfo.github && (
              <View style={styles.contactItem}>
                <Text>🔗 GitHub</Text>
              </View>
            )}
            {resumeData.personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Text>🌐 Portfolio</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <View>
                    <Text style={styles.companyName}>{edu.institution}</Text>
                    <Text style={styles.position}>{edu.degree}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateRange}>
                      {edu.startDate} -- {edu.endDate}
                    </Text>
                    <Text style={styles.location}>{edu.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <View>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    <Text style={styles.position}>{exp.position}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateRange}>
                      {exp.startDate} -- {exp.endDate}
                    </Text>
                  </View>
                </View>
                {exp.responsibilities.map((resp, respIndex) => (
                  <View key={respIndex} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{resp}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDate}>{project.date}</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{project.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Languages:</Text>
              <Text style={styles.skillList}>{resumeData.skills.languages.join(", ")}</Text>
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Frameworks/Libraries:</Text>
              <Text style={styles.skillList}>{resumeData.skills.frameworks.join(", ")}</Text>
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Tools & Technologies:</Text>
              <Text style={styles.skillList}>{resumeData.skills.tools.join(", ")}</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Certifications</Text>
            {resumeData.achievements.map((achievement, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
