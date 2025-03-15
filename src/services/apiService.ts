
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

// Mock service that would connect to our Python Flask backend
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
    // In a real app, this would save to MongoDB
    const historyItem: ApiHistory = {
      ...apiData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    // Store in localStorage for demo purposes
    const existingHistory = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
    const updatedHistory = [historyItem, ...existingHistory];
    localStorage.setItem("apiHistory", JSON.stringify(updatedHistory));
    
    toast.success("API saved to history");
    return historyItem;
  },
  
  getHistory: async (): Promise<ApiHistory[]> => {
    // In a real app, this would fetch from MongoDB
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const history = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
        resolve(history);
      }, 500);
    });
  },
  
  deleteFromHistory: async (id: string): Promise<void> => {
    // In a real app, this would delete from MongoDB
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const existingHistory = JSON.parse(localStorage.getItem("apiHistory") || "[]") as ApiHistory[];
        const updatedHistory = existingHistory.filter(item => item.id !== id);
        localStorage.setItem("apiHistory", JSON.stringify(updatedHistory));
        toast.success("API removed from history");
        resolve();
      }, 300);
    });
  },
};
