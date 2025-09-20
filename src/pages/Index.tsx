import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";

// Lazy load sections to reduce initial bundle size
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const EducationSection = lazy(() => import("@/components/EducationSection").then(module => ({ default: module.EducationSection })));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection").then(module => ({ default: module.ExperienceSection })));
const GallerySection = lazy(() => import("@/components/GallerySection").then(module => ({ default: module.GallerySection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const ChatBot = lazy(() => import("@/components/ChatBot").then(module => ({ default: module.ChatBot })));

// Intersection Observer hook for performance
const useIntersectionObserver = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
};

const Index = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const projectsVisible = useIntersectionObserver(projectsRef);
  const educationVisible = useIntersectionObserver(educationRef);
  const experienceVisible = useIntersectionObserver(experienceRef);
  const galleryVisible = useIntersectionObserver(galleryRef);
  const contactVisible = useIntersectionObserver(contactRef);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <div ref={projectsRef} className="min-h-[200px]">
          {projectsVisible && (
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
              <ProjectsSection />
            </Suspense>
          )}
        </div>
        
        <div ref={educationRef} className="min-h-[200px]">
          {educationVisible && (
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
              <EducationSection />
            </Suspense>
          )}
        </div>
        
        <div ref={experienceRef} className="min-h-[200px]">
          {experienceVisible && (
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
              <ExperienceSection />
            </Suspense>
          )}
        </div>
        
        <div ref={galleryRef} className="min-h-[200px]">
          {galleryVisible && (
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
              <GallerySection />
            </Suspense>
          )}
        </div>
        
        <div ref={contactRef} className="min-h-[200px]">
          {contactVisible && (
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
              <ContactSection />
            </Suspense>
          )}
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Index;
