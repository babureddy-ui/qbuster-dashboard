"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageRoutes } from "@/pages/routes";

const navItems = pageRoutes
  .filter((item) => !item.hideSidebar)
  .map((item) => ({
    href: `/${item.route}`,
    name: item.name,
    match: `/${item.route.split("/")[0]}`,
  }));

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/assets/logonew.svg"
            alt="QueueBuster"
            width={140}
            height={18}
            priority
            className="h-auto w-32"
          />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.match || pathname.startsWith(`${item.match}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-qb-blue text-white"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
