export const THEME_STORAGE_KEY = "qb-theme";
export const THEME_COOKIE_KEY = "qb-theme";

export function resolveTheme() {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme) {
  const html = document.documentElement;
  const next = theme === "dark" ? "dark" : "light";

  html.classList.remove(next === "dark" ? "light" : "dark");
  html.classList.add(next);
  window.localStorage.setItem(THEME_STORAGE_KEY, next);
  document.cookie = `${THEME_COOKIE_KEY}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

/**
 * Runs before paint. Restores theme from cookie/localStorage/system
 * and marks html as theme-ready so body can show.
 */
export const themeBootScript = `
(function () {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var cookieMatch = document.cookie.match(/(?:^|; )${THEME_COOKIE_KEY}=([^;]*)/);
    var cookieTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    var preferred =
      stored === "dark" || stored === "light"
        ? stored
        : cookieTheme === "dark" || cookieTheme === "light"
          ? cookieTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    var root = document.documentElement;
    root.classList.add(preferred);
    root.classList.remove(preferred === "dark" ? "light" : "dark");
    localStorage.setItem(key, preferred);
    document.cookie = "${THEME_COOKIE_KEY}=" + preferred + "; Path=/; Max-Age=31536000; SameSite=Lax";
    root.classList.add("theme-ready");
  } catch (e) {
    document.documentElement.classList.add("theme-ready");
  }
})();
`;
