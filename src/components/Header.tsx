import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/khalilsaiddiop', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            KSD
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Projets
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Formation
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Expérience
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Galerie
            </button>
            <button 
              onClick={() => scrollToSection('calendly')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Réservation
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Contact
            </button>
            <Button variant="hero" size="sm" onClick={handleCalendlyClick}>
              Prendre RDV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Projets
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Formation
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Expérience
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Galerie
              </button>
              <button 
                onClick={() => scrollToSection('calendly')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Réservation
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-smooth"
              >
                Contact
              </button>
              <Button variant="hero" size="sm" className="w-fit" onClick={handleCalendlyClick}>
                Prendre RDV
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};