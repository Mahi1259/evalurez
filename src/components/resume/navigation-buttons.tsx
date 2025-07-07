"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationButtonsProps {
  currentTab: string
  onPrevious: () => void
  onNext: () => void
}

const tabs = ["personal-info", "education", "experience", "projects", "skills", "certifications"]
const tabLabels = {
  "personal-info": "Personal Info",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
}

export default function NavigationButtons({ currentTab, onPrevious, onNext }: NavigationButtonsProps) {
  const currentIndex = tabs.indexOf(currentTab)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === tabs.length - 1

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button onClick={onPrevious} disabled={isFirst} variant="outline">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="text-sm text-muted-foreground">
        {currentIndex + 1} of {tabs.length} - {tabLabels[currentTab as keyof typeof tabLabels]}
      </div>

      <Button onClick={onNext} disabled={isLast}>
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
