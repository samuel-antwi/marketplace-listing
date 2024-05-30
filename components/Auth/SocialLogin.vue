<script setup lang="ts">
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
const loginWithProvider = (provider: string) => {
  window.location.href = provider;
};
</script>

<template>
  <div>
    <div class="flex justify-between space-x-4 items-center">
      <button @click="loginWithProvider('/login/facebook')">
        <facebook-icon />
        <span>Facebook</span>
      </button>
      <button @click="loginWithProvider('/login/google')">
        <google-icon />
        <span>Google</span>
      </button>
    </div>
    <div class="my-8">
      <UDivider label="OR" />
    </div>
  </div>
</template>

<style scoped>
button {
  @apply border rounded-md w-full hover:bg-gray-100 flex justify-center space-x-3 text-gray-600 items-center text-center p-2;
}
</style>
