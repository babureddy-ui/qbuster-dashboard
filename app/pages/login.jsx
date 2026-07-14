import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function PagesHome() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <LoginForm />
    </div>
  );
}
