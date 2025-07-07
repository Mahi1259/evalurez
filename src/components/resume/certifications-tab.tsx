"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addAchievement, updateAchievement, removeAchievement } from "@/lib/store"

interface CertificationsTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function CertificationsTab({ onPrevious, onNext }: CertificationsTabProps) {
  const dispatch = useAppDispatch()
  const achievements = useAppSelector((state) => state.resume.data.achievements)

  const handleAddAchievement = () => {
    dispatch(addAchievement())
  }

  const handleUpdateAchievement = (index: number, value: string) => {
    dispatch(updateAchievement({ index, value }))
  }

  const handleRemoveAchievement = (index: number) => {
    dispatch(removeAchievement(index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Achievements & Certifications</h3>
          <p className="text-sm text-muted-foreground">Add your certifications and achievements</p>
        </div>
        <Button onClick={handleAddAchievement} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="flex-1 space-y-2">
            <Label>Achievement {index + 1}</Label>
            <Input
              value={achievement}
              onChange={(e) => handleUpdateAchievement(index, e.target.value)}
              placeholder="AWS Certified Developer Associate (2023)"
            />
          </div>
          <Button onClick={() => handleRemoveAchievement(index)} variant="ghost" size="sm" className="mt-6">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <NavigationButtons currentTab="certifications" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
