import DashboardPage from "./dashboard";
import IndustryPagesPage from "./industryPages";

/**
 * Central page registry.
 * Add a page file here, then register it — URL will be /{key}
 * Page title / description / buttons are defined on each page via PageHeader.
 */
export const pageRoutes = {
  dashboard: DashboardPage,
  "industry-pages": IndustryPagesPage,
};
