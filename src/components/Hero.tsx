import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import cavaltronLogo from "@/assets/cavaltron-logo.png";

const Hero = () => {
  const { data: heroContent } = useQuery({
    queryKey: ["site-content", "hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "hero")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleCTAClick = () => {
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Industrial Automation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={cavaltronLogo} 
            alt="CAVALTRON - Engenharia que impulsiona o amanhã" 
            className="h-40 md:h-56 lg:h-64 mx-auto mb-8 animate-fade-up"
          />
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            {heroContent?.content || "Soluções completas em eletrônica e automação para sua indústria"}
          </p>
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-[var(--shadow-glow)] transition-all hover:shadow-[0_0_40px_hsl(46_100%_50%/0.5)]"
          >
            {heroContent?.cta_text || "Fale Conosco"}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full p-1">
          <div className="w-1 h-3 bg-accent rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
