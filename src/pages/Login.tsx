
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isCardAnimated, setIsCardAnimated] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Card animation on mount
  useEffect(() => {
    setTimeout(() => {
      setIsCardAnimated(true);
    }, 100);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Note: No need to navigate here as the auth state change will trigger the redirect
    } catch (error: any) {
      console.error("Google sign in error:", error);
    }
  };

  // Interactive elements animation on hover
  const animateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    
    // Add ripple style if it doesn't exist
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.innerHTML = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-violet-50/30 to-white dark:from-purple-950/10 dark:via-violet-950/5 dark:to-background -z-10"
        ></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/6 w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-900/20 dark:to-purple-800/10 blur-3xl opacity-40 animate-float-horizontal"></div>
        <div className="absolute bottom-1/4 right-1/6 w-60 h-60 rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 dark:from-violet-900/20 dark:to-fuchsia-900/10 blur-3xl opacity-30 animate-float-vertical"></div>
        
        <Card 
          className={`w-full max-w-md shadow-xl glass-effect relative overflow-hidden transition-all duration-700 ${
            isCardAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Card decorative element */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 blur-xl"></div>
          
          <CardHeader className="space-y-1 text-center relative z-10">
            <CardTitle className="text-2xl font-bold transition-all duration-500 hover:text-purple-600 dark:hover:text-purple-400">
              Welcome back
            </CardTitle>
            <CardDescription className="theme-transition-item">
              Enter your credentials to log in to your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-2 theme-transition-item">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 h-12 relative overflow-hidden hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                onMouseDown={animateButton}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current">
                  <path d="M12.048 11.952v4.094h5.795c-.23 1.496-1.795 4.382-5.795 4.382-3.486 0-6.334-2.887-6.334-6.445 0-3.558 2.848-6.445 6.334-6.445 1.984 0 3.32.855 4.117 1.59l2.778-2.68c-1.8-1.68-4.116-2.712-6.895-2.712C6.795 3.75 2.47 8.06 2.47 12.952c0 4.892 4.275 9.202 9.578 9.202 5.517 0 9.202-3.895 9.202-9.344 0-.624-.077-1.132-.153-1.59h-9.05z" />
                </svg>
                <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
              </Button>
            </div>
            
            <div className="relative theme-transition-item">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 theme-transition-item">
                <Label htmlFor="email" className="text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 transition-all duration-300 focus:border-purple-400 focus:ring-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2 theme-transition-item">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400">
                    Password
                  </Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-primary hover:underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 transition-all duration-300 focus:border-purple-400 focus:ring-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 btn-3d bg-purple-600 hover:bg-purple-700 relative overflow-hidden transition-all duration-300 group"
                disabled={isLoading}
                onMouseDown={animateButton}
              >
                <span className="relative z-10 transition-transform group-hover:scale-110 duration-300">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                      Logging in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center theme-transition-item">
            <p className="text-sm text-muted-foreground w-full">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary hover:underline transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-purple-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
