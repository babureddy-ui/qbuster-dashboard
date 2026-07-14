"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/api/actions/auth";
import { ErrorAlert } from "@/components/ui/ErrorBoundary";

export default function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login.mutateAsync({ username: userName, password });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/assets/logonew.svg"
          alt="QueueBuster"
          width={200}
          height={25}
          priority
          className="h-auto w-48"
        />
        <div className="flex w-full flex-col gap-1 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your credentials to continue
          </p>
        </div>
      </div>

      <ErrorAlert message={error} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="user_name"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          User name
        </label>
        <input
          id="user_name"
          name="user_name"
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Enter user name"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-14 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-qb-blue transition hover:text-qb-blue-hover"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="mt-1 rounded-lg bg-qb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-qb-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {login.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
