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

console.log(user.value);
</script>

<template>
  <div>
    <h1>Hello world</h1>
    <sign-out />
  </div>
</template>
