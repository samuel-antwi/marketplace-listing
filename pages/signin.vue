<script lang="ts" setup>
import { signinSchema } from "@/lib/schema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import ErrorMessage from "~/components/global/ErrorMessage.vue";

definePageMeta({
  layout: "auth",
});

const userDetails = ref({
  email: "",
  password: "",
});
const isSubmiting = ref(false);
const errorMessage = ref<string | null>(null);

type Schema = z.output<typeof signinSchema>;

async function signin(event: FormSubmitEvent<Schema>) {
  isSubmiting.value = true;
  errorMessage.value = null;
  const router = useRouter();

  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: userDetails.value,
    });
    await router.push("/my-account");
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
}
</script>

<template>
  <div
    class="shadow-md w-full relative border bg-white rounded-xl flex flex-col justify-center p-5 md:p-8"
  >
    <div>
      <div class="mb-7">
        <h1 class="font-semibold text-xl mb-2">Sign in to Onegii</h1>
        <p class="text-gray-600 text-sm">
          Welcome! Please sign in to your account.
        </p>
      </div>
      <error-message v-if="errorMessage" :errorMessage="errorMessage" />
      <div>
        <auth-social-login />
      </div>
      <UForm :schema="signinSchema" :state="userDetails" @submit="signin">
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
          <NuxtLink
            to="/forgot-password"
            class="tracking-wide text-sm text-primary-500"
          >
            Forgot password?
          </NuxtLink>
        </div>
        <UButton
          :loading="isSubmiting"
          trailing
          loading-icon="i-mdi-loading"
          block
          label="Continue"
          type="submit"
          class="mt-8 w-full"
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
      <p class="mt-5 text-sm">
        By creating an account you agree to our Terms and Conditions. Please
        read our Privacy Policy and Cookie Policy.
      </p>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-sm font-semibold text-gray-600;
}
</style>
