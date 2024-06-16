<script setup lang="ts">
import { useUser } from "~/composables/Auth/auth";

const user = useUser();

//   Get Initials
const initials = computed(() => {
  return user.value?.name
    .split(" ")
    .map((n) => n[0])
    .join("");
});
</script>

<template>
  <div>
    <div class="hidden py-8 mb-2 bg-white shadow md:block">
      <div class="items-center lg:flex">
        <div
          class="flex items-center mb-3 lg:mb-0 -ml-5 justify-center w-20 h-20 bg-[#2D2D2D] rounded-full"
        >
          <img
            class="rounded-full"
            v-if="user?.picture"
            :src="user?.picture"
            :alt="user?.name"
          />
          <span
            v-else
            class="font-semibold text-gray-100 lg:text-2xl md:text-2xl"
            >{{ initials }}</span
          >
        </div>
        <div class="ml-4 lg:ml-2">
          <h2 class="text-gray-700">Hi,</h2>
          <h2 class="text-lg font-medium tracking-wide capitalize">
            {{ user?.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-overview {
  background: url("/images/account-overview.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 112px;
}
</style>
