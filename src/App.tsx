import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { Navbar } from "@/components/Navbar";
import { HeroAndStats } from "@/components/HeroAndStats";
import {
  AboutSection, ServicesSection, SkillsSection, ProjectsSection,
  ProcessSection, PricingSection, TestimonialsSection, ContactSection, Footer,
} from "@/components/Sections";
import { ModalsAndForms, FloatingWhatsApp } from "@/components/ModalsAndForms";
import { AdminDashboard } from "@/components/AdminDashboard";
import { NinAndStoreModals, NinServicesPage, ProductsPage, QuickCommercialActions, NinServicesSection, StoreSection } from "@/components/NinAndStore";
import { Toaster } from "@/components/ui/sonner";

function ToasterMount() {
  const { theme } = usePortfolio();
  return <Toaster richColors position="top-center" theme={theme} />;
}

export default function App() {
  const path = window.location.pathname;
  const dedicatedPage = path === "/nin-services" ? <NinServicesPage /> : path === "/products" || path === "/mifi-routers" ? <ProductsPage /> : null;
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        {dedicatedPage ?? <main>
          <HeroAndStats />
          <QuickCommercialActions />
          <NinServicesSection />
          <StoreSection />
          <AboutSection />
          <ServicesSection />
          <SkillsSection />
          <ProjectsSection />
          <ProcessSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
        </main>}
        <Footer />
        <ModalsAndForms />
        <NinAndStoreModals />
        <AdminDashboard />
        <FloatingWhatsApp />
        <ToasterMount />
      </div>
    </PortfolioProvider>
  );
}