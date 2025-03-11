
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="page-transition">
        <Hero />
        <Features />
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading">Ready to optimize your job applications?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Start using CareerAI today and increase your chances of landing your dream job.
            </p>
            <Button asChild size="lg" className="btn-primary px-8">
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
        
        <footer className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} CareerAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
