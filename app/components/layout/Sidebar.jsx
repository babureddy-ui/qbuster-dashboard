"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/industry-pages", label: "Industry Pages" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
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

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

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
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
