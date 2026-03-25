-- Table: public.cms_content

CREATE TABLE IF NOT EXISTS public.cms_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT,
    content_type TEXT CHECK (content_type IN ('text', 'html', 'image_url', 'url', 'boolean', 'json')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Essential Unique Constraint for Upsert
ALTER TABLE public.cms_content DROP CONSTRAINT IF EXISTS cms_content_page_section_content_key_key;
ALTER TABLE public.cms_content 
    ADD CONSTRAINT cms_content_page_section_content_key_key UNIQUE (page, section, content_key);

-- Row Level Security
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read
DROP POLICY IF EXISTS "Public can view cms content" ON public.cms_content;
CREATE POLICY "Public can view cms content"
    ON public.cms_content
    FOR SELECT
    USING (true);

-- Policy: Admin can insert
DROP POLICY IF EXISTS "Admins can insert cms content" ON public.cms_content;
CREATE POLICY "Admins can insert cms content"
    ON public.cms_content
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE admin_users.auth_user_id = auth.uid() AND admin_users.status = 'active'
        )
    );

-- Policy: Admin can update
DROP POLICY IF EXISTS "Admins can update cms content" ON public.cms_content;
CREATE POLICY "Admins can update cms content"
    ON public.cms_content
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE admin_users.auth_user_id = auth.uid() AND admin_users.status = 'active'
        )
    );

-- Policy: Admin can delete
DROP POLICY IF EXISTS "Admins can delete cms content" ON public.cms_content;
CREATE POLICY "Admins can delete cms content"
    ON public.cms_content
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE admin_users.auth_user_id = auth.uid() AND admin_users.status = 'active'
        )
    );
