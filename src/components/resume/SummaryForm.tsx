// src/components/resume/SummaryForm.tsx
'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SummaryFormProps {
  data: string;
  onChange: (summary: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
      
      <div>
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Passionate software developer with 3+ years of experience in full-stack development and cloud technologies. Proficient in React, Node.js, and AWS with a strong background in building scalable web applications..."
          rows={4}
          className="resize-none"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Write a brief overview of your professional background and key strengths.
        </p>
      </div>
    </div>
  );
};