import DashboardPage from "./dashboard";
import IndustryPagesList from "./industryPages/List";
import IndustryPagesCreate from "./industryPages/Create";

/**
 * Central page registry.
 * `route` = URL path without a leading slash.
 * `hideSidebar: true` keeps the route out of the sidebar.
 */
export const pageRoutes = [
  {
    route: "dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    route: "industry-pages/list",
    name: "Industry Pages",
    component: IndustryPagesList,
  },
  {
    route: "industry-pages/create",
    name: "Create Industry Page",
    component: IndustryPagesCreate,
    hideSidebar: true,
  },
];
