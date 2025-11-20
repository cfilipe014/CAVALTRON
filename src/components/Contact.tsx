import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as LucideIcons from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(1, "Celular é obrigatório").max(20),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
const Contact = () => {
  const { toast } = useToast();
  const {
    data: contactInfo
  } = useQuery({
    queryKey: ["contact-info"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("contact_info").select("*");
      if (error) throw error;
      return data;
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link;
    return Icon;
  };
  return <section id="contato" className="py-20 md:py-32 bg-muted/30" aria-labelledby="contact-heading">
      <div className="container px-4">
        <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          | Entre em contato conosco:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo?.map(contact => {
          const Icon = getIcon(contact.icon);
          return <a key={contact.id} href={contact.value} target="_blank" rel="noopener noreferrer" className="block">
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
              </a>;
        })}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground">
          | Envie sua mensagem:
        </h3>

        <Card className="max-w-2xl mx-auto border-border bg-card">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Seu nome completo"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="seu@email.com"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Celular *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(00) 00000-0000"
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Descreva sua dúvida ou solicitação..."
                  className="mt-1 min-h-[120px]"
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>;
};
export default Contact;