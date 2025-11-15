-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Create site_content table for general editable content
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  cta_text TEXT,
  cta_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  external_link TEXT,
  iframe_url TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_info table
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Public can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Public can view contact info"
  ON public.contact_info FOR SELECT
  USING (true);

-- Create policies for authenticated users (admin) to manage content
CREATE POLICY "Authenticated users can manage site content"
  ON public.site_content FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage skills"
  ON public.skills FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage projects"
  ON public.projects FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage contact info"
  ON public.contact_info FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Create storage policies for project images
CREATE POLICY "Public can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update project images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.site_content (section, title, content, cta_text, cta_link) VALUES
  ('hero', 'Engenharia Elétrica & Automação Industrial', 'Soluções completas em eletrônica e automação para sua indústria', 'Fale Conosco', '#contato');

INSERT INTO public.site_content (section, title, content) VALUES
  ('about', '| Sobre mim:', 'Sou Engenheiro Eletricista especializado em análise de defeitos eletrônicos, retrofit de equipamentos industriais, projetos de Indústria 4.0, desenvolvimento de projetos eletrônicos customizados e automação industrial completa.');

INSERT INTO public.skills (title, description, icon, display_order) VALUES
  ('Visualização & Análise de Defeitos', 'Diagnóstico preciso e rápido de falhas em sistemas eletrônicos industriais', 'Search', 1),
  ('Elaboração e Gestão de Projetos', 'Planejamento e execução de projetos complexos com eficiência', 'ClipboardList', 2),
  ('Projetos Eletrônicos e Automação', 'Desenvolvimento de soluções customizadas para automação industrial', 'Cpu', 3),
  ('Suporte Técnico Especialista', 'Assistência técnica especializada e treinamento de equipes', 'Headphones', 4);

INSERT INTO public.projects (title, description, external_link, display_order) VALUES
  ('Automação Logística', 'Implementação de sistema completo de automação para otimização de processos logísticos. Resultados: Redução de 40% no tempo de processamento e aumento de 30% na eficiência operacional.', 'https://lovable.dev/', 1),
  ('Reparo Eletrônicos', 'Serviço especializado de diagnóstico e reparo de placas eletrônicas industriais. Índice de sucesso: 95% de placas recuperadas com garantia estendida.', 'https://lovable.dev/', 2),
  ('Retrofit Industrial', 'Modernização de equipamentos industriais legados com tecnologias atuais. Benefícios: Aumento de vida útil em 10 anos e integração com sistemas Industry 4.0.', 'https://lovable.dev/', 3),
  ('Análise de Dados Industrial', 'Dashboard interativo para monitoramento em tempo real de indicadores de produção. KPIs: OEE, disponibilidade, performance e qualidade.', 'https://lovable.dev/', 4),
  ('Integração de Sistemas', 'Integração de múltiplos sistemas industriais com dashboard centralizado. Resultados: Visibilidade completa da operação e tomada de decisão baseada em dados.', 'https://lovable.dev/', 5);

INSERT INTO public.contact_info (type, label, value, icon) VALUES
  ('website', 'Site', 'https://lovable.dev/', 'Globe'),
  ('email', 'Email', 'contato@empresa.com', 'Mail'),
  ('linkedin', 'LinkedIn', 'https://linkedin.com/', 'Linkedin'),
  ('instagram', 'Instagram', 'https://instagram.com/', 'Instagram');