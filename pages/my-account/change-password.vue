<script setup lang="ts">
import { useUser } from "../../composables/Auth/auth";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
</script>

<template>
  <div>
    <h4>Change your password</h4>
    <p>{{ user?.name }}</p>
  </div>
</template>