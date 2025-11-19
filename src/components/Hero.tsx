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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Industrial Automation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Logo Container - Left Side */}
          <div className="flex-shrink-0 animate-fade-up">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-white p-8 md:p-12 shadow-2xl flex items-center justify-center">
              <img src={cavaltronLogo} alt="CAVALTRON" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="flex-1 text-center md:text-left animate-fade-up" style={{
          animationDelay: '0.2s'
        }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Engenharia que impulsiona o amanhã
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
              Soluções completas em eletrônica e automação para grandes e pequenos negócio.                
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button and Scroll Indicator - Centered at Bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6 animate-fade-up" style={{
      animationDelay: '0.4s'
    }}>
        <Button onClick={handleCTAClick} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg shadow-[0_0_30px_hsl(46_100%_50%/0.5)] hover:shadow-[0_0_50px_hsl(46_100%_50%/0.7)] transition-all hover:scale-105 mx-[10px] my-[20px]">
          {heroContent?.cta_text || "Fale Conosco"}
        </Button>
        
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full p-1 shadow-[0_0_20px_hsl(46_100%_50%/0.4)]">
            <div className="w-1 h-3 bg-accent rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;