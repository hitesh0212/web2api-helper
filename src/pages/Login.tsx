
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You are now logged in.",
      });
      setIsLoading(false);
      // In a real app, we would store the auth token
      navigate("/dashboard");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login process
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You are now logged in with Google.",
      });
      setIsLoading(false);
      // In a real app, we would store the auth token
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-background">
        <Card className="w-full max-w-md animate-fade-in shadow-xl glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 h-12" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current">
                  <path d="M12.048 11.952v4.094h5.795c-.23 1.496-1.795 4.382-5.795 4.382-3.486 0-6.334-2.887-6.334-6.445 0-3.558 2.848-6.445 6.334-6.445 1.984 0 3.32.855 4.117 1.59l2.778-2.68c-1.8-1.68-4.116-2.712-6.895-2.712C6.795 3.75 2.47 8.06 2.47 12.952c0 4.892 4.275 9.202 9.578 9.202 5.517 0 9.202-3.895 9.202-9.344 0-.624-.077-1.132-.153-1.59h-9.05z" />
                </svg>
                <span>Sign in with Google</span>
              </Button>
            </div>
            
            <div className="relative">
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
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
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
                  className="h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
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
