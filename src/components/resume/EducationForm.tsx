// src/components/resume/EducationForm.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Education } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.map((education) => (
        <div key={education.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="State University"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`location-${education.id}`}>Location *</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`start-date-${education.id}`}>Start Date *</Label>
                  <Input
                    id={`start-date-${education.id}`}
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    placeholder="Aug 2020"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`end-date-${education.id}`}>End Date *</Label>
                  <Input
                    id={`end-date-${education.id}`}
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    placeholder="May 2024"
                    required
                  />
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => removeEducation(education.id)}
              variant="outline"
              size="sm"
              className="ml-4 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <Button onClick={addEducation} variant="outline" className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};