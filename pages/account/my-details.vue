<script setup lang="ts">
import { useUser } from "../../composables/Auth/auth";
import HeaderView from "~/components/Account/HeaderView.vue";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
</script>

<template>
  <div>
    <header-view
      title="My Details"
      description="Feel free to edit any of your details below so your account is totally up to date. (* Indicates a required field)."
      icon="i-mdi-user-outline"
    />
    <p>{{ user?.name }}</p>
  </div>
</template>
