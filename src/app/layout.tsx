import React from "react";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import StyledComponentsRegistry from "../lib/AntRegistry";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evalurez",
  description: "Get started today and Upload your resume for a analysis!",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={`${inter.className} overflow-y-scroll overflow-x-hidden`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StyledComponentsRegistry>
          <div className="mx-auto text-2xl gap-2 mb-10">
            <Navbar />
            {children}
            <Footer />
          </div>
        </StyledComponentsRegistry>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
