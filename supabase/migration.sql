-- Life Organizer: Database Schema Migration
-- Run this in Supabase SQL Editor after creating the project

-- ============================================
-- 1. Profiles (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  active_family_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. Families
-- ============================================
CREATE TABLE IF NOT EXISTS public.families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family members can view family"
  ON public.families FOR SELECT USING (
    id IN (
      SELECT family_id FROM public.family_members WHERE user_id = auth.uid()
    )
    OR created_by = auth.uid()
  );

CREATE POLICY "Users can create families"
  ON public.families FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Owner can update family"
  ON public.families FOR UPDATE USING (created_by = auth.uid());

-- ============================================
-- 3. Family Members
-- ============================================
CREATE TYPE public.family_member_role AS ENUM ('owner', 'spouse', 'child', 'other');

CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role public.family_member_role NOT NULL DEFAULT 'other',
  is_financial_contributor BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  birth_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family members can view members"
  ON public.family_members FOR SELECT USING (
    family_id IN (
      SELECT family_id FROM public.family_members fm WHERE fm.user_id = auth.uid()
    )
    OR family_id IN (
      SELECT id FROM public.families WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Family owner can insert members"
  ON public.family_members FOR INSERT WITH CHECK (
    family_id IN (
      SELECT id FROM public.families WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Family owner can update members"
  ON public.family_members FOR UPDATE USING (
    family_id IN (
      SELECT id FROM public.families WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Family owner can delete members"
  ON public.family_members FOR DELETE USING (
    family_id IN (
      SELECT id FROM public.families WHERE created_by = auth.uid()
    )
  );

-- ============================================
-- 4. Family Invites
-- ============================================
CREATE TABLE IF NOT EXISTS public.family_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  invite_code TEXT UNIQUE NOT NULL,
  role public.family_member_role DEFAULT 'spouse',
  member_id UUID REFERENCES public.family_members(id),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.family_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family owner can manage invites"
  ON public.family_invites FOR ALL USING (
    family_id IN (
      SELECT id FROM public.families WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Anyone can view invites by code"
  ON public.family_invites FOR SELECT USING (TRUE);

-- ============================================
-- 5. Add FK from profiles to families
-- ============================================
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_active_family_fk
  FOREIGN KEY (active_family_id) REFERENCES public.families(id);

-- ============================================
-- 6. Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, onboarding_completed)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
