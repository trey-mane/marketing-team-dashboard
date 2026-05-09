import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardIndex() {
  const session = await auth();
  if (!session) redirect("/login");
  const role = (session.user as { role?: string })?.role;
  redirect(`/dashboard/${role}`);
}
