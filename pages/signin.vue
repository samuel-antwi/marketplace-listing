<script lang="ts" setup>
import { loginSchema } from "@/lib/shema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: "auth",
});

const userDetails = ref({
  email: "",
  password: "",
});
const isSubmiting = ref(false);

type Schema = z.output<typeof loginSchema>;

async function signup(event: FormSubmitEvent<Schema>) {
  isSubmiting.value = true;
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: userDetails.value,
    });
    await navigateTo("/");
    isSubmiting.value = false;
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div
    class="shadow-md w-full border bg-white rounded-xl flex flex-col justify-center p-5 md:p-8"
  >
    <div>
      <div class="mb-7 text-center">
        <h1 class="font-semibold text-xl mb-2">Sign in to Onegii</h1>
        <p class="text-gray-600 text-sm">
          Welcome! Please sign in to your account.
        </p>
      </div>
      <div>
        <auth-social-login />
      </div>
      <UForm :schema="loginSchema" :state="userDetails" @submit="signup">
        <div class="mb-5">
          <UFormGroup label="Email" name="email">
            <UInput
              icon="i-mdi-email"
              v-model="userDetails.email"
              name="email"
              id="email"
              size="lg"
            />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Password" name="password">
            <UInput
              icon="i-mdi-lock"
              v-model="userDetails.password"
              name="password"
              id="password"
              size="lg"
              type="password"
              autocomplete="new-password"
            />
          </UFormGroup>
        </div>
        <UButton
          :disabled="isSubmiting"
          :loading="isSubmiting"
          block
          label="Continue"
          type="submit"
          class="mt-5 w-full"
          size="lg"
        />
      </UForm>
      <UDivider class="mt-5" />
      <div class="flex items-center mt-5 justify-end">
        <div class="text-sm">
          <NuxtLink to="/signup" class="tracking-wide">
            Don't have an account? <span class="text-primary-500">Sign up</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-sm font-semibold text-gray-600;
}
</style>
