<script setup lang="ts">
import type { User } from "lucia";

const { $supabase } = useNuxtApp();

const users = ref<User[]>([]);

const fetchUsers = async () => {
  const { data, error } = await $supabase.from("user").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  users.value = data;
};

onMounted(() => {});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
