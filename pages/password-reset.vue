<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const isSubmitting = ref(false);
const toast = useToast();

const sendResetEmail = async () => {
  try {
    isSubmitting.value = true;
    await $fetch("/api/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });
    toast.add({
      title: "Success",
      description:
        " A password reset link has been sent to your email address. Please check your inbox.",
      color: "green",
      timeout: 0,
    });
    isSubmitting.value = false;
  } catch (error) {
    console.error("Failed to send reset email:", error);
    isSubmitting.value = false;
  }
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>
      <p class="mb-4 text-gray-600 text-center">
        Enter your email address to receive a password reset link.
      </p>
      <form @submit.prevent="sendResetEmail" class="space-y-4">
        <UInput
          size="lg"
          type="email"
          v-model="email"
          placeholder="Email Address"
        />

        <UButton
          type="submit"
          :loading="isSubmitting"
          loading-icon="i-mdi-loading"
          size="lg"
          block
          trailing
        >
          Send Reset Link
        </UButton>
      </form>
    </div>
  </div>
</template>
