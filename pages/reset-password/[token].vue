<script setup lang="ts">
import { ref } from "vue";
import ExpiredEmailLink from "@/components/Auth/ExpiredEmailLink.vue";
import { resetPasswordSchema } from "~/lib/schema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import ErrorMessage from "~/components/global/ErrorMessage.vue";

const formDetails = ref({
  password: "",
  confirmPassword: "",
});
const isSubmiting = ref(false);
const route = useRoute();
const isValidToken = ref<boolean | null>(null);
const errorMessage = ref<string | null>(null);

type Schema = z.output<typeof resetPasswordSchema>;

const resetPassword = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmiting.value = true;
    errorMessage.value = null;
    await $fetch(`/api/reset-password/${route.params.token as string}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: formDetails.value.password,
        confirmPassword: formDetails.value.confirmPassword,
      }),
    });
    await navigateTo("/");
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

onMounted(async () => {
  try {
    const response = await fetch(
      `/api/verify-forgot-password-link/${route.params.token as string}`
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
        <error-message v-if="errorMessage" :errorMessage="errorMessage" />
        <UForm
          :schema="resetPasswordSchema"
          :state="formDetails"
          @submit="resetPassword"
          class="space-y-4"
        >
          <UFormGroup label="Password" name="password">
            <UInput
              type="password"
              v-model="formDetails.password"
              placeholder="New Password"
              size="lg"
              name="password"
            />
          </UFormGroup>
          <UFormGroup label="Confirm Password" name="confirm-password">
            <UInput
              type="password"
              v-model="formDetails.confirmPassword"
              placeholder="Confirm Password"
              size="lg"
              name="confirm-password"
            />
          </UFormGroup>
          <UButton
            :loading="isSubmiting"
            trailing
            loading-icon="i-mdi-loading"
            block
            type="submit"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>
