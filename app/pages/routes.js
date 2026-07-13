import DashboardPage from "./dashboard";
import IndustryPagesPage from "./industryPages";

/**
 * Central page registry.
 * Add a page file here, then register it — URL will be /{key}
 */
export const pageRoutes = {
  dashboard: DashboardPage,
  "industry-pages": IndustryPagesPage,
};
