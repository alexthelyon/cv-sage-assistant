
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import JobListing from "@/components/JobListing";
import CVUpload from "@/components/CVUpload";
import AnalysisResult from "@/components/AnalysisResult";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import { Input } from "@/components/ui/input";
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
  const [apiKey, setApiKey] = useState<string>('');
  const { toast } = useToast();

  const handleJobSubmit = async (jobInput: string, isUrl: boolean) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to analyze job listings",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingJob(true);
    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ jobInput, isUrl })
      });

      if (!response.ok) throw new Error('Failed to analyze job listing');
      
      const extractedData = await response.json();
      setJobData(extractedData);
      setActiveSection("cv-upload");
      
      toast({
        title: "Job analyzed successfully",
        description: `We've identified key requirements for the ${extractedData.title} position.`,
      });
    } catch (error) {
      toast({
        title: "Error analyzing job",
        description: "There was an error analyzing the job listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingJob(false);
    }
  };

  const handleCVSubmit = async (cv: string) => {
    if (!apiKey || !jobData) return;
    
    setIsEvaluatingCV(true);
    setCvText(cv);
    
    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ cv, jobData })
      });

      if (!response.ok) throw new Error('Failed to analyze CV');
      
      const result = await response.json();
      setAnalysisResult(result);
      setActiveSection("results");
      
      toast({
        title: "CV evaluation complete",
        description: `Your CV scored ${result.score}% match with the job requirements.`,
      });
    } catch (error) {
      toast({
        title: "Error analyzing CV",
        description: "There was an error analyzing your CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEvaluatingCV(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!apiKey || !jobData || !cvText) return;
    
    setIsGeneratingCoverLetter(true);
    
    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ jobData, cvText })
      });

      if (!response.ok) throw new Error('Failed to generate cover letter');
      
      const { coverLetter: generatedLetter } = await response.json();
      setCoverLetter(generatedLetter);
      
      toast({
        title: "Cover letter generated",
        description: "Your personalized cover letter is ready to download or copy.",
      });
    } catch (error) {
      toast({
        title: "Error generating cover letter",
        description: "There was an error generating your cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="page-transition">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
          
          <JobListing 
            onSubmit={handleJobSubmit} 
            isLoading={isProcessingJob} 
          />
          
          {jobData && (
            <CVUpload 
              onCVSubmit={handleCVSubmit} 
              jobRequirements={jobData.requirements}
              isLoading={isEvaluatingCV}
            />
          )}
          
          {analysisResult && (
            <div className="mt-4">
              <Tabs defaultValue="analysis" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analysis">CV Analysis</TabsTrigger>
                  <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
                </TabsList>
                <TabsContent value="analysis">
                  <AnalysisResult 
                    score={analysisResult.score}
                    matchedSkills={analysisResult.matchedSkills}
                    missingSkills={analysisResult.missingSkills}
                    suggestions={analysisResult.suggestions}
                  />
                </TabsContent>
                <TabsContent value="coverLetter">
                  <CoverLetterGenerator 
                    jobTitle={jobData.title}
                    companyName={jobData.company}
                    candidateName="John Doe"
                    isGenerating={isGeneratingCoverLetter}
                    onGenerate={handleGenerateCoverLetter}
                    coverLetter={coverLetter}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
