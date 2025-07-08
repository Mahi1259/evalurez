"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateSkills } from "@/lib/store"
import { useState, useEffect } from "react"

interface SkillsTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function SkillsTab({ onPrevious, onNext }: SkillsTabProps) {
  const dispatch = useAppDispatch()
  const skills = useAppSelector((state) => state.resume.data.skills)

  // Store raw input values locally to allow free typing
  const [inputValues, setInputValues] = useState({
    languages: "",
    frameworks: "",
    tools: ""
  })

  // Initialize input values from Redux store only once
  useEffect(() => {
    setInputValues({
      languages: skills.languages.join(", "),
      frameworks: skills.frameworks.join(", "),
      tools: skills.tools.join(", ")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only run once on mount

  // Update both local state AND Redux for live preview
  const handleInputChange = (category: string, value: string) => {
    // Update local state for free typing
    setInputValues(prev => ({
      ...prev,
      [category]: value
    }))

    // Also update Redux for live preview
    // Process skills but be more lenient to preserve user's typing experience
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)

    dispatch(updateSkills({ category, skills: skillsArray }))
  }

  // Clean up skills when user finishes typing (optional - for final cleanup)
  const handleSkillsBlur = (category: string, value: string) => {
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)

    dispatch(updateSkills({ category, skills: skillsArray }))
    
    // Update local state to match the cleaned version
    setInputValues(prev => ({
      ...prev,
      [category]: skillsArray.join(", ")
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
        <p className="text-sm text-muted-foreground mb-4">
          List your technical skills separated by commas. You can type freely with commas and spaces.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Input
            id="languages"
            value={inputValues.languages}
            onChange={(e) => handleInputChange("languages", e.target.value)}
            onBlur={(e) => handleSkillsBlur("languages", e.target.value)}
            placeholder="JavaScript, TypeScript, Python, Java, HTML, CSS, SQL"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            ✓ Type freely with commas and spaces: &quot;JavaScript, TypeScript, Python&quot;
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frameworks">Frameworks/Libraries</Label>
          <Input
            id="frameworks"
            value={inputValues.frameworks}
            onChange={(e) => handleInputChange("frameworks", e.target.value)}
            onBlur={(e) => handleSkillsBlur("frameworks", e.target.value)}
            placeholder="React, Node.js, Express.js, Next.js, Bootstrap, Material-UI"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            ✓ Type freely with commas and spaces: &quot;React, Node.js, Express.js&quot;
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tools">Tools & Technologies</Label>
          <Input
            id="tools"
            value={inputValues.tools}
            onChange={(e) => handleInputChange("tools", e.target.value)}
            onBlur={(e) => handleSkillsBlur("tools", e.target.value)}
            placeholder="Git, Docker, AWS, MongoDB, PostgreSQL, Firebase, Jest, Postman"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">✓ Type freely with commas and spaces: &quot;Git, Docker, AWS&quot;</p>
        </div>
      </div>
      <NavigationButtons currentTab="skills" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}