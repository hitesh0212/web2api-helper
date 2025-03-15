
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiHistory as ApiHistoryType, apiService } from "@/services/apiService";
import { Clock, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export const ApiHistory = () => {
  const [history, setHistory] = useState<ApiHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteFromHistory(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-white/90 dark:bg-black/60 backdrop-blur-md border border-purple-100 dark:border-purple-900/30 h-full">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-b border-purple-100 dark:border-purple-900/30">
        <CardTitle className="text-xl flex items-center bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-300">
          <Clock className="h-5 w-5 mr-2" />
          API History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-purple-900 scrollbar-track-transparent">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-16 w-full bg-purple-100/50 dark:bg-purple-900/20" />
            <Skeleton className="h-16 w-full bg-purple-100/50 dark:bg-purple-900/20" />
            <Skeleton className="h-16 w-full bg-purple-100/50 dark:bg-purple-900/20" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground flex-col">
            <Clock className="h-12 w-12 mb-2 opacity-20" />
            <p>No API history yet</p>
            <p className="text-sm">Generated APIs will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-purple-100 dark:divide-purple-900/30">
            {history.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-colors"
              >
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30"
                  >
                    <a href={item.apiEndpoint} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(item.id)}
                    className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
