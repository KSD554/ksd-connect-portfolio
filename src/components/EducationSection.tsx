import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react";

const educations = [
  {
    id: 1,
    degree: "Licence Professionnelle en Informatique Décisionnelle",
    school: "HETEC - Bouaké",
    period: "2022 - 2025",
    description: "Formation spécialisée en informatique décisionnelle, analyse de données, Business Intelligence et développement web.",
    current: true
  },
  {
    id: 2,
    degree: "Baccalauréat S2",
    school: "Groupe Scolaire Yalla Suur-En - Dakar",
    period: "2021 - 2022",
    description: "Formation scientifique avec spécialisation en mathématiques et sciences expérimentales.",
    current: false
  },
  {
    id: 3,
    degree: "BEPC",
    school: "Collège Privé Imes - Bouaké",
    period: "2014 - 2015",
    description: "Formation générale du collège avec obtention du Brevet d'Études du Premier Cycle.",
    current: false
  }
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GraduationCap className="inline-block w-12 h-12 mr-4 text-primary" />
            Formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mon parcours académique qui m'a permis d'acquérir les compétences nécessaires pour exceller dans le développement web.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {educations.map((education, index) => (
            <Card 
              key={education.id}
              className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up border-border/50 ${
                education.current ? 'ring-2 ring-primary/20 bg-gradient-card' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                      {education.degree}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground">
                      {education.school}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>{education.period}</span>
                    {education.current && (
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs ml-2">
                        En cours
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {education.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};