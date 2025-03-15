
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define types for our API structure
export interface ApiHistory {
  id: string;
  url: string;
  createdAt: Date;
  apiEndpoint: string;
  status: "success" | "error" | "pending";
  error?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  documentation?: string;
  apiEndpoint?: string;
  error?: string;
}

// Service that connects to Supabase and our Python Flask backend
export const apiService = {
  generateApi: async (url: string): Promise<ApiResponse> => {
    // In a real app, this would call our Flask backend
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Simulate success response
        const mockResponse: ApiResponse = {
          success: true,
          data: {
            title: "Example Website",
            description: "This is a sample website with various content",
            meta: {
              author: "John Doe",
              keywords: ["web", "api", "generator"],
            },
            content: {
              sections: [
                {
                  heading: "Welcome to our site",
                  paragraphs: [
                    "This is the first paragraph of content.",
                    "This is another paragraph with important information.",
                  ],
                },
                {
                  heading: "Features",
                  items: [
                    "Feature 1: Amazing functionality",
                    "Feature 2: Incredible performance",
                    "Feature 3: Outstanding design",
                  ],
                },
              ],
              footer: {
                copyright: "© 2023 Example",
                links: [
                  { text: "Privacy", url: "/privacy" },
                  { text: "Terms", url: "/terms" },
                ],
              },
            },
          },
          documentation: `
## API Documentation

### Base URL
\`https://api.web2api.com/v1/${url.replace(/[^a-zA-Z0-9]/g, "")}\`

### Authentication
All API requests require the use of an API key.

### Endpoints

#### GET /
Returns the full structured content of the website.

#### GET /meta
Returns only the metadata of the website.

#### GET /content
Returns only the content sections of the website.

### Example Request
\`\`\`
curl -X GET "https://api.web2api.com/v1/${url.replace(/[^a-zA-Z0-9]/g, "")}" \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### Example Response
\`\`\`json
{
  "title": "Example Website",
  "description": "This is a sample website with various content",
  "meta": {
    "author": "John Doe",
    "keywords": ["web", "api", "generator"]
  },
  "content": {
    "sections": [
      {
        "heading": "Welcome to our site",
        "paragraphs": [
          "This is the first paragraph of content.",
          "This is another paragraph with important information."
        ]
      },
      {
        "heading": "Features",
        "items": [
          "Feature 1: Amazing functionality",
          "Feature 2: Incredible performance",
          "Feature 3: Outstanding design"
        ]
      }
    ],
    "footer": {
      "copyright": "© 2023 Example",
      "links": [
        { "text": "Privacy", "url": "/privacy" },
        { "text": "Terms", "url": "/terms" }
      ]
    }
  }
}
\`\`\`
          `,
          apiEndpoint: `https://api.web2api.com/v1/${url.replace(/[^a-zA-Z0-9]/g, "")}`,
        };
        
        resolve(mockResponse);
      }, 3000); // Simulate a 3-second processing time
    });
  },
  
  saveToHistory: async (apiData: Omit<ApiHistory, "id" | "createdAt">): Promise<ApiHistory> => {
    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error("User is not authenticated");
      }
      
      const { data, error } = await supabase
        .from('api_history')
        .insert({
          url: apiData.url,
          api_endpoint: apiData.apiEndpoint,
          status: apiData.status,
          error: apiData.error,
          user_id: session.user.id
        })
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error when saving to history:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error("No data returned from save operation");
      }
      
      const historyItem: ApiHistory = {
        id: data.id,
        url: data.url,
        apiEndpoint: data.api_endpoint,
        status: data.status as "success" | "error" | "pending",
        createdAt: new Date(data.created_at),
        error: data.error
      };
      
      toast.success("API saved to history");
      return historyItem;
    } catch (error: any) {
      console.error('Error saving to history:', error);
      toast.error("Failed to save to history");
      
      // Fallback to localStorage if Supabase fails
      const historyItem: ApiHistory = {
        ...apiData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      
      const existingHistory = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
      const updatedHistory = [historyItem, ...existingHistory];
      localStorage.setItem("apiHistory", JSON.stringify(updatedHistory));
      
      return historyItem;
    }
  },
  
  getHistory: async (): Promise<ApiHistory[]> => {
    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return []; // Return empty array if user is not authenticated
      }
      
      const { data, error } = await supabase
        .from('api_history')
        .select('*')
        .eq('user_id', session.user.id) // Filter by the current user's ID
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.id,
        url: item.url,
        apiEndpoint: item.api_endpoint,
        status: item.status as "success" | "error" | "pending",
        createdAt: new Date(item.created_at),
        error: item.error
      }));
    } catch (error) {
      console.error('Error fetching history:', error);
      
      // Fallback to localStorage if Supabase fails
      return new Promise((resolve) => {
        const history = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
        resolve(history);
      });
    }
  },
  
  deleteFromHistory: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('api_history')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("API removed from history");
    } catch (error) {
      console.error('Error deleting from history:', error);
      toast.error("Failed to remove from history");
      
      // Fallback to localStorage if Supabase fails
      const existingHistory = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
      const updatedHistory = existingHistory.filter(item => item.id !== id);
      localStorage.setItem("apiHistory", JSON.stringify(updatedHistory));
    }
  },
};
