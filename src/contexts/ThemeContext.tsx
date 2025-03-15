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
    root.classList.add('transition-colors', 'duration-500');
    
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Add theme-specific particles
    if (isDarkMode) {
      createStars();
    } else {
      createBubbles();
    }
    
    // Clean up previous particles
    return () => {
      const previousParticles = document.getElementById('theme-particles');
      if (previousParticles) {
        previousParticles.remove();
      }
    };
  }, [isDarkMode]);
  
  // Create floating star particles for dark mode
  const createStars = () => {
    // Remove previous particles
    const previousParticles = document.getElementById('theme-particles');
    if (previousParticles) {
      previousParticles.remove();
    }
    
    const container = document.createElement('div');
    container.id = 'theme-particles';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Randomize star properties
      const size = Math.random() * 2 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      // Style the star
      star.style.position = 'absolute';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.top = `${posY}%`;
      star.style.left = `${posX}%`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      star.style.boxShadow = `0 0 ${Math.random() * 3 + 1}px white`;
      star.style.animation = `twinkle ${duration}s infinite alternate ${delay}s`;
      
      container.appendChild(star);
    }
    
    // Add twinkle animation
    if (!document.getElementById('star-animation')) {
      const style = document.createElement('style');
      style.id = 'star-animation';
      style.innerHTML = `
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // Create bubble particles for light mode
  const createBubbles = () => {
    // Remove previous particles
    const previousParticles = document.getElementById('theme-particles');
    if (previousParticles) {
      previousParticles.remove();
    }
    
    const container = document.createElement('div');
    container.id = 'theme-particles';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);
    
    // Create bubbles
    for (let i = 0; i < 50; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      // Randomize bubble properties
      const size = Math.random() * 40 + 10;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Create a gradient for the bubble
      const hue1 = 260 + Math.random() * 40; // Purple range
      const hue2 = hue1 + Math.random() * 20;
      
      // Style the bubble
      bubble.style.position = 'absolute';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.background = `radial-gradient(circle at 30% 30%, hsla(${hue1}, 100%, 90%, 0.2), hsla(${hue2}, 100%, 80%, 0.1))`;
      bubble.style.borderRadius = '50%';
      bubble.style.top = `${posY}%`;
      bubble.style.left = `${posX}%`;
      bubble.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      bubble.style.boxShadow = `0 0 10px hsla(${hue1}, 100%, 70%, 0.1)`;
      bubble.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
      
      container.appendChild(bubble);
    }
    
    // Add float animation
    if (!document.getElementById('bubble-animation')) {
      const style = document.createElement('style');
      style.id = 'bubble-animation';
      style.innerHTML = `
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
  };

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
