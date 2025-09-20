import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import projet2Image from "@/assets/projet-2-optimized.webp";
import projet1Image from "@/assets/projet-1-optimized.webp";
import projet5Image from "@/assets/projet-5-optimized.webp";
import plumeImage from "@/assets/plume-partagee-optimized.webp";
import logoImage from "@/assets/logo-craft-optimized.webp";

const galleryImages = [
  {
    id: 1,
    src: projet2Image,
    title: "E-Shop Interface",
    description: "Interface utilisateur moderne pour plateforme e-commerce"
  },
  {
    id: 2,
    src: projet1Image,
    title: "CasaCentral Design",
    description: "Design épuré pour application immobilière"
  },
  {
    id: 3,
    src: projet5Image,
    title: "CVForge Dashboard",
    description: "Interface de création de CV professionnel"
  },
  {
    id: 4,
    src: plumeImage,
    title: "Plume Partagée",
    description: "Design coloré pour plateforme de blog"
  },
  {
    id: 5,
    src: logoImage,
    title: "LogoCraft Studio",
    description: "Outil de création de logos interactif"
  }
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Galerie</span> de Projets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez mes créations à travers cette galerie interactive optimisée pour tous les appareils.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <Card 
              key={image.id}
              className="group overflow-hidden cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  width="411" 
                  height="231"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {image.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal for enlarged image */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="space-y-4">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full rounded-lg shadow-card"
                />
                <p className="text-muted-foreground">
                  {selectedImage.description}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="text-center mt-12">
          <Button variant="premium" size="lg">
            Voir plus de réalisations
          </Button>
        </div>
      </div>
    </section>
  );
};