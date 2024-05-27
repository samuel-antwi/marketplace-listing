<script lang="ts" setup>
import { useUser } from "../../composables/Auth/auth";
const user = useUser();
async function logout() {
  await $fetch("/api/logout", {
    method: "POST",
  });
  await navigateTo("/signin");
}

watch(
  user,
  () => {
    if (!user?.value) {
      return navigateTo("/signin");
    }
  },
  { immediate: true }
);
</script>

<template>
  <form @submit.prevent="logout">
    <button>Sign out</button>
  </form>
</template>
