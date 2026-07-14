"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import PageHeader from "@/components/ui/PageHeader";
import { PageBody, PageErrorProvider } from "@/components/ui/PageError";

export default function DashboardShell({
  userName,
  title,
  description,
  children,
}) {
  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header userName={userName} title={title} />
        <main className="flex-1 p-6">
          <PageErrorProvider>
            <div className="flex flex-col gap-4">
              <PageHeader title={title} description={description} />
              <PageBody>{children}</PageBody>
            </div>
          </PageErrorProvider>
        </main>
      </div>
    </div>
  );
}
