import { notFound } from "next/navigation";
import { pageRoutes } from "@/pages/routes";

export default async function CatchAllPage({ params }) {
  const { page } = await params;
  const routeKey = page?.join("/");
  const PageComponent = pageRoutes[routeKey];

  if (!PageComponent) {
    notFound();
  }

  return <PageComponent />;
}
