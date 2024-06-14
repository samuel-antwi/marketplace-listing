<script setup lang="ts">
import { useUser } from "~/composables/Auth/auth";

definePageMeta({
  middleware: "auth",
});

const user = useUser();

const accountRoutes = [
  {
    name: "My Details",
    description:
      "View and edit all your details to keep your account up to date",
    icon: "i-mdi-user",
    to: "/account/my-details",
  },
  {
    name: "My Ads",
    description: "View and manage all your ads in one place",
    icon: "i-mdi-folder",
    to: "/account/my-ads",
  },
  {
    name: "Your Message",
    description: "View or respond to messages from Sellers and Buyers",
    icon: "i-mdi-email",
    to: "/account/messages",
  },
  {
    name: "Favorites",
    description: "View and manage all your favorites",
    icon: "i-mdi-heart",
    to: "/account/favourites",
  },
  {
    name: "Change Password",
    description: "Change your password",
    icon: "i-mdi-lock",
    to: "/account/change-password",
  },
];

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
  <div class="mt-10 max-w-4xl px-4 mx-auto">
    <h1 class="mb-5">Your Account</h1>
    <div
      class="md:grid lg:grid-cols-3 flex gap-3 flex-col md:space-y-0 grid-cols-2 md:gap-5"
    >
      <NuxtLink
        :to="to"
        class="col-span-1"
        v-for="{ name, to, description, icon } in accountRoutes"
        :key="name"
      >
        <div
          class="hover:bg-gray-100 bg-white relative p-5 card rounded-lg shadow-none border border-[#d5d9d9]"
        >
          <div class="grid grid-cols-3">
            <div
              class="w-12 col-span-1 h-12 flex items-center justify-center rounded-full bg-primary-400"
            >
              <UIcon :name="icon" class="text-4xl text-gray-100" />
            </div>
            <div class="col-span-2">
              <h2 class="text-lg font-medium text-gray-700">{{ name }}</h2>
              <p class="text-gray-500">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 100%;
}
</style>
