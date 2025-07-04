"use client"

import type React from "react"

import Sidebar from "./components/Sidebar"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === "dark"

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar show={sidebarVisible} setter={setSidebarVisible} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
