"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { useTheme } from "next-themes"
import { useAuth, useUser, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()

  // State to handle hydration
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if current path is a sign-in or sign-up route
  const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")

  const handleGetStarted = () => {
    router.push("/sign-in")
  }

  // Use resolvedTheme for more reliable theme detection after mount
  const isDarkMode = mounted ? resolvedTheme === "dark" : false

  return (
    <div className="navbar-container">
      <nav className="flex justify-between items-center py-4 px-4 md:px-9 rounded-lg w-full text-xl">
        <Link href="/">
          <Image
            src="/new.png"
            alt="Company Logo"
            width={180}
            height={140}
            priority
            className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
          />
        </Link>

        <div className="flex gap-2 md:gap-4 items-center">
          {/* Dashboard link - only show when signed in */}
          {mounted && isLoaded && isSignedIn && (
            <Link href="/dashboard" className="text-base">
              <span className="text-[16px] md:text-[18px]"></span>
            </Link>
          )}

          {/* Authentication section with consistent height */}
          <div className="flex items-center gap-2 min-h-[36px]">
            {!mounted || !isLoaded ? (
              // Loading skeleton to prevent layout shift
              <div className="flex items-center gap-2">
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            ) : isSignedIn ? (
              // Signed in state
              <div className="flex items-center gap-2">
                <span
                  className={`text-[15px] md:text-[17px] transition-colors duration-200 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {user?.firstName || user?.username || "User"}
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 md:h-9 md:w-9",
                    },
                  }}
                />
              </div>
            ) : (
              // Not signed in state
              <>
                {!isAuthPage && (
                  <div className="text-base">
                    <button
                      onClick={handleGetStarted}
                      className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-2 py-1 rounded-lg text-[16px] md:text-lg font-medium"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
