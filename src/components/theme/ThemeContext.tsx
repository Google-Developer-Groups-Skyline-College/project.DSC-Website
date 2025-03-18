"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { theme } from "./theme";

type ThemeMode = "light" | "dark";
type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: typeof theme.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// This script will run on the client before React hydration
// to prevent the flash of incorrect theme
const initializeTheme = `
  function initializeTheme() {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.setAttribute("data-theme", initialTheme);
    return initialTheme;
  }
  const initialTheme = initializeTheme();
`;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Create a script element to run the theme initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run once on component mount
      const existingScript = document.getElementById("theme-initializer");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "theme-initializer";
        script.innerHTML = initializeTheme;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Initialize with 'light' for SSR to prevent hydration mismatch
  const [mode, setMode] = useState<ThemeMode>("light");

  // Give UP~~
  // useEffect(() => {
  //   // Check if dark class is already applied by the script
  //   if (document.documentElement.classList.contains("dark")) {
  //     setMode("dark");
  //   } else {
  //     setMode("light");
  //   }
  // }, []);

  // Update localStorage and HTML classes when theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", mode);

    // Update HTML classes and data attributes
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        setMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentTheme = theme[mode];

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
