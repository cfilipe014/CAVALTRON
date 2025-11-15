import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

const Skills = () => {
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Box;
    return Icon;
  };

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
          Principais Segmentos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skills?.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <Card 
                key={skill.id} 
                className="border-border hover:border-accent transition-all duration-300 hover:shadow-[var(--shadow-card)] bg-card group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
