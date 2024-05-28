<script setup lang="ts">
import { useUser } from "../composables/Auth/auth";
import { watch } from "vue";
import SignOut from "../components/Auth/SignOut.vue";
const user = useUser();

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
  <div>
    <h4>Welcome back</h4>
    <p>{{ user?.name }}</p>
    <sign-out />
  </div>
</template>
