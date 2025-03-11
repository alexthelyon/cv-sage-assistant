
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
    
    // This is where you would call the API with your API key
    // For now, this is a placeholder
    setTimeout(() => {
      toast({
        title: "API key needed",
        description: "Please add your API key in the dashboard settings to analyze job listings.",
        variant: "destructive",
      });
      setIsAnalyzingJob(false);
    }, 1500);
  };

  const handleCVSubmit = (cv: string) => {
    setIsEvaluatingCV(true);
    setCvText(cv);
    
    // This is where you would call the API with your API key
    // For now, this is a placeholder
    setTimeout(() => {
      toast({
        title: "API key needed",
        description: "Please add your API key in the dashboard settings to evaluate CVs.",
        variant: "destructive",
      });
      setIsEvaluatingCV(false);
    }, 1500);
  };

  const handleGenerateCoverLetter = () => {
    setIsGeneratingCoverLetter(true);
    
    // This is where you would call the API with your API key
    // For now, this is a placeholder
    setTimeout(() => {
      toast({
        title: "API key needed",
        description: "Please add your API key in the dashboard settings to generate cover letters.",
        variant: "destructive",
      });
      setIsGeneratingCoverLetter(false);
    }, 1500);
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
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Your AI-powered <span className="text-gradient">career assistant</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Optimize your job applications with AI that analyzes job listings, 
              evaluates your CV, and creates personalized cover letters that get you noticed.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              {step === 1 ? "Analyze Job Listing" : 
               step === 2 ? "Upload Your CV" : 
               "Results & Cover Letter"}
            </h2>
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

      <footer className="bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} CareerAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
