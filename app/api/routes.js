import * as login from "./auth/login";
import * as logout from "./auth/logout";
import * as pages from "./content/pages";

/**
 * Central API route registry.
 * Add new APIs here — no need for a new folder per endpoint.
 *
 * Example:
 *   import * as users from "./users";
 *   users: users,
 */
export const apiRoutes = {
  login,
  logout,
  pages,
};
