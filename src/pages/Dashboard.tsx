
import { useState } from "react";
import Navbar from "@/components/Navbar";
import JobInput from "@/components/JobInput";
import CVUpload from "@/components/CVUpload";
import AnalysisResult from "@/components/AnalysisResult";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const Dashboard = () => {
  const [step, setStep] = useState<number>(1);
  const [isAnalyzingJob, setIsAnalyzingJob] = useState<boolean>(false);
  const [isEvaluatingCV, setIsEvaluatingCV] = useState<boolean>(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [cvText, setCvText] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const { toast } = useToast();

  const handleJobAnalysis = (jobDesc: string) => {
    setIsAnalyzingJob(true);
    setJobDescription(jobDesc);
    
    // In a real app, you'd call your AI API here
    setTimeout(() => {
      // Mock data - this would come from the AI in a real app
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
      setIsAnalyzingJob(false);
      
      toast({
        title: "Job analyzed successfully",
        description: `We've identified key requirements for the ${extractedData.title} position.`,
      });
      
      // Move to next step
      setStep(2);
    }, 3000);
  };

  const handleCVSubmit = (cv: string) => {
    setIsEvaluatingCV(true);
    setCvText(cv);
    
    // In a real app, you'd call your AI API here
    setTimeout(() => {
      // Mock data - this would come from the AI in a real app
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
      
      // Move to next step
      setStep(3);
    }, 3000);
  };

  const handleGenerateCoverLetter = () => {
    setIsGeneratingCoverLetter(true);
    
    // In a real app, you'd call your AI API here
    setTimeout(() => {
      // Mock data - this would come from the AI in a real app
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <JobInput 
            onAnalyze={handleJobAnalysis} 
            isAnalyzing={isAnalyzingJob} 
          />
        );
      case 2:
        return (
          <CVUpload 
            onCVSubmit={handleCVSubmit} 
            jobRequirements={jobData?.requirements || null}
            isLoading={isEvaluatingCV}
          />
        );
      case 3:
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 page-transition">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              {step === 1 ? "Analyze Job Listing" : 
               step === 2 ? "Upload Your CV" : 
               "Results & Cover Letter"}
            </h1>
            <div className="text-sm text-gray-500">
              Step {step} of 3
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
        
        {renderStepContent()}
        
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          {step > 1 && (
            <Button 
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex items-center"
              disabled={isAnalyzingJob || isEvaluatingCV || isGeneratingCoverLetter}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous Step
            </Button>
          )}
          {step < 3 && jobDescription && (
            <Button 
              onClick={() => setStep(step + 1)}
              className="btn-primary flex items-center ml-auto"
              disabled={
                (step === 1 && !jobData) || 
                (step === 2 && !cvText) ||
                isAnalyzingJob || 
                isEvaluatingCV
              }
            >
              Next Step
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
