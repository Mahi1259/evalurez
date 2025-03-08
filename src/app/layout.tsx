import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import StyledComponentsRegistry from "../lib/AntRegistry";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/theme-provider";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evalurez",
  description: "Get started today and Upload your resume for analysis!",
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


const RootLayout = ({ children }: React.PropsWithChildren) => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StyledComponentsRegistry>
            <div className="mx-auto text-2xl gap-2 mb-10">
              {/* Remove the header with SignedIn/SignedOut since we're moving this to Navbar */}
              <Navbar />
              {children}
              <Footer />
            </div>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
