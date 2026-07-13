import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import { SESSION_COOKIE } from "@/api/utils/session";
import { pageRoutes } from "@/pages/routes";

const pageTitles = {
  dashboard: "Dashboard",
  "industry-pages": "Industry Pages",
};

export default async function CatchAllPage({ params }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session) {
    redirect("/");
  }

  const { page } = await params;
  const routeKey = page?.join("/");
  const PageComponent = pageRoutes[routeKey];

  if (!PageComponent) {
    notFound();
  }

  return (
    <DashboardShell
      userName={session.value}
      title={pageTitles[routeKey] || "Dashboard"}
    >
      <PageComponent />
    </DashboardShell>
  );
}
