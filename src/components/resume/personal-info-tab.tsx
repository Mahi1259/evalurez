"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updatePersonalInfo } from "@/lib/store"

interface PersonalInfoTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function PersonalInfoTab({ onPrevious, onNext }: PersonalInfoTabProps) {
  const dispatch = useAppDispatch()
  const personalInfo = useAppSelector((state) => state.resume.data.personalInfo)

  const handleUpdate = (field: string, value: string) => {
    dispatch(updatePersonalInfo({ field, value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Provide your personal and contact information to help employers reach you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            value={personalInfo.name}
            onChange={(e) => handleUpdate("name", e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleUpdate("email", e.target.value)}
              placeholder="john.smith@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleUpdate("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleUpdate("location", e.target.value)}
            placeholder="New York, NY"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => handleUpdate("linkedin", e.target.value)}
              placeholder="https://www.linkedin.com/in/johnsmith"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={personalInfo.github}
              onChange={(e) => handleUpdate("github", e.target.value)}
              placeholder="https://github.com/johnsmith"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio}
            onChange={(e) => handleUpdate("portfolio", e.target.value)}
            placeholder="https://johnsmith.dev"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => handleUpdate("summary", e.target.value)}
            placeholder="I am a passionate Full-Stack Developer with experience in building modern web applications using JavaScript frameworks. I focus on writing clean, scalable code and creating user-friendly experiences."
            rows={4}
          />
        </div>
      </div>
      <NavigationButtons currentTab="personal-info" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
