export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
  summary: string
}

export interface Education {
  institution: string
  degree: string
  location: string
  startDate: string
  endDate: string
}

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  responsibilities: string[]
}

export interface Project {
  name: string
  date: string
  description: string
}

export interface Skills {
  languages: string[]
  frameworks: string[]
  tools: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skills
  achievements: string[]
  summary: string // Added this missing property
}
