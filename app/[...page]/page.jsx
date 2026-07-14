import { notFound } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import { pageMeta, pageRoutes } from "@/pages/routes";

export default async function CatchAllPage({ params }) {
  const { page } = await params;
  const routeKey = page?.join("/");
  const PageComponent = pageRoutes[routeKey];
  const meta = pageMeta[routeKey] || {
    title: "Dashboard",
    description: "",
  };

  if (!PageComponent) {
    notFound();
  }

  return (
    <DashboardShell title={meta.title} description={meta.description}>
      <PageComponent />
    </DashboardShell>
  );
}
