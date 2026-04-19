import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listUserPortfolios } from "@/lib/portfolio";
import DashboardClient from "./_components/DashBoardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const portfolios = await listUserPortfolios(user.id);

  return <DashboardClient user={user} portfolios={portfolios} />;
}
