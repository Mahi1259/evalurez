// src/app/(app)/resume-builder/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { SummaryForm } from '@/components/resume/SummaryForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { AchievementsForm } from '@/components/resume/AchievementsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeData, PersonalInfo, Education, Experience, Project, TechnicalSkills, Achievement } from '@/types/resume';
import { Download, Eye, EyeOff } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeBuilder: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    technicalSkills: {
      languages: [],
      frameworks: [],
      tools: []
    },
    achievements: []
  });

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: TechnicalSkills) => {
    setResumeData(prev => ({ ...prev, technicalSkills: skills }));
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setResumeData(prev => ({ ...prev, achievements }));
  };

  const downloadResume = async () => {
    setIsGenerating(true);
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        background: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-gray-600">Create a professional resume in minutes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className={`${showPreview ? 'lg:w-1/2' : 'w-full'} space-y-6`}>
            <Card className="p-6">
              <PersonalInfoForm 
                data={resumeData.personalInfo} 
                onChange={updatePersonalInfo} 
              />
            </Card>

            <Card className="p-6">
              <SummaryForm 
                data={resumeData.summary} 
                onChange={updateSummary} 
              />
            </Card>

            <Card className="p-6">
              <EducationForm 
                data={resumeData.education} 
                onChange={updateEducation} 
              />
            </Card>

            <Card className="p-6">
              <ExperienceForm 
                data={resumeData.experience} 
                onChange={updateExperience} 
              />
            </Card>

            <Card className="p-6">
              <ProjectsForm 
                data={resumeData.projects} 
                onChange={updateProjects} 
              />
            </Card>

            <Card className="p-6">
              <SkillsForm 
                data={resumeData.technicalSkills} 
                onChange={updateSkills} 
              />
            </Card>

            <Card className="p-6">
              <AchievementsForm 
                data={resumeData.achievements} 
                onChange={updateAchievements} 
              />
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:w-1/2">
              <div className="sticky top-8">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-6 right-6 flex gap-4">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="lg"
            className="shadow-lg"
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <Button
            onClick={downloadResume}
            disabled={isGenerating}
            size="lg"
            className="shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;