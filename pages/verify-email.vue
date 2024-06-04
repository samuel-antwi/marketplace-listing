<script setup lang="ts">
import { useUser } from "~/composables/Auth/auth";
const verificationCode = ref("");
const toast = useToast();
const isLoading = ref(false);

const verifyCode = async () => {
  isLoading.value = true;
  try {
    await $fetch("/api/email-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: verificationCode.value }),
    });
    await navigateTo("/");
    isLoading.value = false;
  } catch (error) {
    console.error("Failed to verify code:", error);
    isLoading.value = false;
  }
};

const resendVerificationEmail = async () => {
  try {
    await $fetch("/api/resend-verification-code", { method: "POST" });
    toast.add({
      title: "Success",
      description:
        "Verification email has been resent. Please check your inbox.",
      timeout: 5000,
      color: "green",
    });
  } catch (error) {
    console.error("Failed to resend verification email:", error);
  }
};

const user = useUser();
watch(
  user,
  () => {
    if (!user?.value) {
      return navigateTo("/");
    }
    if (user.value) {
      return navigateTo("/account");
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
        <UButton :loading="isLoading" size="lg" type="submit" block>
          Verify
        </UButton>
      </form>
      <div class="mt-5">
        <UButton
          :loading="isLoading"
          type="button"
          size="lg"
          @click="resendVerificationEmail"
          block
          color="gray"
        >
          Resend Verification Email
        </UButton>
      </div>
    </div>
  </div>
</template>
