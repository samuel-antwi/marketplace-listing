<script lang="ts" setup>
import { authSchema } from "@/lib/schema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: "auth",
});

const userDetails = ref({
  email: "",
  password: "",
  given_name: "",
  family_name: "",
});
const isSubmitting = ref(false);
const errorMsg = ref("");
const toast = useToast();

type Schema = z.output<typeof authSchema>;

async function signup(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  errorMsg.value = "";

  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: userDetails.value,
    });
    isSubmitting.value = false;
    await navigateTo("/verify-email");
  } catch (e: any) {
    isSubmitting.value = false;
    if (e.data?.message) {
      if (e.data.statusCode === 400) {
        errorMsg.value = e.data.message;
      } else {
        toast.add({ title: e.data.message, timeout: 0 });
      }
    } else {
      errorMsg.value = "An unexpected error occurred. Please try again.";
    }
  }
}
</script>

<template>
  <div
    class="shadow-md bg-white w-full border rounded-xl flex flex-col justify-center items-center p-5 md:p-8"
  >
    <div>
      <div class="mb-7 text-center">
        <h1 class="font-semibold text-xl mb-2">Create your account</h1>
        <p class="text-gray-600 text-sm">
          Welcome! Please fill in the details to get started.
        </p>
      </div>
      <div>
        <auth-social-login />
      </div>
      <UForm :schema="authSchema" :state="userDetails" @submit="signup">
        <div class="flex space-x-4 mb-5">
          <div>
            <UFormGroup label="First name" name="given_name">
              <UInput
                name="given_name"
                id="given_name"
                size="lg"
                v-model="userDetails.given_name"
              />
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="Last name" name="family_name">
              <UInput
                v-model="userDetails.family_name"
                name="family_name"
                id="family_name"
                size="lg"
              />
            </UFormGroup>
          </div>
        </div>
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
          <div v-if="errorMsg" class="text-sm flex items-center text-red-500">
            <UIcon name="i-mdi-alert-circle" class="mr-1" />
            {{ errorMsg }}
          </div>
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
          :disabled="isSubmitting"
          :loading="isSubmitting"
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
          <NuxtLink to="/signin" class="tracking-wide">
            Already have an account?
            <span class="text-primary-500">Sign in</span>
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
