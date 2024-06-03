<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "~/composables/Auth/auth";
const verificationCode = ref("");

const verifyCode = async () => {
  try {
    await $fetch("/api/email-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: verificationCode.value }),
    });
    await navigateTo("/");
  } catch (error) {
    console.error("Failed to verify code:", error);
  }
};

const resendVerificationEmail = async () => {
  try {
    // Replace with your API call to resend verification email
    await fetch("/api/resend-verification-email", { method: "POST" });
    alert("Verification email resent. Please check your inbox.");
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    alert("Failed to resend verification email. Please try again later.");
  }
};

const user = useUser();
watch(
  user,
  () => {
    if (user?.value?.email_verified) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white py-6 px-10 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
      <p class="mb-4 text-gray-600 text-center">
        A verification code has been sent to your email address. Please enter
        the code below to verify your account.
      </p>
      <form @submit.prevent="verifyCode" class="space-y-4">
        <input
          type="text"
          v-model="verificationCode"
          placeholder="Verification Code"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <UButton size="lg" type="submit" block> Verify </UButton>
      </form>
      <div class="mt-5">
        <UButton size="lg" @click="resendVerificationEmail" block color="gray">
          Resend Verification Email
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
