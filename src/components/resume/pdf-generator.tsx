"use client"

import { useCallback } from "react"
import type { ResumeData } from "@/types/resume"

interface ContactLink {
  text: string
  url: string | null
}

interface PDFGeneratorProps {
  resumeData: ResumeData
  onGenerate: (isGenerating: boolean) => void
}

export default function PDFGenerator({ resumeData, onGenerate }: PDFGeneratorProps) {
  const generatePDF = useCallback(async () => {
    onGenerate(true)
    try {
      // Dynamic import to avoid SSR issues
      const { default: jsPDF } = await import("jspdf")

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      const contentWidth = pageWidth - 2 * margin
      let yPosition = margin

      // Helper function to add section header
      const addSectionHeader = (title: string) => {
        yPosition += 4 // Reduced from 5
        pdf.setFontSize(11)
        pdf.setFont("times", "bold")
        pdf.text(title.toUpperCase(), margin, yPosition)
        pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1)
        yPosition += 7
      }

      // Header - Name only (removed professional title)
      pdf.setFontSize(20)
      pdf.setFont("times", "bold")
      pdf.text(resumeData.personalInfo.name.toUpperCase(), pageWidth / 2, yPosition, { align: "center" })
      yPosition += 10

      // Contact Info with clickable links
      const contactInfo: string[] = []
      const contactLinks: ContactLink[] = []

      if (resumeData.personalInfo.email) {
        contactInfo.push(resumeData.personalInfo.email)
        contactLinks.push({ text: resumeData.personalInfo.email, url: `mailto:${resumeData.personalInfo.email}` })
      }
      if (resumeData.personalInfo.phone) {
        contactInfo.push(resumeData.personalInfo.phone)
        contactLinks.push({ text: resumeData.personalInfo.phone, url: null })
      }
      if (resumeData.personalInfo.location) {
        contactInfo.push(resumeData.personalInfo.location)
        contactLinks.push({ text: resumeData.personalInfo.location, url: null })
      }
      if (resumeData.personalInfo.linkedin) {
        contactInfo.push("LinkedIn")
        contactLinks.push({ text: "LinkedIn", url: resumeData.personalInfo.linkedin })
      }
      if (resumeData.personalInfo.github) {
        contactInfo.push("GitHub")
        contactLinks.push({ text: "GitHub", url: resumeData.personalInfo.github })
      }

      // Add contact info with links
      pdf.setFontSize(10)
      pdf.setFont("times", "normal")
      const contactLine = contactInfo.join("  |  ")

      // Calculate positions for clickable areas
      const contactY = yPosition
      let currentX = (pageWidth - pdf.getTextWidth(contactLine)) / 2

      contactInfo.forEach((item, index) => {
        const link = contactLinks[index]
        const textWidth = pdf.getTextWidth(item)

        if (link && link.url) {
          // Add clickable link
          pdf.textWithLink(item, currentX, contactY, { url: link.url })
        } else {
          pdf.text(item, currentX, contactY)
        }

        currentX += textWidth
        if (index < contactInfo.length - 1) {
          pdf.text("  |  ", currentX, contactY)
          currentX += pdf.getTextWidth("  |  ")
        }
      })

      yPosition += 10

      // Summary
      if (resumeData.summary) {
        addSectionHeader("Summary")
        pdf.setFontSize(11)
        pdf.setFont("times", "normal")
        const summaryLines = pdf.splitTextToSize(resumeData.summary, contentWidth)
        summaryLines.forEach((line: string) => {
          if (yPosition + 4 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.text(line, margin, yPosition)
          yPosition += 4
        })
        yPosition += 3
      }

      // Education
      if (resumeData.education.length > 0) {
        addSectionHeader("Education")
        resumeData.education.forEach((edu) => {
          if (yPosition + 12 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(10)
          pdf.setFont("times", "bold")
          pdf.text(edu.institution, margin, yPosition)

          // Smaller date font
          pdf.setFontSize(9)
          pdf.setFont("times", "normal")
          pdf.text(`${edu.startDate} - ${edu.endDate}`, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 4

          pdf.setFont("times", "italic")
          pdf.setFontSize(10)
          pdf.text(edu.degree, margin, yPosition)

          // Smaller location text
          if (edu.location) {
            pdf.setFont("times", "normal")
            pdf.setFontSize(8) // Reduced from 9
            pdf.text(edu.location, pageWidth - margin, yPosition, { align: "right" })
          }
          yPosition += 7
        })
      }

      // Experience
      if (resumeData.experience.length > 0) {
        addSectionHeader("Experience")
        resumeData.experience.forEach((exp) => {
          if (yPosition + 20 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(10)
          pdf.setFont("times", "bold")
          pdf.text(exp.company, margin, yPosition)

          // Smaller date font
          pdf.setFontSize(9)
          pdf.setFont("times", "normal")
          pdf.text(`${exp.startDate} - ${exp.endDate}`, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 4

          pdf.setFont("times", "italic")
          pdf.setFontSize(10)
          pdf.text(exp.position, margin, yPosition)
          yPosition += 5

          exp.responsibilities.forEach((resp) => {
            if (yPosition + 6 > pageHeight - margin) {
              pdf.addPage()
              yPosition = margin
            }
            pdf.setFont("times", "normal")
            pdf.setFontSize(10)

            pdf.text("•", margin + 3, yPosition)
            const lines = pdf.splitTextToSize(resp, contentWidth - 10)
            lines.forEach((line: string, index: number) => {
              if (yPosition + 3.5 > pageHeight - margin) {
                pdf.addPage()
                yPosition = margin
              }
              pdf.text(line, margin + 8, yPosition)
              if (index < lines.length - 1) yPosition += 3.5
            })
            yPosition += 4
          })
          yPosition += 3
        })
      }

      // Projects
      if (resumeData.projects.length > 0) {
        addSectionHeader("Projects")
        resumeData.projects.forEach((project, index) => {
          if (yPosition + 18 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(10)
          pdf.setFont("times", "bold")
          pdf.text(project.name, margin, yPosition)

          pdf.setFontSize(9)
          pdf.setFont("times", "normal")
          pdf.text(project.date, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 5

          pdf.setFont("times", "normal")
          pdf.setFontSize(10)
          pdf.text("•", margin + 3, yPosition)

          const lines = pdf.splitTextToSize(project.description, contentWidth - 10)
          lines.forEach((line: string, lineIndex: number) => {
            if (yPosition + 3.5 > pageHeight - margin) {
              pdf.addPage()
              yPosition = margin
            }
            pdf.text(line, margin + 8, yPosition)
            if (lineIndex < lines.length - 1) yPosition += 3.5
          })

          // Add more space between projects
          if (index < resumeData.projects.length - 1) {
            yPosition += 8
          } else {
            yPosition += 5
          }
        })
      }

      // Technical Skills
      addSectionHeader("Technical Skills")
      const skillCategories = [
        { label: "Languages:", items: resumeData.skills.languages },
        { label: "Frameworks/Libraries:", items: resumeData.skills.frameworks },
        { label: "Tools & Technologies:", items: resumeData.skills.tools },
      ]

      skillCategories.forEach((category) => {
        if (yPosition + 6 > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.setFontSize(9)
        pdf.setFont("times", "bold")
        pdf.text(category.label, margin, yPosition)

        pdf.setFont("times", "normal")
        const skillText = category.items.join(", ")
        const skillLines = pdf.splitTextToSize(skillText, contentWidth - 40)

        skillLines.forEach((line: string, index: number) => {
          if (yPosition + 3.5 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.text(line, margin + 40, yPosition)
          if (index < skillLines.length - 1) yPosition += 3.5
        })
        yPosition += 5
      })

      // Achievements
      if (resumeData.achievements.length > 0) {
        addSectionHeader("Achievements & Certifications")
        resumeData.achievements.forEach((achievement) => {
          if (yPosition + 6 > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.setFontSize(10)
          pdf.setFont("times", "normal")
          pdf.text("•", margin + 3, yPosition)

          const lines = pdf.splitTextToSize(achievement, contentWidth - 10)
          lines.forEach((line: string, index: number) => {
            if (yPosition + 3.5 > pageHeight - margin) {
              pdf.addPage()
              yPosition = margin
            }
            pdf.text(line, margin + 8, yPosition)
            if (index < lines.length - 1) yPosition += 3.5
          })
          yPosition += 5
        })
      }

      // Save the PDF
      pdf.save(`${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      onGenerate(false)
    }
  }, [resumeData, onGenerate])

  return { generatePDF }
}
