
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
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Use appropriate color based on theme
      const particleColor = isDarkMode ? 
        `hsl(${Math.floor(Math.random() * 40) + 260}, 100%, ${Math.floor(Math.random() * 20) + 70}%)` : 
        `hsl(${Math.floor(Math.random() * 40) + 260}, 100%, ${Math.floor(Math.random() * 20) + 50}%)`;
      
      particle.style.position = 'fixed';
      particle.style.borderRadius = '50%';
      particle.style.width = `${Math.random() * 8 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = particleColor;
      particle.style.boxShadow = `0 0 ${Math.random() * 8 + 3}px ${particleColor}`;
      particle.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
      particle.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.opacity = '1';
      particle.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      
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
      }, 800);
    }
  };
  
  const handleToggle = () => {
    createParticles();
    toggleTheme();
  };
  
  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {isDarkMode ? (
        <div className="relative">
          <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 text-purple-300" />
          <Stars className="h-3 w-3 absolute -top-1 -right-1 text-purple-300 animate-pulse opacity-80" />
        </div>
      ) : (
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 text-yellow-500 animate-spin-slow" />
      )}
      <span className="absolute inset-0 rounded-full border border-purple-300/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </Button>
  );
};
