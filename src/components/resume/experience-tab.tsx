"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addExperience, updateExperience, removeExperience } from "@/lib/store"

interface ExperienceTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function ExperienceTab({ onPrevious, onNext }: ExperienceTabProps) {
  const dispatch = useAppDispatch()
  const experience = useAppSelector((state) => state.resume.data.experience)

  const handleAddExperience = () => {
    dispatch(addExperience())
  }

  const handleUpdateExperience = (index: number, field: string, value: string | string[]) => {
    dispatch(updateExperience({ index, field, value }))
  }

  const handleRemoveExperience = (index: number) => {
    dispatch(removeExperience(index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Experience</h3>
          <p className="text-sm text-muted-foreground">Add your work experience</p>
        </div>
        <Button onClick={handleAddExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Experience {index + 1}</h4>
            <Button onClick={() => handleRemoveExperience(index)} variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => handleUpdateExperience(index, "position", e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => handleUpdateExperience(index, "location", e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => handleUpdateExperience(index, "startDate", e.target.value)}
                  placeholder="Jan 2022"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={exp.endDate}
                  onChange={(e) => handleUpdateExperience(index, "endDate", e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Responsibilities</Label>
            <Textarea
              value={exp.responsibilities.join("\n")}
              onChange={(e) => {
                const responsibilities = e.target.value.split("\n").filter((r) => r.trim())
                handleUpdateExperience(index, "responsibilities", responsibilities)
              }}
              placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
              rows={4}
            />
          </div>
        </div>
      ))}
      <NavigationButtons currentTab="experience" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
