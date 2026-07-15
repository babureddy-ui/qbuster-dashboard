"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PageBody, PageErrorProvider } from "@/components/ui/PageError";

export default function DashboardShell({ userName, children }) {
  return (
    <div className="min-h-dvh bg-zinc-50 dark:bg-black">
      <Sidebar />
      <Header userName={userName} />
      <main className="ml-56 min-h-dvh pt-14">
        <div className="p-6">
          <PageErrorProvider>
            <PageBody>{children}</PageBody>
          </PageErrorProvider>
        </div>
      </main>
    </div>
  );
}
