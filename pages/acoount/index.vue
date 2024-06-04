<script setup lang="ts">
import { useUser } from "../../composables/Auth/auth";

const user = useUser();
</script>

<template>
  <div>
    <h4>Welcome to your account</h4>
    <p>{{ user?.name }}</p>
    <sign-out />
  </div>
</template>
