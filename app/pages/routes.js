import WelcomePage from "./welcome-page";
import TestPage from "./test-page";

/**
 * Central page registry.
 * Add a page file here, then register it — URL will be /{key}
 *
 * Example:
 *   import DashboardPage from "./dashboard";
 *   dashboard: DashboardPage,
 */

export const pageRoutes = {
  "welcome-page": WelcomePage,
  "test-page": TestPage,
};
