"use client";
import Sidebar from "./components/Sidebar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true); // Ensure that client-side state is fully mounted before applying client-specific logic
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until the client-side is fully mounted
  }

  const isDarkMode = theme === "dark";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar show={sidebarVisible} setter={setSidebarVisible} />
      <div className="w-full overflow-x-auto">
        <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
          <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
            <div className="w-full md:max-w-6xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
