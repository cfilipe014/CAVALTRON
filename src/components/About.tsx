import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { data: aboutContent } = useQuery({
    queryKey: ["site-content", "about"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "about")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            {aboutContent?.title || "| Sobre mim:"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {aboutContent?.content || "Sou Engenheiro Eletricista especializado em análise de defeitos eletrônicos, retrofit de equipamentos industriais, projetos de Indústria 4.0, desenvolvimento de projetos eletrônicos customizados e automação industrial completa."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
