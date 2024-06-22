<script setup lang="ts">
import { ref, computed } from "vue";
import { useUser } from "../../composables/Auth/auth";
import HeaderView from "~/components/Account/HeaderView.vue";
import SubmitButton from "~/components/global/SubmitButton.vue";
import { edituserSchema } from "@/lib/schema";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import ErrorMessage from "~/components/global/ErrorMessage.vue";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
const isSubmitting = ref(false);

const toast = useToast();

const initialFormInput = {
  given_name: user.value?.given_name || "",
  family_name: user.value?.family_name || "",
  email: user.value?.email || "",
  mobile: user.value?.mobile || "",
};

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

function getChangedFields() {
  const changedFields: Partial<typeof initialFormInput> = {};
  if (formInput.value.given_name !== initialFormInput.given_name) {
    changedFields.given_name = formInput.value.given_name;
  }
  if (formInput.value.family_name !== initialFormInput.family_name) {
    changedFields.family_name = formInput.value.family_name;
  }
  if (formInput.value.email !== initialFormInput.email) {
    changedFields.email = formInput.value.email;
  }
  if (formInput.value.mobile !== initialFormInput.mobile) {
    changedFields.mobile = formInput.value.mobile;
  }
  return changedFields;
}

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  console.log("submitting");
  isSubmitting.value = true;
  const changedFields = getChangedFields();
  try {
    await $fetch("/api/users/update", {
      method: "PUT",
      body: { id: user.value?.id, ...changedFields },
    });
    toast.add({
      title: "Success",
      description: "Your details have been updated successfully.",
      timeout: 5000,
    });
  } catch (e) {
    if (
      (e as any).response &&
      (e as any).response._data &&
      (e as any).response._data.message
    ) {
      errorMessage.value = (e as any).response._data.message;
      toast.add({
        title: "Error",
        description: (e as any).response._data.message,
        timeout: 0,
        color: "red",
      });
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
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
