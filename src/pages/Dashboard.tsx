
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ApiForm } from "@/components/dashboard/ApiForm";
import { ApiResult } from "@/components/dashboard/ApiResult";
import { ApiHistory } from "@/components/dashboard/ApiHistory";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { ApiResponse } from "@/services/apiService";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const handleApiGenerated = (response: ApiResponse) => {
    setIsLoading(false);
    setApiResult(response);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setApiResult(null);
  };

  const handleClear = () => {
    setApiResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/10 dark:to-background">
      {/* Header */}
      <header className="glass-effect backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-border sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="w-4 h-8 bg-purple-500 rounded-l-full absolute left-0"></div>
              <div className="w-4 h-8 bg-purple-600 rounded-r-full absolute right-0"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Web<span className="text-primary">2</span>Api
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in">Dashboard</h1>
          <p className="text-muted-foreground animate-fade-in animate-delay-100">
            Convert any website into a structured API
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {!isLoading && !apiResult && (
              <div className="animate-fade-in" onSubmit={() => handleSubmit()}>
                <ApiForm onApiGenerated={handleApiGenerated} />
              </div>
            )}
            
            {isLoading && <LoadingState />}
            
            {!isLoading && apiResult && (
              <ApiResult result={apiResult} onClear={handleClear} />
            )}
          </div>
          
          <div className="md:row-span-2 animate-fade-in animate-delay-200">
            <ApiHistory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
