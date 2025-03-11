
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-blue-100 bg-opacity-70 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium animate-slide-down">
            Land your dream job with AI assistance
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Your AI-powered <span className="text-gradient">career assistant</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 animate-slide-down" style={{ animationDelay: "0.2s" }}>
            Optimize your job applications with AI that analyzes job listings, 
            evaluates your CV, and creates personalized cover letters that get you noticed.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-down" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="btn-primary px-8 py-6">
              <Link to="/dashboard" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background blur elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
};

export default Hero;
