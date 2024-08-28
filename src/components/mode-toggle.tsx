"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure that the component is mounted and theme is correctly applied
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing until the component is mounted

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 ease-in-out flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <MoonOutlined
          className="transition-transform transform rotate-180"
          style={{ fontSize: 24, color: "#9b5de5" }}
        />
      ) : (
        <SunOutlined
          className="transition-transform transform rotate-180"
          style={{ fontSize: 24, color: "#9b5de5" }} 
        />
      )}
    </button>
  );
}
