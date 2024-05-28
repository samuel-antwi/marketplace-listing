<script lang="ts" setup>
import { useUser } from "~/composables/Auth/auth";
import { signupValidationSchema } from "@/lib/shema";
import useFormaValidate from "../composables/useFormValidate";
import { first } from "lodash-es";

definePageMeta({
  layout: "auth",
});

const userDetails = ref({
  email: "",
  password: "",
  first_name: "",
  last_name: "",
});
const { validate, errors, isValid, getError, scrolltoError } = useFormaValidate(
  signupValidationSchema,
  userDetails.value,
  {
    mode: "eager",
  }
);
const router = useRouter();
const user = useUser();
async function signup(e: Event) {
  await validate();
  if (isValid.value) {
    const formData = new FormData(e.target as HTMLFormElement);
    await $fetch("/api/signup", {
      method: "POST",
      body: formData,
    });
    if (user.value) {
      router.push("/");
    }
  }
}
</script>

<template>
  <div
    class="shadow-md w-full border rounded-xl flex flex-col justify-center items-center p-5 md:p-8"
  >
    <div>
      <div class="mb-4 text-center">
        <h1 class="font-semibold text-xl mb-2">Create your account</h1>
        <p class="text-gray-600 text-sm">
          Welcome! Please fill in the details to get started.
        </p>
      </div>
      <form method="post" action="/api/signup" @submit.prevent="signup">
        <div class="flex space-x-4 mb-5">
          <div>
            <label htmlFor="email">First name</label>
            <UInput
              :class="{ 'border-red-400': !!getError('email') }"
              v-model="userDetails.first_name"
              name="first_name"
              id="first_name"
              size="sm"
            />
          </div>
          <div>
            <label htmlFor="email">Last name</label>
            <UInput
              :class="{ 'border-red-400': !!getError('email') }"
              v-model="userDetails.last_name"
              name="first_name"
              id="first_name"
              size="sm"
            />
          </div>
        </div>
        <div class="mb-5">
          <label htmlFor="email">Email</label>
          <UInput
            :class="{ 'border-red-400': !!getError('email') }"
            v-model="userDetails.email"
            name="email"
            id="email"
            size="sm"
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <UInput
            :ui="{ 'border-red-400': !!getError('email') }"
            v-model="userDetails.password"
            name="password"
            id="password"
            size="sm"
          />
        </div>
        <UButton
          block
          label="Continue"
          type="submit"
          class="mt-5 w-full"
          :disabled="!isValid"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-sm font-semibold text-gray-600;
}
</style>
