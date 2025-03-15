
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiResponse } from "@/services/apiService";
import { Check, Clipboard, Code, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

  const handleCopyData = () => {
    if (result.data) {
      navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
      toast.success("API data copied to clipboard");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">API Generated Successfully</CardTitle>
              <CardDescription>Your website has been converted to an API</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClear}>
              New Conversion
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">API Endpoint</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted p-3 rounded-md font-mono text-sm truncate">
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
            
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preview">
                  <FileText className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="docs">
                  <Code className="h-4 w-4 mr-2" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger value="raw">
                  <Code className="h-4 w-4 mr-2" />
                  Raw JSON
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-4 space-y-4">
                <div className="space-y-4 p-4 border rounded-md">
                  <h3 className="font-semibold text-lg">{result.data?.title}</h3>
                  <p className="text-muted-foreground">{result.data?.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Meta Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Author:</div>
                      <div>{result.data?.meta?.author}</div>
                      
                      <div className="font-medium">Keywords:</div>
                      <div>{result.data?.meta?.keywords?.join(", ")}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Content Sections</h4>
                    {result.data?.content?.sections?.map((section: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-3 py-1">
                        <h5 className="font-medium">{section.heading}</h5>
                        {section.paragraphs && (
                          <div className="space-y-1 mt-1 text-sm text-muted-foreground">
                            {section.paragraphs.map((paragraph: string, i: number) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                        {section.items && (
                          <ul className="list-disc list-inside mt-1 text-sm text-muted-foreground">
                            {section.items.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
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
                  <pre className="language-json rounded-md bg-muted/30 p-4 overflow-x-auto text-sm">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={handleCopyData}
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
    </div>
  );
};
