
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

About Us:
TechInnovate Solutions is a growing tech company specializing in developing user-centric applications for enterprise clients. We pride ourselves on our collaborative culture and commitment to work-life balance.

Responsibilities:
- Develop high-quality, responsive user interfaces using React and TypeScript
- Collaborate with UX/UI designers to implement intuitive, accessible front-end solutions
- Optimize applications for maximum speed and scalability
- Participate in code reviews and maintain code quality standards
- Troubleshoot and debug frontend issues
- Work within agile development methodologies

Requirements:
- 5+ years of experience in frontend development
- Expert knowledge of React, JavaScript, TypeScript, and modern CSS
- Experience with state management solutions (Redux, Context API)
- Familiarity with testing frameworks (Jest, React Testing Library)
- Strong understanding of responsive design principles
- Knowledge of CI/CD pipelines and version control with Git
- Excellent problem-solving skills and attention to detail
- Strong communication skills and ability to work in a team

Nice to Have:
- Experience with Next.js or similar frameworks
- Knowledge of GraphQL and RESTful APIs
- Understanding of web accessibility standards
- Experience with UI component libraries
- Background in design systems
- Open-source contributions`;
    
    setJobInput(exampleJob);
  };
  
  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Job Listing
        </CardTitle>
        <CardDescription>
          Paste a job description or enter a URL to a job listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={inputType} onValueChange={(value) => setInputType(value as 'text' | 'url')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="text" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center">
              <LinkIcon className="mr-2 h-4 w-4" />
              Enter URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-0">
            <Textarea
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              placeholder="Paste the full job description here..."
              className="input-field min-h-[200px]"
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-0">
            <Input
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              placeholder="https://example.com/job-listing"
              className="input-field"
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the full URL to the job listing page
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePasteExample}
          disabled={isLoading}
        >
          Use Example
        </Button>
        <Button 
          className="btn-primary flex items-center" 
          onClick={handleSubmit}
          disabled={jobInput.trim().length < 5 || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Analyze Job
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobListing;
