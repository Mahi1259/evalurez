"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  // Check if current path is a sign-in or sign-up route
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  return (
    <div className="navbar-container">
      <ul className="flex justify-between items-center py-4 px-4 md:px-9 rounded-lg w-full text-xl">
        <Link href="/">
          <h1>
            <Image
              src="/new.png"
              alt="Company Logo"
              width={180}
              height={140}
              priority
              className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
            />
          </h1>
        </Link>

        <div className="flex gap-2 md:gap-4 items-center">
          {isSignedIn && (
            <Link href="/dashboard">
              <li className="text-base">
                <span className="text-[16px] md:text-[18px]"></span>
              </li>
            </Link>
          )}

          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-2">
              <span
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } text-[15px] md:text-[17px]`}
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
          <ModeToggle />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
