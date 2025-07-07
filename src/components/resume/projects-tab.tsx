"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import NavigationButtons from "./navigation-buttons"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addProject, updateProject, removeProject } from "@/lib/store"

interface ProjectsTabProps {
  onPrevious: () => void
  onNext: () => void
}

export default function ProjectsTab({ onPrevious, onNext }: ProjectsTabProps) {
  const dispatch = useAppDispatch()
  const projects = useAppSelector((state) => state.resume.data.projects)

  const handleAddProject = () => {
    dispatch(addProject())
  }

  const handleUpdateProject = (index: number, field: string, value: string) => {
    dispatch(updateProject({ index, field, value }))
  }

  const handleRemoveProject = (index: number) => {
    dispatch(removeProject(index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-sm text-muted-foreground">Showcase your key projects</p>
        </div>
        <Button onClick={handleAddProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Project {index + 1}</h4>
            <Button onClick={() => handleRemoveProject(index)} variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={project.name}
                onChange={(e) => handleUpdateProject(index, "name", e.target.value)}
                placeholder="E-Commerce Platform"
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                value={project.date}
                onChange={(e) => handleUpdateProject(index, "date", e.target.value)}
                placeholder="March 2024"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={project.description}
              onChange={(e) => handleUpdateProject(index, "description", e.target.value)}
              placeholder="Describe your project, technologies used, and key achievements..."
              rows={3}
            />
          </div>
        </div>
      ))}
      <NavigationButtons currentTab="projects" onPrevious={onPrevious} onNext={onNext} />
    </div>
  )
}
