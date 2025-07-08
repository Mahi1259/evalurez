import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ResumeData } from "@/types/resume"

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "John Smith",
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
      location: "San Francisco, CA", // Added location
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
      location: "Austin, TX", // Added location
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

// Save data to localStorage
const saveToLocalStorage = (data: ResumeData) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("resumeData", JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }
}

// Save editing mode state to localStorage
const saveEditingModeToLocalStorage = (isInEditingMode: boolean, selectedTemplate: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        "resumeEditingMode",
        JSON.stringify({
          isInEditingMode,
          selectedTemplate,
        }),
      )
    } catch (error) {
      console.error("Error saving editing mode to localStorage:", error)
    }
  }
}

// Load editing mode state from localStorage
const loadEditingModeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedEditingMode = localStorage.getItem("resumeEditingMode")
      if (savedEditingMode) {
        return JSON.parse(savedEditingMode)
      }
    } catch (error) {
      console.error("Error loading editing mode from localStorage:", error)
    }
  }
  return { isInEditingMode: false, selectedTemplate: "" }
}

// Load data from localStorage
const loadFromLocalStorage = (): ResumeData => {
  if (typeof window !== "undefined") {
    try {
      const savedData = localStorage.getItem("resumeData")
      if (savedData) {
        return JSON.parse(savedData)
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  }
  return initialResumeData
}

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    data: initialResumeData,
    activeTab: "personal-info",
    isLoaded: false,
    selectedTemplate: "",
    showTemplateSelection: true,
  },
  reducers: {
    loadResumeData: (state) => {
      const loadedData = loadFromLocalStorage()
      const editingModeState = loadEditingModeFromLocalStorage()

      // Sync summary fields if they exist
      if (loadedData.personalInfo.summary && !loadedData.summary) {
        loadedData.summary = loadedData.personalInfo.summary
      } else if (loadedData.summary && !loadedData.personalInfo.summary) {
        loadedData.personalInfo.summary = loadedData.summary
      }

      state.data = loadedData
      state.isLoaded = true

      if (editingModeState.isInEditingMode) {
        state.showTemplateSelection = false
        state.selectedTemplate = editingModeState.selectedTemplate || "professional"
      } else {
        state.showTemplateSelection = true
        state.selectedTemplate = ""
      }
    },
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload
      state.showTemplateSelection = false
      saveEditingModeToLocalStorage(true, action.payload)
    },
    resetToTemplateSelection: (state) => {
      state.showTemplateSelection = true
      state.selectedTemplate = ""
      state.activeTab = "personal-info"
      saveEditingModeToLocalStorage(false, "")
    },
    resetToInitialData: (state) => {
      const resetData = { ...initialResumeData }
      resetData.summary = resetData.personalInfo.summary

      state.data = resetData
      state.activeTab = "personal-info"
      saveToLocalStorage(resetData)
    },
    updatePersonalInfo: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload
      state.data.personalInfo = {
        ...state.data.personalInfo,
        [field]: value,
      }

      if (field === "summary") {
        state.data.summary = value
      }

      saveToLocalStorage(state.data)
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.data.summary = action.payload
      saveToLocalStorage(state.data)
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
      saveToLocalStorage(state.data)
    },
    updateEducation: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
      const { index, field, value } = action.payload
      if (state.data.education[index]) {
        state.data.education[index] = {
          ...state.data.education[index],
          [field]: value,
        }
        saveToLocalStorage(state.data)
      }
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.data.education = state.data.education.filter((_, i) => i !== action.payload)
      saveToLocalStorage(state.data)
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
      saveToLocalStorage(state.data)
    },
    updateExperience: (state, action: PayloadAction<{ index: number; field: string; value: string | string[] }>) => {
      const { index, field, value } = action.payload
      if (state.data.experience[index]) {
        state.data.experience[index] = {
          ...state.data.experience[index],
          [field]: value,
        }
        saveToLocalStorage(state.data)
      }
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.data.experience = state.data.experience.filter((_, i) => i !== action.payload)
      saveToLocalStorage(state.data)
    },
    addProject: (state) => {
      state.data.projects.push({
        name: "",
        date: "",
        description: "",
      })
      saveToLocalStorage(state.data)
    },
    updateProject: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
      const { index, field, value } = action.payload
      if (state.data.projects[index]) {
        state.data.projects[index] = {
          ...state.data.projects[index],
          [field]: value,
        }
        saveToLocalStorage(state.data)
      }
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.data.projects = state.data.projects.filter((_, i) => i !== action.payload)
      saveToLocalStorage(state.data)
    },
    updateSkills: (state, action: PayloadAction<{ category: string; skills: string[] }>) => {
      const { category, skills } = action.payload
      state.data.skills = {
        ...state.data.skills,
        [category]: skills,
      }
      saveToLocalStorage(state.data)
    },
    addAchievement: (state) => {
      state.data.achievements.push("")
      saveToLocalStorage(state.data)
    },
    updateAchievement: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload
      if (state.data.achievements[index] !== undefined) {
        state.data.achievements[index] = value
        saveToLocalStorage(state.data)
      }
    },
    removeAchievement: (state, action: PayloadAction<number>) => {
      state.data.achievements = state.data.achievements.filter((_, i) => i !== action.payload)
      saveToLocalStorage(state.data)
    },
  },
})

export const {
  loadResumeData,
  selectTemplate,
  resetToTemplateSelection,
  resetToInitialData,
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
