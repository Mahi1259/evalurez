// src/components/resume/ResumePreview.tsx
'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, summary, education, experience, projects, technicalSkills, achievements } = data;

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg max-w-4xl mx-auto" 
      style={{ 
        fontFamily: '"Times New Roman", serif',
        fontSize: '11pt',
        lineHeight: '1.2',
        padding: '0.6in 0.5in',
        minHeight: '11in',
        width: '8.5in'
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2" style={{ fontSize: '24pt' }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Summary
          </h2>
          <p className="text-justify leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="italic text-sm">{edu.degree}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold">{edu.startDate} -- {edu.endDate}</p>
                  <p className="italic">{edu.location}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{exp.company}</h3>
                  <p className="italic text-sm">{exp.position}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold">{exp.startDate} -- {exp.endDate}</p>
                </div>
              </div>
              <ul className="list-disc ml-4 space-y-1">
                {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, index) => (
                  <li key={index} className="text-sm leading-relaxed">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm font-bold">{project.date}</p>
              </div>
              <p className="text-sm leading-relaxed mb-1">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-sm italic">
                  <span className="font-bold">Technologies:</span> {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {(technicalSkills.languages.length > 0 || technicalSkills.frameworks.length > 0 || technicalSkills.tools.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="space-y-2 text-sm">
            {technicalSkills.languages.length > 0 && (
              <div>
                <span className="font-bold">Languages: </span>
                <span>{technicalSkills.languages.join(', ')}</span>
              </div>
            )}
            {technicalSkills.frameworks.length > 0 && (
              <div>
                <span className="font-bold">Frameworks/Libraries: </span>
                <span>{technicalSkills.frameworks.join(', ')}</span>
              </div>
            )}
            {technicalSkills.tools.length > 0 && (
              <div>
                <span className="font-bold">Tools & Technologies: </span>
                <span>{technicalSkills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
            Achievements & Certifications
          </h2>
          <ul className="list-disc ml-4 space-y-1">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="text-sm">
                {achievement.title}{achievement.date && ` (${achievement.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};