import { useUser } from "../composables/Auth/auth";
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useUser();
  const attemptedRoute = useCookie("attemptedRoute");

  const data = await useRequestFetch()("/api/users/user");
  if (data) {
    user.value = data;
  } else {
    user.value = null;
  }

  const isAuthenticated = user.value;

  if (!isAuthenticated) {
    // Prevent infinite redirect to the login page
    if (to.path !== "/signin") {
      attemptedRoute.value = to.fullPath;
      return "/signin";
    }
  } else {
    if (isAuthenticated && attemptedRoute.value) {
      const destination = attemptedRoute.value;
      attemptedRoute.value = null;

      // Prevent infinite redirect to the same route
      if (destination !== to.fullPath) {
        attemptedRoute.value = null;
        return destination;
      }
    } else {
      return true;
    }
  }
});
