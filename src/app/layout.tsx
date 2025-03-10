import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import StyledComponentsRegistry from "../lib/AntRegistry";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/theme-provider";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evalurez",
  description: "Get started today and Upload your resume for analysis!",
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/sign-in"}>
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StyledComponentsRegistry>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
