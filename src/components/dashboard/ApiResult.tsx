
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiResponse } from "@/services/apiService";
import { Check, Clipboard, Code, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ApiResultProps {
  result: ApiResponse;
  onClear: () => void;
}

export const ApiResult = ({ result, onClear }: ApiResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEndpoint = () => {
    if (result.apiEndpoint) {
      navigator.clipboard.writeText(result.apiEndpoint);
      setCopied(true);
      toast.success("API endpoint copied to clipboard");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleCopyDocs = () => {
    if (result.documentation) {
      navigator.clipboard.writeText(result.documentation);
      toast.success("Documentation copied to clipboard");
    }
  };

  return (
    <motion.div 
      className="space-y-6" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg overflow-hidden bg-white/90 dark:bg-black/60 backdrop-blur-md border border-purple-100 dark:border-purple-900/30">
        <CardHeader className="bg-primary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-300">API Generated Successfully</CardTitle>
              <CardDescription>Your website has been converted to an API</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClear}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              New Conversion
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">API Endpoint</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted p-3 rounded-md font-mono text-sm truncate overflow-x-auto">
                  {result.apiEndpoint}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyEndpoint}
                  className={cn(
                    "transition-all duration-200",
                    copied && "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                  )}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="docs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="docs">
                  <Code className="h-4 w-4 mr-2" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger value="raw">
                  <FileText className="h-4 w-4 mr-2" />
                  Raw Docs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="docs" className="mt-4">
                <div className="border rounded-md p-4 bg-muted/30">
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: result.documentation ? 
                        result.documentation
                          .replace(/^### /gm, '<h3 class="text-lg font-semibold mt-4 mb-2">')
                          .replace(/^## /gm, '<h2 class="text-xl font-bold mt-6 mb-3">')
                          .replace(/^#### /gm, '<h4 class="text-base font-semibold mt-3 mb-1">')
                          .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-muted-foreground/20 rounded text-sm">$1</code>')
                          .replace(/```([\s\S]*?)```/gm, '<pre class="bg-muted-foreground/10 p-3 rounded-md overflow-x-auto text-sm my-3">$1</pre>')
                          .split('\n').join('<br />') 
                        : "" 
                    }} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="raw" className="mt-4">
                <div className="relative">
                  <pre className="language-markdown rounded-md bg-muted/30 p-4 overflow-x-auto text-sm">
                    {result.documentation || "No documentation available"}
                  </pre>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                    onClick={handleCopyDocs}
                  >
                    <Clipboard className="h-3 w-3 mr-2" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
