import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import ApiProvider from "@/api/provider";
import DevToolsThemeSync from "@/components/DevToolsThemeSync";
import { THEME_COOKIE_KEY, themeBootScript } from "@/lib/theme";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_KEY)?.value;
  const isDark = themeCookie === "dark";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${
        isDark ? "dark" : "light"
      }`}
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.theme-ready) body { visibility: hidden; }
              html.dark { color-scheme: dark; background: #0a0a0a; }
              html.light { color-scheme: light; background: #ffffff; }
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <DevToolsThemeSync />
        <ApiProvider initialIsDark={isDark}>
          {children}
        </ApiProvider>
      </body>
    </html>
  );
}
