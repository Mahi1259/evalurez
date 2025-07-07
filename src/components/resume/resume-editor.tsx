"use client"

import type { ResumeData } from "@/types/resume"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface ResumeEditorProps {
  resumeData: ResumeData
  onUpdate: (data: ResumeData) => void
}

export default function ResumeEditor({ resumeData, onUpdate }: ResumeEditorProps) {
  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const updateSummary = (value: string) => {
    onUpdate({
      ...resumeData,
      summary: value,
    })
  }

  const addExperience = () => {
    onUpdate({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      ],
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...resumeData.experience]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate({ ...resumeData, experience: updated })
  }

  const addProject = () => {
    onUpdate({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input
                value={resumeData.personalInfo.name}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                placeholder="John Smith"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john.smith@email.com"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <Input
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                placeholder="johnsmith"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">GitHub</label>
              <Input
                value={resumeData.personalInfo.github}
                onChange={(e) => updatePersonalInfo("github", e.target.value)}
                placeholder="johnsmith"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Portfolio/Website</label>
              <Input
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="https://yourportfolio.com"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Write a brief summary of your professional background..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Experience</CardTitle>
            <Button onClick={addExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    placeholder="Jan 2022"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Responsibilities</label>
                <Textarea
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[index].responsibilities = e.target.value.split("\n").filter((r) => r.trim())
                    onUpdate({ ...resumeData, experience: updated })
                  }}
                  placeholder="• Achievement 1\n• Achievement 2\n• Achievement 3"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Projects</CardTitle>
            <Button onClick={addProject} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <Input
                    value={project.name}
                    onChange={(e) => {
                      const updated = [...resumeData.projects]
                      updated[index].name = e.target.value
                      onUpdate({ ...resumeData, projects: updated })
                    }}
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    value={project.date}
                    onChange={(e) => {
                      const updated = [...resumeData.projects]
                      updated[index].date = e.target.value
                      onUpdate({ ...resumeData, projects: updated })
                    }}
                    placeholder="March 2024"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={project.description}
                  onChange={(e) => {
                    const updated = [...resumeData.projects]
                    updated[index].description = e.target.value
                    onUpdate({ ...resumeData, projects: updated })
                  }}
                  placeholder="Describe your project..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
