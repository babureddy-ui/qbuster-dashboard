import DashboardShell from "@/components/layout/DashboardShell";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/notFound";
import { pageRoutes } from "@/pages/routes";

/**
 * Main page entry for all routes:
 * - `/` → login
 * - `/{key}` → page from pageRoutes + DashboardShell
 * - unknown key → custom 404 inside dashboard shell
 */
export default async function Page({ params }) {
  const { page } = await params;
  const segments = page || [];

  if (segments.length === 0) {
    return <LoginPage />;
  }

  const routeKey = segments.join("/");
  const PageComponent = pageRoutes.find((r) => r.route === routeKey)?.component;

  return (
    <DashboardShell>
      {PageComponent ? <PageComponent /> : <NotFoundPage />}
    </DashboardShell>
  );
}
