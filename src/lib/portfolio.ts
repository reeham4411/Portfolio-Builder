import { createClient } from "@/lib/supabase/server";
import type { PortfolioData, PortfolioRow, TemplateId } from "@/types/portfolio";

/**
 * Fetch a single portfolio by ID.
 * Only returns it if the requesting user owns it, or it is published (RLS handles this).
 */
export async function getPortfolioById(id: string): Promise<PortfolioRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as PortfolioRow;
}

/**
 * Fetch a published portfolio by slug — public, no auth required.
 */
export async function getPortfolioBySlug(slug: string): Promise<PortfolioRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data as PortfolioRow;
}

/**
 * List all portfolios belonging to the authenticated user.
 */
export async function listUserPortfolios(userId: string): Promise<PortfolioRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as PortfolioRow[];
}

/**
 * Upsert (create or update) a portfolio draft.
 */
export async function upsertPortfolio(params: {
  portfolioId: string | null;
  userId: string;
  title: string;
  templateId: TemplateId;
  content: PortfolioData;
}): Promise<PortfolioRow> {
  const supabase = await createClient();

  const payload = {
    user_id: params.userId,
    title: params.title,
    template_id: params.templateId,
    content_json: {
      personalInfo: params.content.personalInfo,
      skills: params.content.skills,
      projects: params.content.projects,
      experience: params.content.experience,
    },
    updated_at: new Date().toISOString(),
  };

  let query;

  if (params.portfolioId) {
    query = supabase
      .from("portfolios")
      .update(payload)
      .eq("id", params.portfolioId)
      .eq("user_id", params.userId)
      .select()
      .single();
  } else {
    query = supabase
      .from("portfolios")
      .insert(payload)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to save portfolio");
  }

  return data as PortfolioRow;
}

/**
 * Publish a portfolio — sets is_published = true and assigns a slug.
 */
export async function publishPortfolio(params: {
  portfolioId: string;
  userId: string;
  slug: string;
}): Promise<PortfolioRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .update({
      is_published: true,
      slug: params.slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.portfolioId)
    .eq("user_id", params.userId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to publish portfolio");
  }

  return data as PortfolioRow;
}

/**
 * Delete a portfolio by ID (owner only).
 */
export async function deletePortfolio(params: {
  portfolioId: string;
  userId: string;
}): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("portfolios")
    .delete()
    .eq("id", params.portfolioId)
    .eq("user_id", params.userId);

  if (error) {
    throw new Error(error.message ?? "Failed to delete portfolio");
  }
}