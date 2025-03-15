
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <header className="glass-effect backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-border sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden">
            <div className="w-4 h-8 bg-purple-500 rounded-l-full absolute left-0"></div>
            <div className="w-4 h-8 bg-purple-600 rounded-r-full absolute right-0"></div>
          </div>
          <span className="text-xl font-bold tracking-tight animate-pulse-glow">
            Web<span className="text-primary">2</span>Api
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                disabled={isLoading}
                className="border-purple-200 dark:border-purple-800"
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
