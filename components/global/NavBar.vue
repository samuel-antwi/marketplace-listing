<script setup lang="ts">
import { ref } from "vue";
import MenuDropDown from "./MenuDropDown.vue";
import { useStore } from "~/composables/Global/useStore";

const { isOpen } = useStore();

const searchQuery = ref("");
</script>

<template>
  <nav class="bg-gray-100 py-4">
    <UContainer>
      <div class="flex items-center justify-between space-x-4">
        <div class="flex items-center space-x-5">
          <div class="text-2xl font-bold">
            <NuxtLink to="/">ONE</NuxtLink>
          </div>
          <site-search class="min-w-[400px] hidden md:block" />
        </div>
        <div class="flex items-center space-x-5">
          <button
            @click="isOpen = true"
            type="button"
            class="flex md:hidden flex-col items-center"
          >
            <UIcon
              class="text-lg"
              name="i-heroicons-magnifying-glass-20-solid"
            />
            <span>Search</span>
          </button>
          <NuxtLink class="flex flex-col items-center" to="/">
            <UIcon class="text-lg" name="i-mdi-plus-circle-outline" />
            <span>Sell</span>
          </NuxtLink>
          <NuxtLink
            class="hidden md:flex flex-col items-center"
            to="/my-account"
          >
            <UIcon class="text-xl" name="i-mdi-user-outline" />
            <span>Account</span>
          </NuxtLink>
          <button>
            <menu-drop-down />
          </button>
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<style scoped>
nav {
  background-color: #f8f9fa;
}
</style>
