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

/** Shared title/description shown by DashboardShell for every page. */
export const pageMeta = {
  dashboard: {
    title: "Dashboard",
    description: "Website content management dashboard.",
  },
  "industry-pages": {
    title: "Industry Pages",
    description: "Manage industry page content here.",
  },
};
