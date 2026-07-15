"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PageBody, PageErrorProvider } from "@/components/ui/PageError";

export default function DashboardShell({ userName, children }) {
  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header userName={userName} />
        <main className="flex-1 p-6">
          <PageErrorProvider>
            <PageBody>{children}</PageBody>
          </PageErrorProvider>
        </main>
      </div>
    </div>
  );
}
