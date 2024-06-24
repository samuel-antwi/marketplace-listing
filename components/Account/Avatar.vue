<script setup lang="ts">
import { useUser } from "~/composables/Auth/auth";

const initials = ref("");
const user = useUser();

const updateInitials = () => {
  if (user?.value?.given_name && user?.value?.family_name) {
    initials.value = user.value.given_name[0] + user.value.family_name[0];
  } else {
    initials.value = "";
  }
};

watch(() => user.value, updateInitials, { immediate: true, deep: true });
</script>

<template>
  <div>
    <div class="hidden py-8 mb-2 bg-white shadow lg:block">
      <div class="items-center lg:flex">
        <div
          class="flex items-center mb-3 lg:mb-0 -ml-5 justify-center w-20 h-20 bg-[#2D2D2D] rounded-full"
        >
          <img
            class="rounded-full"
            v-if="user?.picture"
            :src="user?.picture"
            :alt="`${user?.given_name} ${user?.family_name}`"
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
            {{ `${user?.given_name} ${user?.family_name}` }}
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
