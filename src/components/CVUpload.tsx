
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileUp, Loader2, Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CVUploadProps {
  onCVSubmit: (cvText: string) => void;
  jobRequirements: string[] | null;
  isLoading: boolean;
}

const CVUpload: React.FC<CVUploadProps> = ({ onCVSubmit, jobRequirements, isLoading }) => {
  const [cvText, setCvText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (cvText.trim().length < 100) {
      toast({
        title: "CV content too short",
        description: "Please enter a complete CV for accurate evaluation.",
        variant: "destructive",
      });
      return;
    }
    
    onCVSubmit(cvText);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'text/plain' && file.type !== 'application/pdf' && 
        file.type !== 'application/msword' && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      toast({
        title: "Unsupported file type",
        description: "Please upload a .txt, .pdf, .doc, or .docx file.",
        variant: "destructive",
      });
      return;
    }

    // For this demo, we'll just simulate reading a text file
    // In a real app, you'd need to handle PDF, DOC, DOCX parsing server-side
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    } else {
      // Mock file read for non-text files
      toast({
        title: "File received",
        description: "For demo purposes, we'll use a text version. In production, we would parse PDF/DOC files.",
      });
      
      setCvText(`JOHN DOE
123 Main St, San Francisco, CA 94122
john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Senior Frontend Developer with 6+ years of experience in building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about creating intuitive user interfaces with a focus on performance and accessibility.

SKILLS
• Frontend: React, TypeScript, JavaScript (ES6+), HTML5, CSS3
• UI Frameworks: Tailwind CSS, Material-UI, Styled Components
• State Management: Redux, Context API, Recoil
• Testing: Jest, React Testing Library, Cypress
• Build Tools: Webpack, Vite, Rollup
• Version Control: Git, GitHub, GitLab
• CI/CD: GitHub Actions, CircleCI
• Design: Figma, Adobe XD, responsive design principles
• Other: RESTful APIs, GraphQL, Web Accessibility, Performance Optimization

WORK EXPERIENCE

Senior Frontend Developer | CloudTech Solutions | May 2021 - Present
• Led the development of a React-based dashboard that improved user engagement by 35%
• Migrated legacy JavaScript codebase to TypeScript, reducing bugs by 28%
• Implemented a component library using Storybook, increasing development velocity by 40%
• Optimized application performance, improving load times by 60%
• Mentored junior developers and conducted code reviews

Frontend Developer | WebSphere Inc. | March 2018 - April 2021
• Developed responsive web applications using React and Redux
• Created reusable UI components following atomic design principles
• Implemented unit and integration tests, achieving 85% code coverage
• Collaborated with UX/UI designers to implement pixel-perfect interfaces
• Participated in agile development processes and sprint planning

Junior Web Developer | Digital Creations | January 2017 - February 2018
• Built and maintained websites using HTML, CSS, and JavaScript
• Assisted in the implementation of responsive designs
• Troubleshot cross-browser compatibility issues
• Developed small-scale React components

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Graduated: December 2016

PROJECTS
• Personal Portfolio - Designed and built a personal portfolio site using Next.js and Tailwind CSS
• Weather Dashboard - Created a React application that consumes a weather API to display forecasts
• E-Commerce Demo - Developed a demo e-commerce site with React, Redux, and Stripe integration

CERTIFICATIONS
• Meta Frontend Developer Professional Certificate (2022)
• AWS Certified Developer – Associate (2021)
• Google UX Design Professional Certificate (2020)`);
    }
  };

  const handleUseExample = () => {
    setCvText(`JOHN DOE
123 Main St, San Francisco, CA 94122
john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Senior Frontend Developer with 6+ years of experience in building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about creating intuitive user interfaces with a focus on performance and accessibility.

SKILLS
• Frontend: React, TypeScript, JavaScript (ES6+), HTML5, CSS3
• UI Frameworks: Tailwind CSS, Material-UI, Styled Components
• State Management: Redux, Context API, Recoil
• Testing: Jest, React Testing Library, Cypress
• Build Tools: Webpack, Vite, Rollup
• Version Control: Git, GitHub, GitLab
• CI/CD: GitHub Actions, CircleCI
• Design: Figma, Adobe XD, responsive design principles
• Other: RESTful APIs, GraphQL, Web Accessibility, Performance Optimization

WORK EXPERIENCE

Senior Frontend Developer | CloudTech Solutions | May 2021 - Present
• Led the development of a React-based dashboard that improved user engagement by 35%
• Migrated legacy JavaScript codebase to TypeScript, reducing bugs by 28%
• Implemented a component library using Storybook, increasing development velocity by 40%
• Optimized application performance, improving load times by 60%
• Mentored junior developers and conducted code reviews

Frontend Developer | WebSphere Inc. | March 2018 - April 2021
• Developed responsive web applications using React and Redux
• Created reusable UI components following atomic design principles
• Implemented unit and integration tests, achieving 85% code coverage
• Collaborated with UX/UI designers to implement pixel-perfect interfaces
• Participated in agile development processes and sprint planning

Junior Web Developer | Digital Creations | January 2017 - February 2018
• Built and maintained websites using HTML, CSS, and JavaScript
• Assisted in the implementation of responsive designs
• Troubleshot cross-browser compatibility issues
• Developed small-scale React components

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Graduated: December 2016

PROJECTS
• Personal Portfolio - Designed and built a personal portfolio site using Next.js and Tailwind CSS
• Weather Dashboard - Created a React application that consumes a weather API to display forecasts
• E-Commerce Demo - Developed a demo e-commerce site with React, Redux, and Stripe integration

CERTIFICATIONS
• Meta Frontend Developer Professional Certificate (2022)
• AWS Certified Developer – Associate (2021)
• Google UX Design Professional Certificate (2020)`);
  };

  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileUp className="mr-2 h-5 w-5 text-primary" />
          Upload Your CV
        </CardTitle>
        <CardDescription>
          Paste your CV content or upload a file for evaluation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobRequirements && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-700 mb-2">Key Job Requirements:</h4>
            <ul className="space-y-1">
              {jobRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">Drag and drop your CV file here</p>
          <p className="text-gray-500 text-sm mb-4">Supports .txt, .pdf, .doc, .docx</p>
          <div className="flex justify-center">
            <input
              type="file"
              id="cv-upload"
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileInput}
            />
            <label htmlFor="cv-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>
        
        <div className="h-px bg-gray-200 my-6" />
        
        <div>
          <label htmlFor="cv-text" className="block text-sm font-medium text-gray-700 mb-2">
            Or paste your CV content here:
          </label>
          <Textarea
            id="cv-text"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste your CV content here..."
            className="input-field min-h-[250px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleUseExample}
          disabled={isLoading}
        >
          Use Example CV
        </Button>
        <Button 
          className="btn-primary" 
          onClick={handleSubmit}
          disabled={cvText.trim().length < 100 || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Evaluating...
            </>
          ) : (
            'Evaluate CV'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CVUpload;
