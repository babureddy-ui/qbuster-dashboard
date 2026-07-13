export default function Header({ userName, title = "Dashboard" }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {userName ? (
          <>
            Signed in as{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {userName}
            </span>
          </>
        ) : null}
      </p>
    </header>
  );
}
