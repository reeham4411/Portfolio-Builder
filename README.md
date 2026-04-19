# Folio — AI Portfolio Builder

Folio is a full-stack portfolio builder that allows users to create, edit, save, and publish professional portfolio websites through a guided multi-step workflow. Users can choose a template, fill in their personal and project details, preview the portfolio live, use AI to improve content, and publish the final portfolio with a shareable URL.

---

## Features

### Core Features

- Guided portfolio builder
- Multiple portfolio templates
- Real-time preview pane
- Save draft portfolios
- Edit saved portfolios
- Delete saved portfolios
- Publish portfolio with unique public link
- View published portfolio publicly

### Authentication

- Email magic-link authentication with Supabase
- Protected dashboard
- User-specific saved portfolios

### AI Features

- AI-generated project descriptions
- AI-generated/refined portfolio content
- Groq API integration

### Portfolio Management

- Dashboard to view saved portfolios
- Edit existing portfolios
- Delete saved portfolios
- Published vs draft state

### Public Portfolio

- Shareable live URL using slug
- Public portfolio route
- Template-based rendering

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Context API

### Backend

- Next.js Route Handlers (`app/api/...`)
- Supabase Auth
- Supabase Database

### AI

- Groq API

### Deployment

- Vercel
- Live URL : https://folio-portfolio-builder.vercel.app/

---

## How the Application Works

### 1. Authentication

Users sign up or log in using an email magic link through Supabase.

### 2. Builder Flow

The user:

- selects a template
- fills personal information
- adds skills
- adds projects
- adds experience
- previews everything live
- publishes the portfolio

### 3. Saving

Drafts are saved to Supabase and associated with the currently authenticated user.

### 4. Editing

Saved portfolios can be opened from the dashboard.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

If the repo already exists locally:

```bash
git pull origin main
```

### 2. Install Dependencies

```bash
npm install
```

If needed, also install these packages manually:

```bash
npm install @supabase/supabase-js @supabase/ssr groq-sdk @vercel/analytics
```

### 3. Install Dependencies

```bash
npm install
```

If needed, also install these packages manually:

```bash
npm install @supabase/supabase-js @supabase/ssr groq-sdk @vercel/analytics
```

### 4. Run the Development Server

```bash
npm run dev
```

If Turbopack causes issues, use:

```bash
npx next dev --webpack
```

Open:

```text
http://localhost:3000
```

---

## Supabase Setup

### 1. Create a Supabase Project

Go to Supabase and create a new project.

### 2. Copy Project Credentials

From the project dashboard, copy:

- Project URL
- Anon Key

Add them to `.env.local`.

### 3. Configure Authentication

In Supabase dashboard:

**Authentication → URL Configuration**

Set:

- Site URL
  - `http://localhost:3000`
- Redirect URLs
  - `http://localhost:3000/auth/callback`

For production later, add:

- `https://your-vercel-domain.vercel.app/auth/callback`

### 4. Enable Email Magic Link

Go to:

**Authentication → Email**

Enable magic link / email login if not already enabled.

You may customize the email template if you want.

---

## Supabase Database Tables

Run the following SQL in the Supabase SQL Editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.profiles (
id uuid primary key references auth.users(id) on delete cascade,
email text unique,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
);

create table if not exists public.portfolios (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
title text not null,
slug text unique,
template_id text not null check (template_id in ('minimalist', 'bold', 'creative')),
content_json jsonb not null default '{}'::jsonb,
is_published boolean not null default false,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
);

create index if not exists portfolios_user_id_idx on public.portfolios(user_id);
create index if not exists portfolios_slug_idx on public.portfolios(slug);

alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can view own portfolios" on public.portfolios;
create policy "Users can view own portfolios"
on public.portfolios
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own portfolios" on public.portfolios;
create policy "Users can insert own portfolios"
on public.portfolios
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own portfolios" on public.portfolios;
create policy "Users can update own portfolios"
on public.portfolios
for update
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can delete own portfolios" on public.portfolios;
create policy "Users can delete own portfolios"
on public.portfolios
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Published portfolios are public" on public.portfolios;
create policy "Published portfolios are public"
on public.portfolios
for select
to anon, authenticated
using (is_published = true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
insert into public.profiles (id, email)
values (new.id, new.email)
on conflict (id) do nothing;
return new;
end;

$$
;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

---

## AI Setup

This project uses Groq API for AI text generation.

### What AI is used for

- generating project descriptions
- improving written portfolio content
- assisting users in writing better bios and portfolio text

If AI route fails, check:

- Groq API key
- selected Groq model
- route handler logs

---

## Deployment on Vercel

### 1. Push project to GitHub

```bash
git add .
git commit -m "Prepare project for deployment"
git push origin main
```

### 2. Import repository into Vercel

Go to Vercel and import the GitHub repository.

### 3. Add Environment Variables in Vercel

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_APP_URL=https://YOUR_PROJECT_NAME.vercel.app
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

### 4. Update Supabase for Production

In Supabase:

- Site URL
  - `https://YOUR_PROJECT_NAME.vercel.app`
- Redirect URL
  - `https://YOUR_PROJECT_NAME.vercel.app/auth/callback`

### 5. Redeploy

After updating environment variables, redeploy the Vercel project.

---

## Future Improvements

- Custom domains
- Portfolio analytics
- Image uploads
- Drag and drop reordering
- PDF export
- More templates
- Theme customization
- Resume mode
- AI-assisted bio generation improvements

---

## Author

Built as a full-stack AI-enabled portfolio builder using Next.js, Supabase, Groq, and Vercel.

$$
$$
