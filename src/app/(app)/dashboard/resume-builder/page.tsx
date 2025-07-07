"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveTab, selectTemplate, resetToTemplateSelection } from "@/lib/store"
import PersonalInfoTab from "@/components/resume/personal-info-tab"
import EducationTab from "@/components/resume/education-tab"
import ExperienceTab from "@/components/resume/experience-tab"
import ProjectsTab from "@/components/resume/projects-tab"
import SkillsTab from "@/components/resume/skills-tab"
import CertificationsTab from "@/components/resume/certifications-tab"
import ResumePreview from "@/components/resume/resume-preview"
import PDFGenerator from "@/components/resume/pdf-generator"
import TemplateSelection from "@/components/resume/template-selection"
import ReduxProvider from "@/providers/redux-provider"

function ResumeBuilderContent() {
  const dispatch = useAppDispatch()
  const {
    data: resumeData,
    activeTab,
    showTemplateSelection,
    selectedTemplate,
  } = useAppSelector((state) => state.resume)
  const [isGenerating, setIsGenerating] = useState(false)

  const tabs = ["personal-info", "education", "experience", "projects", "skills", "certifications"]
  const currentTabIndex = tabs.indexOf(activeTab)

  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      dispatch(setActiveTab(tabs[currentTabIndex - 1]))
    }
  }

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      dispatch(setActiveTab(tabs[currentTabIndex + 1]))
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    dispatch(selectTemplate(templateId))
  }

  const handleBackToTemplates = () => {
    dispatch(resetToTemplateSelection())
  }

  const { generatePDF } = PDFGenerator({ resumeData, onGenerate: setIsGenerating })

  // Show template selection if no template is selected
  if (showTemplateSelection) {
    return <TemplateSelection onTemplateSelect={handleTemplateSelect} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTemplates}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm text-muted-foreground">
                Template: <span className="font-medium capitalize">{selectedTemplate}</span>
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">Create and customize your professional resume</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <Card className="h-[calc(100vh-200px)] overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={(value) => dispatch(setActiveTab(value))}
              className="h-full flex flex-col"
            >
              <div className="border-b p-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="personal-info" className="text-xs">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="text-xs">
                    Certifications
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="personal-info" className="m-0 p-4">
                  <PersonalInfoTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
                <TabsContent value="education" className="m-0 p-4">
                  <EducationTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
                <TabsContent value="experience" className="m-0 p-4">
                  <ExperienceTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
                <TabsContent value="projects" className="m-0 p-4">
                  <ProjectsTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
                <TabsContent value="skills" className="m-0 p-4">
                  <SkillsTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
                <TabsContent value="certifications" className="m-0 p-4">
                  <CertificationsTab onPrevious={goToPreviousTab} onNext={goToNextTab} />
                </TabsContent>
              </div>
            </Tabs>
          </Card>

          {/* Right Panel - Preview */}
          <Card className="h-[calc(100vh-200px)] overflow-hidden">
            <div className="border-b p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Resume Preview</h3>
                <p className="text-sm text-muted-foreground">Here is a preview of your resume.</p>
              </div>
              <Button onClick={generatePDF} disabled={isGenerating} size="sm">
                {isGenerating ? (
                  <>Generating PDF...</>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
            <div className="h-[calc(100%-80px)] overflow-y-auto p-4">
              <ResumePreview resumeData={resumeData} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ResumeBuilderPage() {
  return (
    <ReduxProvider>
      <ResumeBuilderContent />
    </ReduxProvider>
  )
}
