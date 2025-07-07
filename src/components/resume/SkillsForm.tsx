// src/components/resume/SkillsForm.tsx
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TechnicalSkills } from '@/types/resume';

interface SkillsFormProps {
  data: TechnicalSkills;
  onChange: (skills: TechnicalSkills) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const updateSkills = (field: keyof TechnicalSkills, value: string) => {
    // Store as single string to preserve user formatting (commas, spaces, etc.)
    const skillsArray = value ? [value] : [];
    onChange({ ...data, [field]: skillsArray });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Technical Skills</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="languages">Programming Languages</Label>
          <Input
            id="languages"
            value={data.languages.join('')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSkills('languages', e.target.value)}
            placeholder="JavaScript, TypeScript, Python, Java, HTML, CSS, SQL"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter your programming languages (formatting will be preserved)
          </p>
        </div>
        
        <div>
          <Label htmlFor="frameworks">Frameworks & Libraries</Label>
          <Input
            id="frameworks"
            value={data.frameworks.join('')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSkills('frameworks', e.target.value)}
            placeholder="React, Node.js, Express.js, Next.js, Bootstrap, Material-UI"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter your frameworks and libraries (formatting will be preserved)
          </p>
        </div>
        
        <div>
          <Label htmlFor="tools">Tools & Technologies</Label>
          <Input
            id="tools"
            value={data.tools.join('')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSkills('tools', e.target.value)}
            placeholder="Git, Docker, AWS, MongoDB, PostgreSQL, Firebase, Jest, Postman"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter your tools and technologies (formatting will be preserved)
          </p>
        </div>
      </div>
    </div>
  );
};