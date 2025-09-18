-- Create medias table for storing various media files (images, audios, videos)
CREATE TABLE public.medias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'audio', 'video'
  file_size BIGINT,
  mime_type TEXT,
  alt_text TEXT,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medias ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to medias (since it's a portfolio)
CREATE POLICY "Medias are viewable by everyone" 
ON public.medias 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_medias_updated_at
BEFORE UPDATE ON public.medias
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update contacts table to include appointment data
ALTER TABLE public.contact_messages 
ADD COLUMN phone TEXT,
ADD COLUMN subject TEXT,
ADD COLUMN appointment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN appointment_type TEXT, -- 'consultation', 'project_discussion', 'discovery_call'
ADD COLUMN status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
ADD COLUMN notes TEXT;

-- Create index for better performance on dates
CREATE INDEX idx_contact_messages_appointment_date ON public.contact_messages(appointment_date);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_medias_file_type ON public.medias(file_type);
CREATE INDEX idx_medias_featured ON public.medias(is_featured);