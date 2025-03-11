
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, FileText, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobListingProps {
  onSubmit: (jobText: string, isUrl: boolean) => void;
  isLoading: boolean;
}

const JobListing: React.FC<JobListingProps> = ({ onSubmit, isLoading }) => {
  const [jobInput, setJobInput] = useState('');
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (jobInput.trim().length < 5) {
      toast({
        title: "Input too short",
        description: inputType === 'text' 
          ? "Please paste a complete job description for accurate analysis."
          : "Please enter a valid URL to a job listing.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate URL if in URL mode
    if (inputType === 'url') {
      try {
        const url = new URL(jobInput);
        if (!url.protocol.startsWith('http')) {
          throw new Error('Invalid URL');
        }
      } catch (e) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL to a job listing.",
          variant: "destructive",
        });
        return;
      }
    }
    
    onSubmit(jobInput, inputType === 'url');
  };
  
  const handlePasteExample = () => {
    setInputType('text');
    const exampleJob = `Job Title: Senior Frontend Developer

Company: TechInnovate Solutions
Location: Remote (US-based)
Salary Range: $120,000 - $160,000

About Us: TechInnovate Solutions is a growing tech company specializing in developing user-centric applications for enterprise clients.

Responsibilities:
- Develop user interfaces using React and TypeScript
- Collaborate with UX/UI designers
- Optimize applications for maximum speed and scalability

Requirements:
- 5+ years of experience in frontend development
- Expert knowledge of React, JavaScript, TypeScript
- Experience with state management solutions
- Testing frameworks knowledge
- Strong understanding of responsive design`;
    
    setJobInput(exampleJob);
  };
  
  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-4 w-4 text-primary" />
          Job Listing
        </CardTitle>
        <CardDescription className="text-xs">
          Paste a job description or enter a URL to a job listing
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs value={inputType} onValueChange={(value) => setInputType(value as 'text' | 'url')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="text" className="flex items-center text-xs py-1">
              <FileText className="mr-1 h-3 w-3" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center text-xs py-1">
              <LinkIcon className="mr-1 h-3 w-3" />
              Enter URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-0">
            <Textarea
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              placeholder="Paste the full job description here..."
              className="input-field min-h-[150px] max-h-[150px] text-sm"
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-0">
            <Input
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              placeholder="https://example.com/job-listing"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the full URL to the job listing page
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          onClick={handlePasteExample}
          disabled={isLoading}
          size="sm"
          className="text-xs"
        >
          Use Example
        </Button>
        <Button 
          className="btn-primary flex items-center text-xs" 
          onClick={handleSubmit}
          disabled={jobInput.trim().length < 5 || isLoading}
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Analyze Job
              <ArrowRight className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobListing;
