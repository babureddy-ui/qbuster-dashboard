import PageHeader from "@/components/ui/PageHeader";


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Dashboard"
      />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Website Content Management System
        </p>
      </div>
    </div>
  );
}
