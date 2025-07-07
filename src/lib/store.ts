import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ResumeData } from "@/types/resume"

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "John Smith",
    title: "Full Stack Developer",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "https://www.linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    portfolio: "https://johnsmith.dev",
    summary:
      "Passionate software developer with 3+ years of experience in full-stack development and cloud technologies. Proficient in React, Node.js, and AWS with a strong background in building scalable web applications. Experienced in agile methodologies and collaborative development environments.",
  },
  education: [
    {
      institution: "State University",
      degree: "Bachelor of Science in Computer Science",
      location: "City, State",
      startDate: "Aug 2020",
      endDate: "May 2024",
    },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Full Stack Developer",
      location: "",
      startDate: "June 2023",
      endDate: "Present",
      responsibilities: [
        "Developed and maintained React applications serving 10,000+ users, improving user engagement by 25%.",
        "Built RESTful APIs using Node.js and Express.js, reducing response times by 30%.",
        "Collaborated with cross-functional teams in agile environment to deliver features on schedule.",
      ],
    },
    {
      company: "Digital Innovations LLC",
      position: "Software Developer Intern",
      location: "",
      startDate: "Jan 2022",
      endDate: "May 2023",
      responsibilities: [
        "Implemented responsive web components using React and CSS, enhancing mobile user experience.",
        "Participated in code reviews and testing processes, contributing to 95% bug-free releases.",
      ],
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      date: "March 2024",
      description:
        "Built a full-stack e-commerce application using React, Node.js, Express.js, and MongoDB. Implemented user authentication, product catalog, shopping cart, and payment integration using Stripe API.",
    },
    {
      name: "Task Management App",
      date: "January 2024",
      description:
        "Developed a collaborative task management application with real-time updates using Socket.io, React, and Firebase. Features include team collaboration, deadline tracking, and progress visualization.",
    },
    {
      name: "Weather Dashboard",
      date: "November 2023",
      description:
        "Created a responsive weather dashboard using React and OpenWeatherMap API. Displays current weather, 7-day forecast, and interactive maps with location-based search functionality.",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS", "SQL"],
    frameworks: ["React", "Node.js", "Express.js", "Next.js", "Bootstrap", "Material-UI"],
    tools: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Firebase", "Jest", "Postman"],
  },
  achievements: [
    "AWS Certified Developer Associate (2023)",
    "Winner of University Hackathon 2023 - Best Web Application",
    "Dean's List - Fall 2022, Spring 2023",
  ],
  summary:
    "Passionate software developer with 3+ years of experience in full-stack development and cloud technologies. Proficient in React, Node.js, and AWS with a strong background in building scalable web applications. Experienced in agile methodologies and collaborative development environments.",
}

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    data: initialResumeData,
    activeTab: "personal-info",
    isLoaded: true, // Always loaded since we're not using localStorage
    selectedTemplate: "", // Add template selection state
    showTemplateSelection: true, // Add flag to show template selection
  },
  reducers: {
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload
      state.showTemplateSelection = false
    },
    resetToTemplateSelection: (state) => {
      state.showTemplateSelection = true
      state.selectedTemplate = ""
      state.activeTab = "personal-info"
      // Reset data to initial state
      state.data = initialResumeData
    },
    updatePersonalInfo: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload
      state.data.personalInfo = {
        ...state.data.personalInfo,
        [field]: value,
      }
      // Removed localStorage save
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.data.summary = action.payload
      // Removed localStorage save
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    addEducation: (state) => {
      state.data.education.push({
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
      })
      // Removed localStorage save
    },
    updateEducation: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
      const { index, field, value } = action.payload
      if (state.data.education[index]) {
        state.data.education[index] = {
          ...state.data.education[index],
          [field]: value,
        }
        // Removed localStorage save
      }
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.data.education = state.data.education.filter((_, i) => i !== action.payload)
      // Removed localStorage save
    },
    addExperience: (state) => {
      state.data.experience.push({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      })
      // Removed localStorage save
    },
    updateExperience: (state, action: PayloadAction<{ index: number; field: string; value: string | string[] }>) => {
      const { index, field, value } = action.payload
      if (state.data.experience[index]) {
        state.data.experience[index] = {
          ...state.data.experience[index],
          [field]: value,
        }
        // Removed localStorage save
      }
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.data.experience = state.data.experience.filter((_, i) => i !== action.payload)
      // Removed localStorage save
    },
    addProject: (state) => {
      state.data.projects.push({
        name: "",
        date: "",
        description: "",
      })
      // Removed localStorage save
    },
    updateProject: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
      const { index, field, value } = action.payload
      if (state.data.projects[index]) {
        state.data.projects[index] = {
          ...state.data.projects[index],
          [field]: value,
        }
        // Removed localStorage save
      }
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.data.projects = state.data.projects.filter((_, i) => i !== action.payload)
      // Removed localStorage save
    },
    updateSkills: (state, action: PayloadAction<{ category: string; skills: string[] }>) => {
      const { category, skills } = action.payload
      state.data.skills = {
        ...state.data.skills,
        [category]: skills,
      }
      // Removed localStorage save
    },
    addAchievement: (state) => {
      state.data.achievements.push("")
      // Removed localStorage save
    },
    updateAchievement: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload
      if (state.data.achievements[index] !== undefined) {
        state.data.achievements[index] = value
        // Removed localStorage save
      }
    },
    removeAchievement: (state, action: PayloadAction<number>) => {
      state.data.achievements = state.data.achievements.filter((_, i) => i !== action.payload)
      // Removed localStorage save
    },
  },
})

export const {
  selectTemplate,
  resetToTemplateSelection,
  updatePersonalInfo,
  updateSummary,
  setActiveTab,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addProject,
  updateProject,
  removeProject,
  updateSkills,
  addAchievement,
  updateAchievement,
  removeAchievement,
} = resumeSlice.actions

export const store = configureStore({
  reducer: {
    resume: resumeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
