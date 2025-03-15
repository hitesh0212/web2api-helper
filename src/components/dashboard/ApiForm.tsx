
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiService, ApiResponse } from "@/services/apiService";
import { Link2, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ApiFormProps {
  onApiGenerated: (response: ApiResponse) => void;
}

export const ApiForm = ({ onApiGenerated }: ApiFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiService.generateApi(url);
      
      if (response.success) {
        // Toast notification for successful API generation
        toast({
          title: "API Generated",
          description: "Your API has been successfully generated",
          variant: "default",
        });
        
        // Save to history before notifying parent component
        try {
          await apiService.saveToHistory({
            url,
            apiEndpoint: response.apiEndpoint || "",
            status: "success",
          });
          console.log("API successfully saved to history");
        } catch (saveError) {
          console.error("Error saving to history:", saveError);
        }
        
        // Now notify parent component
        onApiGenerated(response);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate API",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("API generation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-white/90 dark:bg-black/60 backdrop-blur-md animate-fade-in border border-purple-100 dark:border-purple-900/30">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-300">Enter Website URL</h3>
            <p className="text-muted-foreground text-sm">
              Paste the URL of the website you want to convert into an API
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-purple-500 transition-colors">
                <Link2 className="h-5 w-5" />
              </div>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-10 h-12 ring-offset-purple-100 focus-visible:ring-purple-500 transition-all border-purple-100 dark:border-purple-900/30"
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-xl"></div>
            </div>
            <Button 
              type="submit" 
              className="h-12 px-8 btn-3d bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 dark:from-purple-500 dark:to-violet-500 dark:hover:from-purple-600 dark:hover:to-violet-600 group relative overflow-hidden"
              disabled={isLoading}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating API...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Generate API
                </>
              )}
              <span className="absolute -inset-full h-full w-1/3 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:animate-shine"></span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
