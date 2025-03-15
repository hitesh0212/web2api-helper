
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Code, Database, Globe, Link2, RefreshCw, Sparkles } from "lucide-react";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });
    
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.02] -z-10" />
        <div 
          className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 -z-10 rounded-b-[50%] opacity-60"
        />
        
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Transform Any Website Into An <span className="text-gradient">API</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-100">
            Web2Api instantly converts websites into structured APIs with one click. 
            No coding required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base rounded-xl">
                Get Started
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base rounded-xl">
                How It Works
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-fade-in animate-delay-300">
            <div className="relative overflow-hidden pt-[56.25%] bg-secondary/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-3xl glass-effect p-6 rounded-2xl">
                  <div className="h-8 w-full bg-secondary/60 rounded-full mb-4 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <div className="flex-1 text-left text-xs text-muted-foreground">https://web2api.example/dashboard</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/3 bg-secondary/40 h-64 rounded-lg"></div>
                    <div className="w-2/3 space-y-4">
                      <div className="h-8 bg-secondary/40 rounded-lg w-2/3"></div>
                      <div className="h-32 bg-secondary/40 rounded-lg"></div>
                      <div className="h-16 bg-secondary/40 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-4 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 animate-on-scroll opacity-0">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 animate-delay-100">
              Everything you need to extract, transform, and utilize web data efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="Any Website"
              description="Convert static, dynamic, and JavaScript-rendered websites into APIs with ease."
              delay={0}
            />
            <FeatureCard 
              icon={<Code className="h-10 w-10 text-primary" />}
              title="Smart Extraction"
              description="Automatically identifies and extracts key data points from complex websites."
              delay={100}
            />
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-primary" />}
              title="Structured Output"
              description="Get clean, well-organized JSON or other formats ready for integration."
              delay={200}
            />
            <FeatureCard 
              icon={<RefreshCw className="h-10 w-10 text-primary" />}
              title="Real-time Updates"
              description="Keep your data fresh with automated polling and webhooks."
              delay={300}
            />
            <FeatureCard 
              icon={<Link2 className="h-10 w-10 text-primary" />}
              title="API Documentation"
              description="Auto-generated documentation for your new APIs, ready to share with your team."
              delay={400}
            />
            <FeatureCard 
              icon={<Sparkles className="h-10 w-10 text-primary" />}
              title="AI Assistance"
              description="Smart suggestions for extracting the most relevant data from websites."
              delay={500}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 animate-on-scroll opacity-0">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 animate-delay-100">
              Converting websites to APIs has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="01"
              title="Enter URL"
              description="Paste the website URL you want to transform into an API."
              delay={0}
            />
            <StepCard 
              number="02"
              title="Process Data"
              description="Our system analyzes the website content and structure."
              delay={200}
            />
            <StepCard 
              number="03"
              title="Use Your API"
              description="Get your API endpoint with complete documentation."
              delay={400}
            />
          </div>
          
          <div className="mt-20 text-center animate-on-scroll opacity-0">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-6 text-base rounded-xl">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-primary/5">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 animate-on-scroll opacity-0">
            Ready to transform web data?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-on-scroll opacity-0 animate-delay-100">
            Join thousands of developers already using Web2Api to power their applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll opacity-0 animate-delay-200">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base rounded-xl">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base rounded-xl">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-6 p-4 bg-primary/10 rounded-2xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard = ({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <div className="flex flex-col items-center text-center animate-on-scroll opacity-0" style={{ animationDelay: `${delay}ms` }}>
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <span className="text-2xl font-bold text-primary">{number}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
