// types/resume.ts
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  technologies?: string[];
}

export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface Achievement {
  id: string;
  title: string;
  date?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  technicalSkills: TechnicalSkills;
  achievements: Achievement[];
}