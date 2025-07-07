"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./template-selection.module.css"

interface Template {
  id: string
  name: string
  description: string
  preview: string
  isPopular?: boolean
}

const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and modern design perfect for corporate positions and professional roles.",
    preview: "/professional-template-preview.png",
    isPopular: true,
  },
  // Future templates can be added here
  // {
  //   id: "creative",
  //   name: "Creative",
  //   description: "Bold and colorful design for creative professionals and designers.",
  //   preview: "/images/creative-template-preview.png",
  // },
  // {
  //   id: "minimal",
  //   name: "Minimal",
  //   description: "Simple and elegant design with focus on content and readability.",
  //   preview: "/images/minimal-template-preview.png",
  // },
]

interface TemplateSelectionProps {
  onTemplateSelect: (templateId: string) => void
}

export default function TemplateSelection({ onTemplateSelect }: TemplateSelectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    // Show header text with animation
    setTimeout(() => setShowHeader(true), 50)
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center mb-6">
          <h1
            className={`text-2xl font-bold mb-2 transition-all duration-300 ease-out ${
              showHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Choose Your Resume Template
          </h1>
          <p
            className={`text-muted-foreground max-w-xl mx-auto transition-all duration-300 ease-out delay-100 ${
              showHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Select a professional template that best represents your style and industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
                selectedTemplate === template.id ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="relative p-3">
                {template.isPopular && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full z-10 animate-pulse">
                    Popular
                  </div>
                )}
                <div className="aspect-[3/4] bg-white rounded-md mb-3 overflow-hidden border shadow-sm transition-transform duration-200 hover:shadow-lg relative">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} template preview`}
                    fill
                    className="object-cover object-top transition-transform duration-200 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={template.isPopular}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  {selectedTemplate === template.id && (
                    <div
                      className={`w-5 h-5 bg-primary rounded-full flex items-center justify-center ${styles.scaleIn}`}
                    >
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            size="default"
            className="px-6 transition-all duration-150 hover:scale-105 disabled:hover:scale-100"
          >
            Continue with Selected Template
          </Button>
          {!selectedTemplate && (
            <p className="text-xs text-muted-foreground mt-2 animate-pulse">Please select a template to continue</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 transition-all duration-150 hover:scale-105">
              <div className={`w-1.5 h-1.5 bg-green-500 rounded-full ${styles.pulseDelay1}`}></div>
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center gap-1.5 transition-all duration-150 hover:scale-105">
              <div className={`w-1.5 h-1.5 bg-blue-500 rounded-full ${styles.pulseDelay2}`}></div>
              <span>Easy Customization</span>
            </div>
            <div className="flex items-center gap-1.5 transition-all duration-150 hover:scale-105">
              <div className={`w-1.5 h-1.5 bg-purple-500 rounded-full ${styles.pulseDelay3}`}></div>
              <span>ATS Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
