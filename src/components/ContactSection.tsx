import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject || null,
            message: formData.message,
            status: 'pending'
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Salut KSD ! Je suis intéressé par vos services de développement web. Pouvons-nous discuter de mon projet ?");
    window.open(`https://wa.me/2250704306642?text=${message}`, '_blank');
  };

  const handleCalendly = () => {
    window.open('https://calendly.com/kouassisadok3/30min', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-<span className="bg-gradient-primary bg-clip-text text-transparent">moi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prêt à donner vie à votre projet ? Discutons de vos idées et transformons-les en réalité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="animate-slide-up shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Envoyez-moi un message</CardTitle>
              <CardDescription>
                Décrivez votre projet et je vous répondrai rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="transition-smooth focus:shadow-card"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="transition-smooth focus:shadow-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone (optionnel)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+33 X XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="transition-smooth focus:shadow-card"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Objet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="transition-smooth focus:shadow-card"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="transition-smooth focus:shadow-card"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Calendly */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="animate-slide-up shadow-card border-border/50" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-xl">Contact Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="premium" 
                    className="flex-1"
                    onClick={() => window.location.href = 'mailto:kouassisadok3@gmail.com'}
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </Button>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCalendly}
                >
                  <Calendar className="w-5 h-5" />
                  Réserver un appel de 30 minutes
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="animate-slide-up shadow-card border-border/50" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>kouassisadok3@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+225 0704306642</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Côte d'Ivoire, Bouaké</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};