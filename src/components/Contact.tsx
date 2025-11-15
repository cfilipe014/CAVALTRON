import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

const Contact = () => {
  const { data: contactInfo } = useQuery({
    queryKey: ["contact-info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link;
    return Icon;
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          | Entre em contato comigo:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo?.map((contact) => {
            const Icon = getIcon(contact.icon);
            return (
              <a
                key={contact.id}
                href={contact.value}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-[var(--shadow-card)] bg-card group cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors group-hover:shadow-[var(--shadow-glow)]">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">{contact.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground break-words">
                      {contact.type === 'email' ? contact.value : 'Clique para acessar'}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
