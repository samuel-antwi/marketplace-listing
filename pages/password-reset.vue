<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "~/composables/Auth/auth";

const email = ref("");
const isSubmiting = ref(false);
const toast = useToast();
const errorMessage = ref<string | null>(null);

const user = useUser();

const sendResetEmail = async () => {
  errorMessage.value = null;
  try {
    isSubmiting.value = true;
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
        " If the provided email address is associated with an account, a password reset link has been sent. Please check your inbox.",
      color: "green",
      timeout: 0,
    });
    email.value = "";
    isSubmiting.value = false;
  } catch (e) {
    if (
      (e as any).response &&
      (e as any).response._data &&
      (e as any).response._data.message
    ) {
      errorMessage.value = (e as any).response._data.message;
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  } finally {
    isSubmiting.value = false;
  }
};
watch(
  user,
  () => {
    if (user?.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>
      <p class="mb-4 text-gray-600 text-center">
        Enter your email address to receive a password reset link.
      </p>
      <div
        class="bg-[#f1d0d0d0] relative rounded mb-6 p-4 border border-[#e5a5af] text-[#ad2e2c] w-full text-left"
        v-if="errorMessage"
      >
        <UIcon name="i-mdi-alert-circle" class="absolute left-2" />
        <p class="text-sm ml-3">{{ errorMessage }}</p>
      </div>
      <form @submit.prevent="sendResetEmail" class="space-y-4">
        <UInput
          size="lg"
          type="email"
          v-model="email"
          placeholder="Email Address"
          required
        />

        <UButton
          type="submit"
          :loading="isSubmiting"
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
