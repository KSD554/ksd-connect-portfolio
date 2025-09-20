import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>kouassisadok3@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+225 01 02 03 04 05</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <div className="space-y-2">
              <a href="#hero" className="block text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Projets
              </a>
              <a href="#experience" className="block text-muted-foreground hover:text-primary transition-colors">
                Expérience
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sadok Kouassi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};