<script setup lang="ts">
import type { Category } from "@/types/category";
import { useUser } from "~/composables/Auth/auth";

definePageMeta({
  layout: "default",
});

const user = useUser();
</script>

<template>
  <UContainer class="mt-10">
    <h4>Welcome back</h4>
    <p>{{ user?.given_name }}</p>
  </UContainer>
</template>
