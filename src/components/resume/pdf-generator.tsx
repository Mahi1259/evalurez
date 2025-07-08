"use client"

import { useCallback } from "react"
import type { ResumeData } from "@/types/resume"

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
        yPosition += 4
        pdf.setFontSize(11)
        pdf.setFont("times", "bold")
        pdf.text(title.toUpperCase(), margin, yPosition)
        pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1)
        yPosition += 7
      }

      // FIXED: Header - Name with overflow handling
      pdf.setFontSize(20)
      pdf.setFont("times", "bold")

      const nameText = resumeData.personalInfo.name.toUpperCase()
      const nameWidth = pdf.getTextWidth(nameText)

      if (nameWidth <= contentWidth) {
        // Name fits on one line
        pdf.text(nameText, pageWidth / 2, yPosition, { align: "center" })
        yPosition += 10
      } else {
        // Name is too long - split it properly
        const nameWords = nameText.split(" ")
        const nameLines: string[] = []
        let currentLine = ""

        nameWords.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          if (pdf.getTextWidth(testLine) <= contentWidth) {
            currentLine = testLine
          } else {
            if (currentLine) {
              nameLines.push(currentLine)
              currentLine = word
            } else {
              // Single word is too long - truncate it
              nameLines.push(word.substring(0, Math.floor(contentWidth / pdf.getTextWidth("M")) - 3) + "...")
            }
          }
        })
        if (currentLine) {
          nameLines.push(currentLine)
        }

        // Render name lines centered
        nameLines.forEach((line) => {
          pdf.text(line, pageWidth / 2, yPosition, { align: "center" })
          yPosition += 6
        })
        yPosition += 4
      }

      // Contact Info - using the fixed horizontal formatting
      const contactItems: Array<{ text: string; url?: string }> = []

      if (resumeData.personalInfo.email) {
        contactItems.push({
          text: resumeData.personalInfo.email,
          url: `mailto:${resumeData.personalInfo.email}`,
        })
      }
      if (resumeData.personalInfo.phone) {
        contactItems.push({ text: resumeData.personalInfo.phone })
      }
      if (resumeData.personalInfo.location) {
        contactItems.push({ text: resumeData.personalInfo.location })
      }
      if (resumeData.personalInfo.linkedin) {
        contactItems.push({
          text: "LinkedIn",
          url: resumeData.personalInfo.linkedin.startsWith("http")
            ? resumeData.personalInfo.linkedin
            : `https://${resumeData.personalInfo.linkedin}`,
        })
      }
      if (resumeData.personalInfo.github) {
        contactItems.push({
          text: "GitHub",
          url: resumeData.personalInfo.github.startsWith("http")
            ? resumeData.personalInfo.github
            : `https://${resumeData.personalInfo.github}`,
        })
      }
      if (resumeData.personalInfo.portfolio) {
        contactItems.push({
          text: "Portfolio",
          url: resumeData.personalInfo.portfolio.startsWith("http")
            ? resumeData.personalInfo.portfolio
            : `https://${resumeData.personalInfo.portfolio}`,
        })
      }

      // Contact info horizontal formatting
      pdf.setFontSize(10)
      pdf.setFont("times", "normal")

      const contactTexts = contactItems.map((item) => item.text)
      const fullContactLine = contactTexts.join(" | ")

      if (pdf.getTextWidth(fullContactLine) <= contentWidth) {
        // Single line - add clickable links
        const lineWidth = pdf.getTextWidth(fullContactLine)
        const startX = (pageWidth - lineWidth) / 2
        let currentX = startX

        contactItems.forEach((item, index) => {
          const itemWidth = pdf.getTextWidth(item.text)

          if (item.url) {
            pdf.textWithLink(item.text, currentX, yPosition, { url: item.url })
          } else {
            pdf.text(item.text, currentX, yPosition)
          }

          currentX += itemWidth

          if (index < contactItems.length - 1) {
            const separatorText = " | "
            pdf.text(separatorText, currentX, yPosition)
            currentX += pdf.getTextWidth(separatorText)
          }
        })
        yPosition += 6
      } else {
        // Multiple lines - split text properly but keep horizontal format
        const words = fullContactLine.split(" ")
        const lines: string[] = []
        let currentLine = ""

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          if (pdf.getTextWidth(testLine) <= contentWidth) {
            currentLine = testLine
          } else {
            if (currentLine) {
              lines.push(currentLine)
              currentLine = word
            } else {
              lines.push(word)
            }
          }
        })
        if (currentLine) {
          lines.push(currentLine)
        }

        lines.forEach((line) => {
          const lineWidth = pdf.getTextWidth(line)
          const startX = (pageWidth - lineWidth) / 2
          let currentX = startX

          const lineParts = line.split(" | ")

          lineParts.forEach((part, index) => {
            const partWidth = pdf.getTextWidth(part)
            const matchingItem = contactItems.find((item) => item.text === part)

            if (matchingItem && matchingItem.url) {
              pdf.textWithLink(part, currentX, yPosition, { url: matchingItem.url })
            } else {
              pdf.text(part, currentX, yPosition)
            }

            currentX += partWidth

            if (index < lineParts.length - 1) {
              const separatorText = " | "
              pdf.text(separatorText, currentX, yPosition)
              currentX += pdf.getTextWidth(separatorText)
            }
          })

          yPosition += 4
        })
        yPosition += 2
      }

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

          pdf.setFontSize(9)
          pdf.setFont("times", "normal")
          pdf.text(`${edu.startDate} -- ${edu.endDate}`, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 4

          pdf.setFont("times", "italic")
          pdf.setFontSize(10)
          pdf.text(edu.degree, margin, yPosition)

          if (edu.location) {
            pdf.setFont("times", "normal")
            pdf.setFontSize(8)
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

          pdf.setFontSize(9)
          pdf.setFont("times", "normal")
          pdf.text(`${exp.startDate} -- ${exp.endDate}`, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 4

          pdf.setFont("times", "italic")
          pdf.setFontSize(10)
          pdf.text(exp.position, margin, yPosition)

          if (exp.location) {
            pdf.setFont("times", "normal")
            pdf.setFontSize(8)
            pdf.text(exp.location, pageWidth - margin, yPosition, { align: "right" })
          }
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
