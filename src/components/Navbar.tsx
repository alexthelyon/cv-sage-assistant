
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary transition-all duration-200 hover:opacity-80">
              CareerAI
            </a>
          </div>
          
          <div className="hidden md:block">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings size={16} />
              <span>API Settings</span>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
              <Settings size={16} />
              <span>API Settings</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
