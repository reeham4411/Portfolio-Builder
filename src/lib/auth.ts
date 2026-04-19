import { createClient } from "@/lib/supabase/server";

/**
 * Returns the authenticated user from the current session,
 * or null if not authenticated. Safe to call in API routes and
 * server components.
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
}

/**
 * Returns the authenticated user and throws a 401-friendly error
 * if not authenticated. Use in protected API routes.
 */
export async function requireAuthUser() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}