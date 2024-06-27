<script setup lang="ts">
import { useUser } from "@/composables/Auth/auth";

definePageMeta({
  middleware: "auth",
});

const user = useUser();
</script>

<template>
  <div>
    <h4>Help & Contact</h4>
    <p>{{ user?.name }}</p>
  </div>
</template>
