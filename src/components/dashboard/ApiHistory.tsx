
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiHistory as ApiHistoryType, apiService } from "@/services/apiService";
import { Clock, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const ApiHistory = () => {
  const [history, setHistory] = useState<ApiHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteFromHistory(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-border">
        <CardTitle className="text-xl flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          API History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground flex-col">
            <Clock className="h-12 w-12 mb-2 opacity-20" />
            <p>No API history yet</p>
            <p className="text-sm">Generated APIs will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.url}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                    <div 
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        item.status === "success" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={item.apiEndpoint} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
