// src/components/resume/AchievementsForm.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Achievement } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({ data, onChange }) => {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      date: ''
    };
    onChange([...data, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    onChange(data.filter(achievement => achievement.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    onChange(data.map(achievement => achievement.id === id ? { ...achievement, [field]: value } : achievement));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Achievements & Certifications</h2>
        <Button onClick={addAchievement} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {data.map((achievement) => (
        <div key={achievement.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <Label htmlFor={`achievement-title-${achievement.id}`}>Achievement/Certification *</Label>
                <Input
                  id={`achievement-title-${achievement.id}`}
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  placeholder="AWS Certified Developer Associate"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor={`achievement-date-${achievement.id}`}>Date</Label>
                <Input
                  id={`achievement-date-${achievement.id}`}
                  value={achievement.date || ''}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  placeholder="2023"
                />
              </div>
            </div>
            
            <Button
              onClick={() => removeAchievement(achievement.id)}
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
          <p>No achievements added yet.</p>
          <Button onClick={addAchievement} variant="outline" className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </div>
      )}
    </div>
  );
};