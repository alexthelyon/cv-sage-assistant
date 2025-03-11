
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, FilePlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface JobInputProps {
  onAnalyze: (jobDescription: string) => void;
  isAnalyzing: boolean;
}

const JobInput: React.FC<JobInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [jobDescription, setJobDescription] = useState('');
  const { toast } = useToast();
  
  const handleAnalyze = () => {
    if (jobDescription.trim().length < 50) {
      toast({
        title: "Job description too short",
        description: "Please paste a complete job description for accurate analysis.",
        variant: "destructive",
      });
      return;
    }
    
    onAnalyze(jobDescription);
  };
  
  const handlePasteExample = () => {
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
    
    setJobDescription(exampleJob);
  };
  
  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilePlus className="mr-2 h-5 w-5 text-primary" />
          Paste Job Description
        </CardTitle>
        <CardDescription>
          Enter the complete job listing you want to apply for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="input-field min-h-[200px]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePasteExample}
          disabled={isAnalyzing}
        >
          Use Example
        </Button>
        <Button 
          className="btn-primary" 
          onClick={handleAnalyze}
          disabled={jobDescription.trim().length < 50 || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Job'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobInput;
