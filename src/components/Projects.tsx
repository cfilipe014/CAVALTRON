import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
const Projects = () => {
  const {
    data: projects
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("projects").select("*").order("display_order", {
        ascending: true
      });
      if (error) throw error;
      return data;
    }
  });
  const handleProjectClick = (project: any) => {
    if (project.iframe_url) {
      window.open(project.iframe_url, "_blank");
    } else if (project.external_link) {
      window.open(project.external_link, "_blank");
    }
  };
  return <section id="projetos" className="py-20 md:py-32 bg-background" aria-labelledby="projects-heading">
      <div className="container px-4">
        <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">| Explore alguns projetos desenvolvidos por nós:</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Cada projeto representa uma solução customizada desenvolvida com foco em resultados mensuráveis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects?.map(project => <Card key={project.id} className="border-border hover:border-accent transition-all duration-300 hover:shadow-[var(--shadow-card)] bg-card flex flex-col">
              {project.image_url && <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>}
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground whitespace-pre-line">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleProjectClick(project)} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={!project.external_link && !project.iframe_url}>
                  Ver Detalhes
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Projects;