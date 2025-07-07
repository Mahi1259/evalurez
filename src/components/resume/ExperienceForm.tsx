// src/components/resume/ExperienceForm.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Experience } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addResponsibility = (experienceId: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      updateExperience(experienceId, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const updateResponsibility = (experienceId: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(experienceId, 'responsibilities', newResponsibilities);
    }
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(experienceId, 'responsibilities', newResponsibilities);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Solutions Inc."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`position-${experience.id}`}>Position *</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Full Stack Developer"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`start-date-${experience.id}`}>Start Date *</Label>
                <Input
                  id={`start-date-${experience.id}`}
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  placeholder="June 2023"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`end-date-${experience.id}`}>End Date *</Label>
                <Input
                  id={`end-date-${experience.id}`}
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  required
                />
              </div>
            </div>
            
            <Button
              onClick={() => removeExperience(experience.id)}
              variant="outline"
              size="sm"
              className="ml-4 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <Label>Responsibilities & Achievements</Label>
            {experience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Textarea
                  value={responsibility}
                  onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                  placeholder="Developed and maintained React applications serving 10,000+ users, improving user engagement by 25%."
                  rows={2}
                  className="flex-1"
                />
                {experience.responsibilities.length > 1 && (
                  <Button
                    onClick={() => removeResponsibility(experience.id, index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => addResponsibility(experience.id)}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Responsibility
            </Button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <Button onClick={addExperience} variant="outline" className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );
};