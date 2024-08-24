"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../app/hooks/auth";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !user && pathname === "/dashboard") {
      router.push("/login");
    }
  }, [user, router, pathname]);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar-container">
      <ul className="flex justify-between items-center py-4 px-9 rounded-lg w-full text-xl">
        <Link href="/">
          <h1>
            <Image
              src="/new.png"
              alt="Company Logo"
              width={180}
              height={100}
              priority
              className="-mt-2"
              style={{ width: "auto", height: "auto" }}
            />
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          {user && (
            <Link href="/dashboard">
              <li className="text-base">
                <span className="text-[18px]">Dashboard</span>
              </li>
            </Link>
          )}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } text-[17px] flex items-center gap-1`}
              >
                {user.name}
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                  <li
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <li className="text-base">
                  <span className="text-lg">Login</span>
                </li>
              </Link>
              <Link href="/register">
                <li className="text-base">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-lg text-lg">
                    Register
                  </span>
                </li>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
