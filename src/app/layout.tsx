import type { Metadata } from "next";
import "./globals.css";
import { StartupProvider } from "@/context/StartupContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "FounderOS – AI Operating System for Startups",
  description: "Your autonomous AI Co-Founder for building, launching, and scaling better startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          <StartupProvider>{children}</StartupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
