
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Mail, Copy, Download, Check, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CoverLetterGeneratorProps {
  jobTitle: string;
  companyName: string;
  candidateName: string;
  isGenerating: boolean;
  onGenerate: () => void;
  coverLetter: string | null;
}

const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({
  jobTitle,
  companyName,
  candidateName,
  isGenerating,
  onGenerate,
  coverLetter
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!coverLetter) return;
    
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Cover letter has been copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!coverLetter) return;
    
    const element = document.createElement('a');
    const file = new Blob([coverLetter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}_${jobTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Cover letter has been downloaded as a text file",
    });
  };

  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5 text-primary" />
          Cover Letter Generator
        </CardTitle>
        <CardDescription>
          Create a personalized cover letter based on your CV and the job description
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!coverLetter && !isGenerating ? (
          <div className="text-center py-12 bg-white/50 dark:bg-black/10 rounded-lg">
            <Mail className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Generate Your Custom Cover Letter
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Our AI will create a tailored cover letter highlighting your relevant experience 
              and matching skills for the {jobTitle} position at {companyName}.
            </p>
            <Button 
              className="btn-primary" 
              onClick={onGenerate}
              disabled={isGenerating}
            >
              Generate Cover Letter
            </Button>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-16 bg-white/50 dark:bg-black/10 rounded-lg">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-6" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              Creating Your Cover Letter
            </h3>
            <p className="text-gray-500">
              Personalizing content for {candidateName} at {companyName}...
            </p>
          </div>
        ) : (
          <div className="bg-white/50 dark:bg-black/10 rounded-lg p-6">
            <div className="prose prose-blue max-w-none">
              <div className="whitespace-pre-wrap font-serif text-gray-700">
                {coverLetter}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {coverLetter && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            Regenerate
          </Button>
          <div className="flex gap-2">
            <Button 
              onClick={handleCopy}
              variant="outline"
              className="flex items-center"
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button 
              onClick={handleDownload}
              className="btn-primary flex items-center"
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CoverLetterGenerator;
