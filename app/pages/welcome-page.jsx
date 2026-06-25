import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WelcomePage from "@/components/WelcomePage";
import { SESSION_COOKIE } from "@/api/lib/auth";

export const metadata = {
  title: "Welcome",
  description: "Welcome to your dashboard",
};

export default async function Welcome() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session) {
    redirect("/");
  }

  return <WelcomePage userName={session.value} />;
}
