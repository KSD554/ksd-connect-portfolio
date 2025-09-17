import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Salut ! Je suis l'assistant virtuel de KSD. Je peux vous parler de ses projets, compétences et vous aider à prendre rendez-vous. Comment puis-je vous aider ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const botResponse = generateBotResponse(message.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message: string): string => {
    if (message.includes('projet') || message.includes('réalisation')) {
      return "🚀 KSD a développé plusieurs projets impressionnants :\n\n• E-Shop - Plateforme e-commerce moderne\n• CasaCentral - Application immobilière\n• CVForge - Générateur de CV professionnel\n• Plume Partagée - Plateforme de blog\n• LogoCraft - Créateur de logos\n\nVoulez-vous en savoir plus sur un projet en particulier ?";
    }
    
    if (message.includes('compétence') || message.includes('technologie')) {
      return "💻 KSD maîtrise la MERN Stack :\n\n• Frontend: React, TypeScript, Tailwind CSS\n• Backend: Node.js, Express.js\n• Base de données: MongoDB, PostgreSQL\n• Outils: Git, Docker, AWS\n\nIl est passionné par les technologies modernes et l'innovation !";
    }
    
    if (message.includes('rendez-vous') || message.includes('rdv') || message.includes('calendly')) {
      return "📅 Parfait ! Vous pouvez réserver un appel de 30 minutes directement via Calendly :\n\nhttps://calendly.com/kouassisadok3/30min\n\nOu utilisez le bouton ci-dessous pour être redirigé. KSD sera ravi de discuter de votre projet avec vous !";
    }
    
    if (message.includes('contact') || message.includes('email') || message.includes('whatsapp')) {
      return "📞 Plusieurs moyens de contacter KSD :\n\n• Email: contact@ksd-dev.com\n• WhatsApp: Message direct avec description de projet\n• Formulaire de contact sur le site\n• Calendly pour un appel programmé\n\nQuel moyen préférez-vous ?";
    }
    
    if (message.includes('tarif') || message.includes('prix') || message.includes('coût')) {
      return "💰 Les tarifs dépendent de la complexité du projet. KSD propose :\n\n• Site vitrine: À partir de 800€\n• Application web: À partir de 1500€\n• E-commerce: À partir de 2500€\n• Projet sur mesure: Devis personnalisé\n\nRéservez un appel pour discuter de votre budget et obtenir un devis précis !";
    }
    
    return "🤔 Je peux vous renseigner sur :\n\n• Les projets et réalisations de KSD\n• Ses compétences techniques\n• Comment prendre rendez-vous\n• Les moyens de contact\n• Les tarifs approximatifs\n\nQue souhaitez-vous savoir ?";
  };

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/kouassisadok3/30min', '_blank');
    toast({
      title: "Redirection vers Calendly",
      description: "Vous allez être redirigé vers la page de réservation.",
    });
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        variant="cta"
        size="lg"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 rounded-full shadow-glow animate-glow"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden sm:inline ml-2">Chat IA</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-96 h-[70vh] max-h-96 shadow-elegant border border-primary/20 animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <CardTitle className="text-lg">Assistant KSD</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(70vh-4rem)] max-h-80">
            {/* Messages */}
            <div className="flex-1 p-2 md:p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 md:p-3 rounded-lg whitespace-pre-line text-sm md:text-base ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="p-2 md:p-4 border-t border-border">
              <div className="flex gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCalendlyClick}
                  className="text-xs"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">RDV</span>
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1 text-sm md:text-base"
                />
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};