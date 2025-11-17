import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import cavaltronLogo from "@/assets/cavaltron-logo.png";
const Hero = () => {
  const {
    data: heroContent
  } = useQuery({
    queryKey: ["site-content", "hero"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("site_content").select("*").eq("section", "hero").single();
      if (error) throw error;
      return data;
    }
  });
  const handleCTAClick = () => {
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Industrial Automation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/85" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Container with Enhanced Design */}
          <div className="mb-12 animate-fade-up">
            <div className="relative inline-block">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-white/30 to-white/20 rounded-3xl blur-2xl opacity-75 animate-pulse" />
              
              {/* Main logo container */}
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Inner subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl" />
                
                {/* Logo */}
                <img 
                  src={cavaltronLogo} 
                  alt="CAVALTRON - Engenharia que impulsiona o amanhã" 
                  className="h-40 md:h-56 lg:h-72 w-auto mx-auto relative z-10 drop-shadow-lg" 
                />
              </div>
            </div>
          </div>

          {/* Tagline with improved hierarchy */}
          <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl md:text-3xl lg:text-4xl mb-4 max-w-4xl mx-auto font-light leading-relaxed text-white/90">
              Soluções completas em
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-4 max-w-4xl mx-auto font-bold leading-tight">
              <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">eletrônica</span>
              {" e "}
              <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">automação</span>
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto font-light leading-relaxed text-white/90">
              para sua <span className="text-white font-bold drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">indústria</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={handleCTAClick} 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-xl shadow-[0_0_30px_hsl(46_100%_50%/0.4)] hover:shadow-[0_0_50px_hsl(46_100%_50%/0.6)] transition-all hover:scale-105"
            >
              {heroContent?.cta_text || "Fale Conosco"}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full p-1">
          <div className="w-1 h-3 bg-white/80 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>;
};
export default Hero;