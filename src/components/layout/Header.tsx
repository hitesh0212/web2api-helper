
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-4 md:px-6",
        scrolled 
          ? "glass-effect backdrop-blur-md bg-white/70 dark:bg-black/70" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <div className="relative w-8 h-8 overflow-hidden">
            <div className="w-4 h-8 bg-blue-500 rounded-l-full absolute left-0"></div>
            <div className="w-4 h-8 bg-blue-600 rounded-r-full absolute right-0"></div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Web<span className="text-primary">2</span>Api
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:border-primary"
            >
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button 
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
