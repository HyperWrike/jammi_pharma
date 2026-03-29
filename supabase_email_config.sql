-- Create email_config table
CREATE TABLE IF NOT EXISTS public.email_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL UNIQUE,
    recipients TEXT[] NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE public.email_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to email_config"
    ON public.email_config FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to email_config"
    ON public.email_config FOR ALL
    USING (public.is_admin());

-- Insert default configurations
INSERT INTO public.email_config (event_type, recipients) VALUES
('order_confirmation', ARRAY['frontdesk@jammi.org', 'njammi@gmail.com']),
('order_shipped', ARRAY['frontdesk@jammi.org'])
ON CONFLICT (event_type) DO UPDATE SET recipients = EXCLUDED.recipients;

-- Apply updated_at trigger
CREATE TRIGGER update_email_config_updated_at
    BEFORE UPDATE ON public.email_config
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();
