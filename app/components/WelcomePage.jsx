import LogoutButton from "@/components/buttions/LogoutButton";

export default function WelcomePage({ userName }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Hello,{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {userName}
            </span>
            . You have successfully logged in.
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
