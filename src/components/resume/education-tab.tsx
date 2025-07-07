"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addEducation, updateEducation, removeEducation } from "@/lib/store"

interface EducationTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function EducationTab({ onPrevious, onNext }: EducationTabProps) {
  const dispatch = useAppDispatch()
  const education = useAppSelector((state) => state.resume.data.education)

  const handleAddEducation = () => {
    dispatch(addEducation())
  }

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    dispatch(updateEducation({ index, field, value }))
  }

  const handleRemoveEducation = (index: number) => {
    dispatch(removeEducation(index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={handleAddEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Education {index + 1}</h4>
            <Button onClick={() => handleRemoveEducation(index)} variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                value={edu.institution}
                onChange={(e) => handleUpdateEducation(index, "institution", e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => handleUpdateEducation(index, "degree", e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={edu.location}
                onChange={(e) => handleUpdateEducation(index, "location", e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={edu.startDate}
                  onChange={(e) => handleUpdateEducation(index, "startDate", e.target.value)}
                  placeholder="Aug 2020"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={edu.endDate}
                  onChange={(e) => handleUpdateEducation(index, "endDate", e.target.value)}
                  placeholder="May 2024"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <NavigationButtons currentTab="education" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
