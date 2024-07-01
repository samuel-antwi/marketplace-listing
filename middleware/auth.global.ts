import { useUser } from "../composables/Auth/auth";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useUser();
  const data = await useRequestFetch()("/api/users/user");

  if (data) {
    user.value = data;
  }
});
