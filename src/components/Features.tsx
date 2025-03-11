
import { 
  FileText, 
  Search, 
  Award, 
  FileCheck, 
  Mail, 
  Sparkles 
} from 'lucide-react';

const features = [
  {
    icon: <Search className="h-10 w-10 text-blue-500" />,
    title: "Job Analysis",
    description: "Our AI analyzes job listings to extract key requirements, skills, and company values."
  },
  {
    icon: <FileCheck className="h-10 w-10 text-blue-500" />,
    title: "CV Evaluation",
    description: "Get your CV scored against job requirements with specific improvement suggestions."
  },
  {
    icon: <Mail className="h-10 w-10 text-blue-500" />,
    title: "Cover Letter Generator",
    description: "Create personalized, compelling cover letters tailored to each job application."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-blue-500" />,
    title: "Application Insights",
    description: "Discover hidden requirements and industry-specific knowledge to give you an edge."
  },
  {
    icon: <Award className="h-10 w-10 text-blue-500" />,
    title: "Success Rate",
    description: "Improve your interview callback rate with optimized applications."
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-500" />,
    title: "Document Storage",
    description: "Safely store your CV and cover letters for future applications."
  }
];

const Features = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="section-heading">How CareerAI Works</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Our intelligent platform helps you optimize every aspect of your job application
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card glass-card-hover p-6 rounded-xl"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
