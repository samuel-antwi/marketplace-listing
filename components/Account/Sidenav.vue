<script setup lang="ts">
import NavLink from "../global/NavLink.vue";

const accountRoutes = [
  {
    title: "My Details",
    description:
      "View and edit all your details to keep your account up to date",
    icon: "i-mdi-user-outline",
    to: "/account/my-details",
  },
  {
    title: "My Ads",
    description: "View and manage all your ads in one place",
    icon: "i-mdi-folder-outline",
    to: "/account/my-ads",
  },
  {
    title: "Your Message",
    description: "View or respond to messages from Sellers and Buyers",
    icon: "i-mdi-email-outline",
    to: "/account/messages",
  },
  {
    title: "Favourites",
    description: "View and manage all your favorites",
    icon: "i-mdi-heart-outline",
    to: "/account/favourites",
  },
  {
    title: "Change Password",
    description: "Change your password",
    icon: "i-mdi-lock-outline",
    to: "/account/change-password",
  },
];

const isLoading = ref(false);

async function logout() {
  isLoading.value = true;
  try {
    await $fetch("/api/logout", {
      method: "POST",
    });
    await navigateTo("/logout");
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="shadow-md">
      <div
        class="hover:bg-gray-100 bg-white"
        v-for="{ title, icon, to } in accountRoutes"
        :key="title"
      >
        <NavLink :to="to" :icon="icon" :title="title" :isActive="true" />
      </div>
    </div>
    <div class="hover:bg-gray-100 bg-white shadow-md mt-5 p-4">
      <button
        :disabled="isLoading"
        @click="logout"
        class="flex items-center text-gray-500"
        type="button"
      >
        <UIcon name="i-mdi-logout" class="mr-2 text-2xl" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* You can add additional custom styles here if needed */
</style>
