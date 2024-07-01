<script setup lang="ts">
import type { Category } from "@/types/category";
import { useUser } from "~/composables/Auth/auth";

definePageMeta({
  layout: "default",
});

const user = useUser();
const route = useRoute();
</script>

<template>
  <UContainer class="mt-10">
    <p>{{ route.params.slug }}</p>
  </UContainer>
</template>
