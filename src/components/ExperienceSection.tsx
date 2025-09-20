import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Étudiant en Informatique Décisionnelle",
    company: "HETEC - Bouaké",
    location: "Bouaké, Côte d'Ivoire",
    period: "2022 - 2025",
    description: "Formation en analyse de données, Business Intelligence et développement web. Spécialisé dans Python, les bases de données et la visualisation de données.",
    skills: ["Python", "MySQL", "MongoDB", "Power BI", "Tableau", "Django", "React", "JavaScript", "Excel Avancé", "Matplotlib"],
    current: true
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <Briefcase className="inline-block w-12 h-12 mr-4 text-primary" />
            Compétences & Formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ma formation actuelle et les compétences techniques que je développe en informatique décisionnelle.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <Card 
              key={experience.id}
              className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up border-border/50 ${
                experience.current ? 'ring-2 ring-primary/20 bg-card' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                      {experience.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground mb-2">
                      {experience.company}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    {experience.current && (
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                        Actuellement
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>
                
                <div className="pt-4">
                  <h4 className="text-sm font-semibold mb-3 text-foreground">Technologies utilisées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};