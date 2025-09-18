import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye, ArrowRight } from "lucide-react";

import projet2Image from "@/assets/projet-2-updated.png";
import projet1Image from "@/assets/projet-1-updated.png";
import projet5Image from "@/assets/projet-5-updated.png";
import plumeImage from "@/assets/plume-partagee-updated.png";
import logoImage from "@/assets/logo-craft-updated.png";

const projects = [
  {
    id: 1,
    title: "E-Shop - Plateforme E-commerce",
    description: "Plateforme e-commerce moderne avec catalogue produits, panier et système de paiement intégré.",
    image: projet2Image,
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://multi-vendor-ecommerce-main-hi7c.vercel.app/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "CasaCentral - Immobilier",
    description: "Application immobilière pour la recherche et gestion de propriétés avec géolocalisation.",
    image: projet1Image,
    tags: ["React", "Express", "PostgreSQL", "Maps API"],
    demoUrl: "https://casacentral-seven.vercel.app/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "CVForge - Générateur de CV",
    description: "Outil de création de CV professionnel avec templates personnalisables et export PDF.",
    image: projet5Image,
    tags: ["React", "TypeScript", "PDF.js", "Tailwind"],
    demoUrl: "https://cv-forge-ci.vercel.app/",
    githubUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "Plume Partagée - Blog",
    description: "Plateforme de blog collaborative avec système d'articles et commentaires.",
    image: plumeImage,
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    demoUrl: "https://plume-partagee.onrender.com/",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "LogoCraft - Créateur de Logos",
    description: "Application web pour créer des logos personnalisés avec outils de design intuitifs.",
    image: logoImage,
    tags: ["React", "Canvas API", "SVG", "Design Tools"],
    demoUrl: "https://logo-craft-4kn4.vercel.app/",
    githubUrl: "#",
    featured: false
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mes <span className="bg-gradient-primary bg-clip-text text-transparent">Projets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations, chacune développée avec passion et expertise technique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-slide-up border-border/50 ${
                project.featured ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Projet Phare
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                    Démo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="premium" size="lg">
            Voir tous mes projets
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};