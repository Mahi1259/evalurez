// src/components/resume/PersonalInfoForm.tsx
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
            placeholder="John Smith"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
            placeholder="john.smith@email.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
            placeholder="New York, NY"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin">LinkedIn Username</Label>
          <Input
            id="linkedin"
            value={data.linkedin || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('linkedin', e.target.value)}
            placeholder="johnsmith"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter just your username (e.g., johnsmith)
          </p>
        </div>
        
        <div>
          <Label htmlFor="github">GitHub Username</Label>
          <Input
            id="github"
            value={data.github || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('github', e.target.value)}
            placeholder="johnsmith"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter just your username (e.g., johnsmith)
          </p>
        </div>
      </div>
    </div>
  );
};