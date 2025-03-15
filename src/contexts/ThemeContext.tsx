
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage first
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    // Otherwise check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply theme with a smooth transition
    const root = document.documentElement;
    
    // Add transition class for smooth theme changes
    root.classList.add('transition-colors', 'duration-300');
    
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Optional: Add some animation to body elements when theme changes
    const bodyElements = document.querySelectorAll('.theme-transition-item');
    bodyElements.forEach((el, index) => {
      // Stagger the animations
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        (el as HTMLElement).style.transform = 'translateY(10px)';
        (el as HTMLElement).style.opacity = '0';
        
        setTimeout(() => {
          (el as HTMLElement).style.transform = 'translateY(0)';
          (el as HTMLElement).style.opacity = '1';
        }, 50);
      }, index * 50);
    });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
