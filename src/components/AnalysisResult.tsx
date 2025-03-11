
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Check, X, AlertCircle, ThumbsUp, Award } from 'lucide-react';

interface Suggestion {
  before: string;
  after: string;
  reason: string;
}

interface AnalysisResultProps {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: Suggestion[];
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  score,
  matchedSkills,
  missingSkills,
  suggestions
}) => {
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Determine progress color
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="glass-card w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          CV Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white/50 dark:bg-black/10 rounded-lg">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Match Score</h3>
            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <Progress value={score} className={`h-3 ${getProgressColor(score)}`} />
            <div className="mt-2 text-sm text-gray-500 italic">
              {score >= 80 
                ? "Excellent match! You're a strong candidate for this position."
                : score >= 60
                ? "Good match. With some improvements, you could be a strong candidate."
                : "Needs improvement. Consider addressing the missing skills and suggestions below."}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-black/10 rounded-lg p-5">
            <h3 className="text-lg font-medium flex items-center text-green-700 mb-4">
              <Check className="mr-2 h-5 w-5" />
              Matched Skills
            </h3>
            <ul className="space-y-2">
              {matchedSkills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/50 dark:bg-black/10 rounded-lg p-5">
            <h3 className="text-lg font-medium flex items-center text-red-700 mb-4">
              <X className="mr-2 h-5 w-5" />
              Missing Skills
            </h3>
            <ul className="space-y-2">
              {missingSkills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                  <span className="text-sm">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <ThumbsUp className="mr-2 h-5 w-5 text-blue-500" />
            Improvement Suggestions
          </h3>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white/50 dark:bg-black/10 rounded-lg p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-red-300 pl-4">
                    <h4 className="text-sm font-medium text-red-700 mb-1">Current Version:</h4>
                    <p className="text-sm text-gray-700">{suggestion.before}</p>
                  </div>
                  
                  <div className="border-l-4 border-green-300 pl-4">
                    <h4 className="text-sm font-medium text-green-700 mb-1">Suggested Improvement:</h4>
                    <p className="text-sm text-gray-700">{suggestion.after}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-start">
                  <AlertCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600 italic">{suggestion.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;
