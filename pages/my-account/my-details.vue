<script setup lang="ts">
import { ref, computed } from "vue";
import { useUser } from "../../composables/Auth/auth";
import HeaderView from "~/components/Account/HeaderView.vue";
import SubmitButton from "~/components/global/SubmitButton.vue";
import { edituserSchema } from "@/lib/schema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import ErrorMessage from "~/components/global/ErrorMessage.vue";
import type { User } from "lucia";
import type { Category } from "@/types/category";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
const isSubmitting = ref(false);

const userKey = computed(() => JSON.stringify(user.value));

const toast = useToast();

const {
  given_name = "",
  family_name = "",
  email = "",
  mobile = "",
  auth_method = "email",
} = user.value || {};
const initialFormInput = { given_name, family_name, email, mobile };

const formInput = ref({ ...initialFormInput });
const errorMessage = ref<string | null>(null);

type Schema = z.output<typeof edituserSchema>;

const isFormChanged = computed(() => {
  return (
    formInput.value.given_name !== initialFormInput.given_name ||
    formInput.value.family_name !== initialFormInput.family_name ||
    formInput.value.email !== initialFormInput.email ||
    formInput.value.mobile !== initialFormInput.mobile
  );
});

const isEmailEditable = computed(() => auth_method === "email");

/**
 * Function to get the fields that have been changed in the form.
 * It compares the current form input values with the initial form input values.
 * If a value has changed, it adds that field to the changedFields object.
 */
function getChangedFields(): Partial<typeof initialFormInput> {
  return Object.keys(initialFormInput).reduce((changedFields, key) => {
    const typedKey = key as keyof typeof initialFormInput;
    if (formInput.value[typedKey] !== initialFormInput[typedKey]) {
      changedFields[typedKey] = formInput.value[typedKey];
    }
    return changedFields;
  }, {} as Partial<typeof initialFormInput>);
}

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  const changedFields = getChangedFields();

  try {
    const data: User | null = await $fetch("/api/users/update", {
      method: "PUT",
      body: { id: user.value?.id, ...changedFields },
    });

    if (data) {
      user.value = data;
    }

    toast.add({
      title: "Success",
      description: "Your details have been updated successfully.",
      timeout: 5000,
    });
  } catch (error) {
    const errorMessageText =
      error?.response?._data?.message ||
      "An unexpected error occurred. Please try again.";
    errorMessage.value = errorMessageText;

    toast.add({
      title: "Error",
      description: errorMessageText,
      timeout: error?.response?._data?.message ? 0 : 5000,
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div :key="userKey">
    <header-view
      title="My Details"
      description="Feel free to edit any of your details below so your account is totally up to date. (* Indicates a required field)."
      icon="i-mdi-user-outline"
    />
    <div class="max-w-sm">
      <error-message v-if="errorMessage" :errorMessage="errorMessage" />
      <UForm
        @submit="handleSubmit"
        :schema="edituserSchema"
        :state="formInput"
        class="space-y-4"
      >
        <UFormGroup label="First name *" name="given_name">
          <UInput
            v-model="formInput.given_name"
            size="lg"
            autocomplete="given_name"
          />
        </UFormGroup>
        <UFormGroup label="Last name *" name="family_name">
          <UInput
            v-model="formInput.family_name"
            size="lg"
            autocomplete="email"
          />
        </UFormGroup>
        <UFormGroup label="Email *" name="email">
          <UInput
            v-model="formInput.email"
            size="lg"
            :disabled="!isEmailEditable"
          />
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
          :loading="isSubmitting"
          :disabled="!isFormChanged"
          size="xl"
          block
          label="Save changes"
        />
      </UForm>
    </div>
  </div>
</template>
