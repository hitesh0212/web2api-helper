
import { Button } from "@/components/ui/button";
import { Moon, Stars, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Add particles effect when toggling theme
  const createParticles = () => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Use appropriate color based on theme
      const particleColor = isDarkMode ? 
        `rgb(${255}, ${255}, ${Math.floor(Math.random() * 100) + 155})` : 
        `rgb(${Math.floor(Math.random() * 100) + 100}, ${50}, ${255})`;
      
      particle.style.position = 'fixed';
      particle.style.borderRadius = '50%';
      particle.style.width = `${Math.random() * 10 + 3}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = particleColor;
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particleColor}`;
      particle.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
      particle.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.opacity = '1';
      particle.style.transition = 'all 1s ease-out';
      
      document.body.appendChild(particle);
      
      // Random angle for the particle
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const destinationX = Math.cos(angle) * distance + (buttonRect.left + buttonRect.width / 2);
      const destinationY = Math.sin(angle) * distance + (buttonRect.top + buttonRect.height / 2);
      
      // Apply animation
      setTimeout(() => {
        particle.style.transform = `translate(${destinationX - (buttonRect.left + buttonRect.width / 2)}px, ${destinationY - (buttonRect.top + buttonRect.height / 2)}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove particles after animation
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 1000);
    }
  };
  
  const handleToggle = () => {
    createParticles();
    toggleTheme();
  };
  
  // Add stars animation in dark mode
  useEffect(() => {
    if (!isDarkMode) return;
    
    // Only add stars if they don't already exist
    const existingStars = document.getElementById('stars-container');
    if (existingStars) return;
    
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '-1';
    document.body.appendChild(starsContainer);
    
    // Create stars
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.boxShadow = '0 0 10px white';
      star.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite alternate`;
      starsContainer.appendChild(star);
    }
    
    // Add twinkle animation if it doesn't exist
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
    
    return () => {
      // Clean up stars when component unmounts or theme changes
      if (document.body.contains(starsContainer)) {
        document.body.removeChild(starsContainer);
      }
    };
  }, [isDarkMode]);

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="rounded-full w-9 h-9 transition-all duration-300 hover:scale-110 hover:bg-primary/20"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <div className="relative">
          <Moon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          <Stars className="h-[0.6rem] w-[0.6rem] absolute -top-1 -right-1 text-purple-300 animate-pulse opacity-80" />
        </div>
      ) : (
        <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-500 animate-spin-slow" />
      )}
    </Button>
  );
};
