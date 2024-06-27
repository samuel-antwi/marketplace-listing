import { useUser } from "@/composables/Auth/auth";

export function useLogout() {
  const isLoading = useState("isLoading", () => false);
  const router = useRouter();
  const user = useUser();

  async function logout() {
    console.log("logout");
    isLoading.value = true;
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      user.value = null;
      console.log("user", user.value);
      await router.push("/logout");
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    logout,
  };
}
