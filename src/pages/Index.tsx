import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

// Lazy load sections to reduce initial bundle size
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const EducationSection = lazy(() => import("@/components/EducationSection").then(module => ({ default: module.EducationSection })));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection").then(module => ({ default: module.ExperienceSection })));
const GallerySection = lazy(() => import("@/components/GallerySection").then(module => ({ default: module.GallerySection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));

// Already lazy loaded
const CalendlySection = lazy(() => import("@/components/CalendlySection").then(module => ({ default: module.CalendlySection })));
const ChatBot = lazy(() => import("@/components/ChatBot").then(module => ({ default: module.ChatBot })));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <CalendlySection />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Index;
