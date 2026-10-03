CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  company text NOT NULL CHECK (char_length(company) BETWEEN 2 AND 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 40),
  requirement text NOT NULL CHECK (char_length(requirement) BETWEEN 10 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE FUNCTION public.touch_inquiries_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER touch_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.touch_inquiries_updated_at();