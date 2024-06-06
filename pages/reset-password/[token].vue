<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const emailSent = ref(false);
const passwordReset = ref(false);
const isSubmitting = ref(false);

const sendResetEmail = async () => {
  try {
    await fetch("/api/send-reset-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });
    emailSent.value = true;
  } catch (error) {
    console.error("Failed to send reset email:", error);
    alert("Failed to send reset email. Please try again later.");
  }
};

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match. Please try again.");
    return;
  }
  try {
    // Replace with your API call to reset the password
    await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword.value }),
    });
    passwordReset.value = true;
  } catch (error) {
    console.error("Failed to reset password:", error);
    alert("Failed to reset password. Please try again later.");
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>
      <form @submit.prevent="resetPassword" class="space-y-4">
        <UInput
          required
          type="password"
          v-model="newPassword"
          placeholder="New Password"
        />
        <UInput
          required
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm New Password"
        />
        <UButton
          :loading="isSubmitting"
          trailing
          loading-icon="i-mdi-loading"
          block
          type="submit"
        >
          Submit
        </UButton>
      </form>
    </div>
  </div>
</template>
