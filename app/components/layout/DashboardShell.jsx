import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardShell({ userName, title, children }) {
  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header userName={userName} title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
