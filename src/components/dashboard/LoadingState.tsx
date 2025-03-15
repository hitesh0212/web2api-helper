
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <Card className="shadow-lg border-0 overflow-hidden animate-pulse">
      <CardContent className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <Loader2 className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold animate-pulse">Converting Website to API</h3>
          <p className="text-muted-foreground">
            We're analyzing the website and generating your API...
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-2">
          <div className="h-2 bg-muted rounded animate-shimmer"></div>
          <div className="h-2 bg-muted rounded w-3/4 animate-shimmer animate-delay-100"></div>
          <div className="h-2 bg-muted rounded w-1/2 animate-shimmer animate-delay-200"></div>
        </div>
      </CardContent>
    </Card>
  );
};
