import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import ksdPhoto from "@/assets/ksd-photo-optimized.webp";

export const HeroSection = () => {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/kouassisadok3/30min', '_blank');
  };

  const handleDownloadCV = () => {
    // This will trigger when CV download is implemented
    console.log('Download CV clicked');
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Disponible pour de nouveaux projets
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Salut 👋, je suis{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  KSD
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                Développeur Full-Stack
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionné par la <strong className="text-primary">MERN Stack</strong> et les technologies modernes. 
                Je crée des applications web innovantes et performantes qui transforment vos idées en réalité digitale.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
              <Button 
                variant="cta" 
                size="lg" 
                onClick={handleDownloadCV}
                className="group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Télécharger le CV
              </Button>
              
              <Button 
                variant="hero" 
                size="lg" 
                onClick={scrollToProjects}
                className="group"
              >
                Découvrir mes projets
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="premium" 
                size="lg" 
                onClick={handleCalendlyClick}
                className="group"
              >
                <Calendar className="w-5 h-5" />
                Prendre rendez-vous
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex items-center gap-4 pt-4">
              <Button variant="ghost" size="sm" className="group">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button variant="ghost" size="sm">
                Email direct
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-hero rounded-3xl blur-lg opacity-30 animate-glow"></div>
              <div className="relative bg-gradient-card rounded-3xl p-2 shadow-elegant">
                <img
                  src={ksdPhoto}
                  alt="KSD - Développeur Full-Stack"
                  loading="eager"
                  fetchPriority="high"
                  width="320"
                  height="384"
                  className="w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 object-cover rounded-2xl shadow-card"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};