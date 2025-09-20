import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context = [] } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!HUGGING_FACE_TOKEN) {
      throw new Error('HUGGING_FACE_ACCESS_TOKEN is not set');
    }

    // Créer le contexte pour KSD
    const systemPrompt = `Tu es l'assistant virtuel de KSD (Kouassi Sadok), un développeur fullstack spécialisé dans la MERN Stack. Voici ce que tu dois savoir sur lui :

PROJETS PRINCIPAUX :
• E-Shop - Plateforme e-commerce moderne avec React, Node.js et MongoDB
• CasaCentral - Application immobilière avec géolocalisation 
• CVForge - Générateur de CV professionnel avec templates personnalisables
• Plume Partagée - Plateforme de blog collaborative
• LogoCraft - Créateur de logos avec IA

COMPÉTENCES :
• Frontend: React, TypeScript, Tailwind CSS, Next.js
• Backend: Node.js, Express.js, API REST
• Bases de données: MongoDB, PostgreSQL, MySQL
• Outils: Git, Docker, AWS, Vercel
• Spécialités: UI/UX, responsive design, optimisation SEO

CONTACT :
• Email: kouassisadok3@gmail.com
• WhatsApp: +225 07 04 30 66 42
• Calendly: https://calendly.com/kouassisadok3/30min pour réserver un appel

TARIFS APPROXIMATIFS :
• Site vitrine: À partir de 800€
• Application web: À partir de 1500€
• E-commerce: À partir de 2500€
• Projet sur mesure: Devis personnalisé

INSTRUCTIONS :
- Réponds en français avec un ton professionnel mais amical
- Utilise des emojis pour rendre les réponses plus engageantes
- Encourage toujours la prise de contact ou de rendez-vous
- Si on te demande des détails techniques, tu peux entrer dans les spécificités
- Pour les tarifs, propose toujours un appel pour un devis précis
- Reste dans le contexte de KSD et de ses services

Message utilisateur: ${message}`;

    // Utiliser l'API Hugging Face Inference
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: systemPrompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
            repetition_penalty: 1.1,
          },
          options: {
            wait_for_model: true,
            use_cache: true,
          }
        }),
      }
    );

    if (!response.ok) {
      // Si DialoGPT ne fonctionne pas, essayer avec un autre modèle
      console.log("DialoGPT failed, trying alternative approach...");
      
      const textGenResponse = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small",
        {
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: message,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.8,
              do_sample: true,
            },
            options: {
              wait_for_model: true,
            }
          }),
        }
      );

      if (!textGenResponse.ok) {
        // Fallback avec des réponses contextuelles
        const fallbackResponse = generateContextualResponse(message.toLowerCase());
        return new Response(
          JSON.stringify({ 
            response: fallbackResponse,
            source: "fallback"
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const textGenData = await textGenResponse.json();
      const aiResponse = Array.isArray(textGenData) ? textGenData[0]?.generated_text || textGenData[0]?.text || "Je suis là pour vous aider !" : textGenData.generated_text || textGenData.text || "Comment puis-je vous assister ?";

      return new Response(
        JSON.stringify({ 
          response: aiResponse,
          source: "huggingface-small"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Hugging Face response:", data);

    let aiResponse = "Je suis là pour vous renseigner sur KSD et ses services !";
    
    if (Array.isArray(data) && data.length > 0) {
      aiResponse = data[0].generated_text || data[0].text || aiResponse;
    } else if (data.generated_text) {
      aiResponse = data.generated_text;
    }

    // Nettoyer la réponse et ajouter du contexte KSD si nécessaire
    aiResponse = enhanceResponseWithKSDContext(aiResponse, message.toLowerCase());

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        source: "huggingface"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    
    // En cas d'erreur, utiliser une réponse de fallback intelligente
    let fallbackResponse = "🤖 Désolé, je rencontre une difficulté technique. Puis-je vous aider avec des informations sur KSD ?\n\n";
    
    const { message } = await req.json().catch(() => ({ message: "" }));
    
    if (message) {
      fallbackResponse += generateContextualResponse(message.toLowerCase());
    } else {
      fallbackResponse += "Vous pouvez me poser des questions sur :\n• Les projets de KSD\n• Ses compétences techniques\n• Comment le contacter\n• Réserver un rendez-vous";
    }

    return new Response(
      JSON.stringify({ 
        response: fallbackResponse,
        source: "error-fallback"
      }),
      {
        status: 200, // Pas d'erreur côté client
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateContextualResponse(message: string): string {
  if (message.includes('projet') || message.includes('réalisation') || message.includes('portfolio')) {
    return "🚀 KSD a développé plusieurs projets impressionnants :\n\n• **E-Shop** - Plateforme e-commerce avec panier intelligent\n• **CasaCentral** - App immobilière avec géolocalisation\n• **CVForge** - Générateur de CV professionnel\n• **Plume Partagée** - Plateforme de blog collaborative\n• **LogoCraft** - Créateur de logos avec IA\n\nVoulez-vous en savoir plus sur un projet spécifique ? 📋";
  }
  
  if (message.includes('compétence') || message.includes('technologie') || message.includes('stack')) {
    return "💻 KSD maîtrise parfaitement la **MERN Stack** et plus :\n\n**Frontend :**\n• React, TypeScript, Next.js\n• Tailwind CSS, Material-UI\n• Responsive design & animations\n\n**Backend :**\n• Node.js, Express.js\n• API REST, GraphQL\n• Authentication & sécurité\n\n**Databases :**\n• MongoDB, PostgreSQL, MySQL\n\n**DevOps :**\n• Git, Docker, AWS, Vercel\n\nUn vrai passionné des technologies modernes ! 🔥";
  }
  
  if (message.includes('rendez-vous') || message.includes('rdv') || message.includes('calendly') || message.includes('appel')) {
    return "📅 **Parfait !** Réservez directement un créneau avec KSD :\n\n🔗 **Calendly :** https://calendly.com/kouassisadok3/30min\n\n✅ Appel de 30 minutes\n✅ Discussion de votre projet\n✅ Conseils personnalisés\n✅ Devis sur mesure\n\nKSD sera ravi d'échanger avec vous ! 😊";
  }
  
  if (message.includes('contact') || message.includes('email') || message.includes('whatsapp') || message.includes('téléphone')) {
    return "📞 **Contactez KSD facilement :**\n\n📧 **Email :** kouassisadok3@gmail.com\n💬 **WhatsApp :** +225 07 04 30 66 42\n📅 **Calendly :** Réservation directe d'appel\n📝 **Formulaire :** Sur ce site web\n\n**Conseil :** Pour un échange rapide, WhatsApp ou Calendly sont idéaux ! 🚀";
  }
  
  if (message.includes('tarif') || message.includes('prix') || message.includes('coût') || message.includes('budget')) {
    return "💰 **Tarifs transparents** (à partir de) :\n\n🌐 **Site vitrine :** 800€\n⚛️ **Application web :** 1 500€\n🛒 **E-commerce complet :** 2 500€\n🎯 **Projet sur mesure :** Devis personnalisé\n\n**Important :** Les prix varient selon la complexité et les fonctionnalités.\n\n📞 **Réservez un appel** pour un devis précis et personnalisé ! 🎯";
  }

  if (message.includes('qui') || message.includes('présentation') || message.includes('sadok') || message.includes('ksd')) {
    return "👨‍💻 **KSD (Kouassi Sadok)** - Développeur Fullstack passionné\n\n🎯 **Spécialisé en :** MERN Stack & applications modernes\n⚡ **Force :** Solutions rapides et élégantes\n🎨 **Style :** Design moderne + Code propre\n🚀 **Mission :** Transformer vos idées en applications performantes\n\n**Fun fact :** Il adore résoudre des défis techniques complexes ! 🧩\n\nVoulez-vous voir ses réalisations ? 📱";
  }
  
  return "🤔 **Je suis là pour vous renseigner sur :**\n\n• 🚀 Les projets et réalisations de KSD\n• 💻 Ses compétences techniques détaillées\n• 📅 Comment réserver un rendez-vous\n• 📞 Les différents moyens de contact\n• 💰 Les tarifs et devis personnalisés\n\n**Que souhaitez-vous savoir en particulier ?** 😊";
}

function enhanceResponseWithKSDContext(response: string, userMessage: string): string {
  // Si la réponse est trop courte ou générique, l'améliorer
  if (response.length < 50 || response.includes("I") || response.includes("Hello")) {
    return generateContextualResponse(userMessage);
  }
  
  // Nettoyer la réponse et s'assurer qu'elle reste dans le contexte
  let cleanResponse = response.replace(/^(User:|Assistant:|Human:)/gi, '').trim();
  
  // Ajouter un call-to-action si approprié
  if (!cleanResponse.includes('calendly') && !cleanResponse.includes('contact') && Math.random() > 0.7) {
    cleanResponse += "\n\n💡 **Besoin d'aide ?** Réservez un appel avec KSD pour discuter de votre projet !";
  }
  
  return cleanResponse;
}