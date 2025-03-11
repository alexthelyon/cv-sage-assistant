
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import JobListing from "@/components/JobListing";
import CVUpload from "@/components/CVUpload";
import AnalysisResult from "@/components/AnalysisResult";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface JobData {
  title: string;
  company: string;
  requirements: string[];
}

interface CVAnalysisResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: {
    before: string;
    after: string;
    reason: string;
  }[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<"intro" | "job-input" | "cv-upload" | "results">("intro");
  const [isProcessingJob, setIsProcessingJob] = useState<boolean>(false);
  const [isEvaluatingCV, setIsEvaluatingCV] = useState<boolean>(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState<boolean>(false);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [cvText, setCvText] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const { toast } = useToast();

  const handleJobSubmit = (jobInput: string, isUrl: boolean) => {
    setIsProcessingJob(true);
    
    // Mock processing - in a real app, you'd call your backend/API
    setTimeout(() => {
      // Mock job data extraction
      const extractedData = {
        title: "Senior Frontend Developer",
        company: "TechInnovate Solutions",
        requirements: [
          "5+ years of experience in frontend development",
          "Expert knowledge of React, JavaScript, TypeScript",
          "Experience with state management solutions",
          "Familiarity with testing frameworks",
          "Strong understanding of responsive design principles",
          "Knowledge of CI/CD pipelines and version control",
        ],
      };
      
      setJobData(extractedData);
      setIsProcessingJob(false);
      
      toast({
        title: "Job analyzed successfully",
        description: `We've identified key requirements for the ${extractedData.title} position.`,
      });
      
      // Move to CV upload section
      setActiveSection("cv-upload");
    }, 3000);
  };

  const handleCVSubmit = (cv: string) => {
    setIsEvaluatingCV(true);
    setCvText(cv);
    
    // Mock processing - in a real app, you'd call your backend/API
    setTimeout(() => {
      // Mock analysis result
      const result = {
        score: 78,
        matchedSkills: [
          "React development experience",
          "TypeScript knowledge",
          "Frontend development (6+ years)",
          "Testing experience (Jest mentioned)",
          "Version control with Git"
        ],
        missingSkills: [
          "CI/CD pipeline experience (mentioned in requirements)",
        ],
        suggestions: [
          {
            before: "Senior Frontend Developer with 6+ years of experience in building responsive web applications",
            after: "Senior Frontend Developer with 6+ years of experience specializing in React, TypeScript, and responsive web applications",
            reason: "Emphasize the specific technologies mentioned in the job description"
          },
          {
            before: "Implemented a component library using Storybook",
            after: "Implemented a component library using Storybook, improving team development velocity by 40% and ensuring UI consistency",
            reason: "Quantify achievements and connect them to business outcomes"
          },
          {
            before: "CSS Frameworks: Tailwind CSS, Material-UI, Styled Components",
            after: "Add a bullet point for CI/CD experience: 'CI/CD: Familiar with GitHub Actions, Jenkins, and automated deployment pipelines'",
            reason: "Add missing skill that's important for the role"
          }
        ]
      };
      
      setAnalysisResult(result);
      setIsEvaluatingCV(false);
      
      toast({
        title: "CV evaluation complete",
        description: `Your CV scored ${result.score}% match with the job requirements.`,
      });
      
      // Move to results section
      setActiveSection("results");
    }, 3000);
  };

  const handleGenerateCoverLetter = () => {
    setIsGeneratingCoverLetter(true);
    
    // Mock processing - in a real app, you'd call your backend/API
    setTimeout(() => {
      // Mock generated cover letter
      const generatedLetter = `${new Date().toLocaleDateString()}

John Doe
123 Main St
San Francisco, CA 94122
john.doe@example.com
(555) 123-4567

Hiring Manager
TechInnovate Solutions
San Francisco, CA

RE: Application for Senior Frontend Developer Position

Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Developer position at TechInnovate Solutions. With over 6 years of specialized experience in React, TypeScript, and responsive web application development, I am excited about the opportunity to contribute to your team's innovative work in developing user-centric applications for enterprise clients.

My experience aligns well with the requirements outlined in your job description:

• As a Senior Frontend Developer at CloudTech Solutions, I led the development of a React-based dashboard that improved user engagement by 35% and migrated a legacy JavaScript codebase to TypeScript, resulting in a 28% reduction in bugs.

• I have implemented component libraries using Storybook, improving team development velocity by 40% while ensuring UI consistency across applications.

• My experience with state management solutions includes Redux and Context API, which I've used to build scalable application architectures.

• I've implemented comprehensive testing strategies using Jest and React Testing Library, achieving 85% code coverage.

• I'm well-versed in responsive design principles, having created interfaces that work seamlessly across all device types.

• While I haven't extensively worked with CI/CD pipelines, I have experience with GitHub Actions and am eager to expand my knowledge in this area.

I'm particularly drawn to TechInnovate Solutions' commitment to work-life balance and collaborative culture. These values are important to me, and I believe they foster the most innovative and sustainable work environments.

I would welcome the opportunity to discuss how my skills and experience can contribute to TechInnovate Solutions' continued success. Thank you for considering my application.

Sincerely,

John Doe`;
      
      setCoverLetter(generatedLetter);
      setIsGeneratingCoverLetter(false);
      
      toast({
        title: "Cover letter generated",
        description: "Your personalized cover letter is ready to download or copy.",
      });
    }, 5000);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "intro":
        return (
          <>
            <Hero />
            <Features />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="section-heading">Ready to optimize your job applications?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Start by pasting a job listing or providing a URL to the job you want to apply for.
                </p>
                <Button 
                  size="lg" 
                  className="btn-primary px-8"
                  onClick={() => setActiveSection("job-input")}
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          </>
        );
      case "job-input":
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="section-heading text-center mb-10">Analyze a Job Listing</h2>
            <JobListing 
              onSubmit={handleJobSubmit} 
              isLoading={isProcessingJob} 
            />
          </div>
        );
      case "cv-upload":
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="section-heading text-center mb-10">Upload Your CV</h2>
            {jobData && (
              <CVUpload 
                onCVSubmit={handleCVSubmit} 
                jobRequirements={jobData.requirements}
                isLoading={isEvaluatingCV}
              />
            )}
          </div>
        );
      case "results":
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="section-heading text-center mb-10">Results & Cover Letter</h2>
            <Tabs defaultValue="analysis" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">CV Analysis</TabsTrigger>
                <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
              </TabsList>
              <TabsContent value="analysis" className="mt-6">
                {analysisResult && (
                  <AnalysisResult 
                    score={analysisResult.score}
                    matchedSkills={analysisResult.matchedSkills}
                    missingSkills={analysisResult.missingSkills}
                    suggestions={analysisResult.suggestions}
                  />
                )}
              </TabsContent>
              <TabsContent value="coverLetter" className="mt-6">
                {jobData && (
                  <CoverLetterGenerator 
                    jobTitle={jobData.title}
                    companyName={jobData.company}
                    candidateName="John Doe"
                    isGenerating={isGeneratingCoverLetter}
                    onGenerate={handleGenerateCoverLetter}
                    coverLetter={coverLetter}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="page-transition">
        {renderActiveSection()}
        
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
