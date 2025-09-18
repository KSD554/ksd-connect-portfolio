import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const CalendlySection = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="calendly" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <Calendar className="inline-block w-12 h-12 mr-4 text-primary" />
            Réservation en ligne
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez un créneau qui vous convient pour discuter de votre projet. Consultation gratuite de 30 minutes.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-border/50 shadow-elegant overflow-hidden">
            <CardHeader className="bg-gradient-primary text-center py-8">
              <CardTitle className="text-2xl md:text-3xl text-white mb-2">
                Planifiez votre consultation
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Appelons-nous pour parler de votre projet
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Calendly Widget Container */}
              <div className="w-full bg-background">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/kouassisadok3/30min"
                  style={{
                    minWidth: '320px',
                    height: '700px',
                    width: '100%'
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Optimization Notice */}
        <div className="mt-8 text-center md:hidden">
          <Card className="bg-muted/50 border-border/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                💡 Pour une meilleure expérience sur mobile, vous pouvez aussi 
                <a 
                  href="https://calendly.com/kouassisadok3/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  ouvrir Calendly dans un nouvel onglet
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};