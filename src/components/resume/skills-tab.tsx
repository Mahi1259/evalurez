"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateSkills } from "@/lib/store"

interface SkillsTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function SkillsTab({ onPrevious, onNext }: SkillsTabProps) {
  const dispatch = useAppDispatch()
  const skills = useAppSelector((state) => state.resume.data.skills)

  const handleUpdateSkills = (category: string, value: string) => {
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill)
    dispatch(updateSkills({ category, skills: skillsArray }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
        <p className="text-sm text-muted-foreground mb-4">List your technical skills separated by commas</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Input
            id="languages"
            value={skills.languages.join(", ")}
            onChange={(e) => handleUpdateSkills("languages", e.target.value)}
            placeholder="JavaScript, TypeScript, Python, Java, HTML, CSS, SQL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frameworks">Frameworks/Libraries</Label>
          <Input
            id="frameworks"
            value={skills.frameworks.join(", ")}
            onChange={(e) => handleUpdateSkills("frameworks", e.target.value)}
            placeholder="React, Node.js, Express.js, Next.js, Bootstrap, Material-UI"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tools">Tools & Technologies</Label>
          <Input
            id="tools"
            value={skills.tools.join(", ")}
            onChange={(e) => handleUpdateSkills("tools", e.target.value)}
            placeholder="Git, Docker, AWS, MongoDB, PostgreSQL, Firebase, Jest, Postman"
          />
        </div>
      </div>
      <NavigationButtons currentTab="skills" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
