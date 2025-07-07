// src/components/resume/ProjectsForm.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      date: '',
      description: '',
      technologies: []
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(project => project.id === id ? { ...project, [field]: value } : project));
  };

  const updateTechnologies = (id: string, techString: string) => {
    // Store as array with single string to preserve formatting
    const technologies = techString ? [techString] : [];
    updateProject(id, 'technologies', technologies);
  };

  const getTechnologiesString = (technologies?: string[]) => {
    return technologies && technologies.length > 0 ? technologies[0] : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <Button onClick={addProject} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {data.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
                <Input
                  id={`project-name-${project.id}`}
                  value={project.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="E-Commerce Platform"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`project-date-${project.id}`}>Date *</Label>
                <Input
                  id={`project-date-${project.id}`}
                  value={project.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(project.id, 'date', e.target.value)}
                  placeholder="March 2024"
                  required
                />
              </div>
            </div>
            
            <Button
              onClick={() => removeProject(project.id)}
              variant="outline"
              size="sm"
              className="ml-4 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`project-description-${project.id}`}>Description *</Label>
            <Textarea
              id={`project-description-${project.id}`}
              value={project.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Built a full-stack e-commerce application using React, Node.js, Express.js, and MongoDB. Implemented user authentication, product catalog, shopping cart, and payment integration using Stripe API."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor={`project-technologies-${project.id}`}>Technologies</Label>
            <Input
              id={`project-technologies-${project.id}`}
              value={getTechnologiesString(project.technologies)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTechnologies(project.id, e.target.value)}
              placeholder="React, Node.js, Express.js, MongoDB, Stripe API"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter technologies used (formatting will be preserved)
            </p>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet.</p>
          <Button onClick={addProject} variant="outline" className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};