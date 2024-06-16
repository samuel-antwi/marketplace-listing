<script setup lang="ts">
import { useUser } from "../../composables/Auth/auth";
import HeaderView from "~/components/Account/HeaderView.vue";
import SubmitButton from "~/components/global/SubmitButton.vue";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
const isSubmiting = ref(false);

const formInput = ref({
  firstName: user.value?.given_name,
  lastName: user.value?.family_name,
  email: user.value?.email,
  mobile: user.value?.mobile,
});

function handleSubmit() {
  console.log(formInput.value);
}
</script>

<template>
  <div>
    <header-view
      title="My Details"
      description="Feel free to edit any of your details below so your account is totally up to date. (* Indicates a required field)."
      icon="i-mdi-user-outline"
    />
    <div class="max-w-sm">
      <UForm class="space-y-4" @submit="handleSubmit">
        <UFormGroup label="First name" name="first-name">
          <UInput
            v-model="formInput.firstName"
            size="lg"
            autocomplete="firstname"
          />
        </UFormGroup>
        <UFormGroup label="Last name" name="last-name">
          <UInput v-model="formInput.lastName" size="lg" autocomplete="email" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="formInput.email" size="lg" />
        </UFormGroup>
        <UFormGroup label="Contact number" name="contact-number">
          <UInput
            v-model="formInput.mobile"
            size="lg"
            type="text"
            autocomplete="contact"
          />
        </UFormGroup>
        <submit-button
          :loading="isSubmiting"
          size="xl"
          block
          label="Save changes"
        />
      </UForm>
    </div>
  </div>
</template>
