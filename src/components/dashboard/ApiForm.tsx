
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiService, ApiResponse } from "@/services/apiService";
import { Link2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApiFormProps {
  onApiGenerated: (response: ApiResponse) => void;
}

export const ApiForm = ({ onApiGenerated }: ApiFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        onApiGenerated(response);
        // Save to history
        await apiService.saveToHistory({
          url,
          apiEndpoint: response.apiEndpoint || "",
          status: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate API",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
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
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Enter Website URL</h3>
            <p className="text-muted-foreground text-sm">
              Paste the URL of the website you want to convert into an API
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Link2 className="h-5 w-5" />
              </div>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 px-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating API...
                </>
              ) : (
                "Generate API"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
