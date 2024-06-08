<script setup lang="ts">
import { ref } from "vue";
import ExpiredEmailLink from "@/components/Auth/ExpiredEmailLink.vue";

const newPassword = ref("");
const confirmPassword = ref("");
const isSubmitting = ref(false);
const route = useRoute();
const isValidToken = ref<boolean | null>(null);
const errorMessage = ref<string>("");

const toast = useToast();

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.add({
      title: "Passwords do not match",
      description: "Please make sure the passwords match",
      color: "red",
    });
  }
  try {
    isSubmitting.value = true;
    await $fetch(`/api/reset-password/${route.params.token as string}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword.value }),
    });
    await navigateTo("/");
  } catch (error) {
    console.error("Failed to reset password:", error);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await fetch(
      `/api/verify-password-reset-link/${route.params.token as string}`
    );
    if (response.ok) {
      isValidToken.value = true;
    } else {
      const errorData = await response.json();
      errorMessage.value = errorData.statusMessage || "Invalid token";
      isValidToken.value = false;
    }
  } catch (error) {
    console.error("Token validation error:", error);
    errorMessage.value =
      "An error occurred while validating the token. Please try again.";
    isValidToken.value = false;
  }
});
</script>

<template>
  <div>
    <expired-email-link v-if="isValidToken === false" />
    <div
      v-if="isValidToken === true"
      class="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>
        <form @submit.prevent="resetPassword" class="space-y-4">
          <UInput
            required
            type="password"
            v-model="newPassword"
            placeholder="New Password"
            size="lg"
          />
          <UInput
            required
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm New Password"
            size="lg"
          />
          <UButton
            :loading="isSubmitting"
            trailing
            loading-icon="i-mdi-loading"
            block
            type="submit"
            size="lg"
          >
            Submit
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>
