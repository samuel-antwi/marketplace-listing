<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "../../composables/Auth/auth";
import HeaderView from "~/components/Account/HeaderView.vue";
import SubmitButton from "~/components/global/SubmitButton.vue";
import ErrorMessage from "~/components/global/ErrorMessage.vue";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);
const toast = useToast();

const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirm_new_password: z
      .string()
      .min(6, "Confirm new password must be at least 6 characters long"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  });

type Schema = z.output<typeof passwordSchema>;

const formInput = ref({
  current_password: "",
  new_password: "",
  confirm_new_password: "",
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmNewPassword = ref(false);

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  try {
    await $fetch("/api/auth/change-password", {
      method: "POST",
      body: { id: user.value?.id, ...formInput.value },
    });

    toast.add({
      title: "Success",
      description: "Your password has been changed successfully.",
      timeout: 5000,
    });

    // Clear the input fields after successful password change
    formInput.value.current_password = "";
    formInput.value.new_password = "";
    formInput.value.confirm_new_password = "";
  } catch (error) {
    const errorMessageText =
      error?.response?._data?.message ||
      "An unexpected error occurred. Please try again.";
    errorMessage.value = errorMessageText;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div>
    <header-view
      title="Change Password"
      description="Please enter your current password and a new password to change your password."
      icon="i-mdi-lock-outline"
    />
    <div class="max-w-sm">
      <error-message v-if="errorMessage" :errorMessage="errorMessage" />
      <UForm
        @submit="handleSubmit"
        :schema="passwordSchema"
        :state="formInput"
        class="space-y-4"
      >
        <UFormGroup label="Current Password *" name="current_password">
          <div class="relative">
            <UInput
              v-model="formInput.current_password"
              :type="showCurrentPassword ? 'text' : 'password'"
              size="lg"
              autocomplete="current-password"
            />
            <span
              v-if="formInput.current_password"
              class="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              <UIcon
                :name="
                  showCurrentPassword
                    ? 'i-mdi-eye-off-outline'
                    : 'i-mdi-eye-outline'
                "
              />
            </span>
          </div>
        </UFormGroup>
        <UFormGroup label="New Password *" name="new_password">
          <div class="relative">
            <UInput
              v-model="formInput.new_password"
              :type="showNewPassword ? 'text' : 'password'"
              size="lg"
              autocomplete="new-password"
            />
            <span
              v-if="formInput.new_password"
              class="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
              @click="showNewPassword = !showNewPassword"
            >
              <UIcon
                :name="
                  showNewPassword
                    ? 'i-mdi-eye-off-outline'
                    : 'i-mdi-eye-outline'
                "
              />
            </span>
          </div>
        </UFormGroup>
        <UFormGroup label="Confirm New Password *" name="confirm_new_password">
          <div class="relative">
            <UInput
              v-model="formInput.confirm_new_password"
              :type="showConfirmNewPassword ? 'text' : 'password'"
              size="lg"
              autocomplete="new-password"
            />
            <span
              v-if="formInput.confirm_new_password"
              class="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
              @click="showConfirmNewPassword = !showConfirmNewPassword"
            >
              <UIcon
                :name="
                  showConfirmNewPassword
                    ? 'i-mdi-eye-off-outline'
                    : 'i-mdi-eye-outline'
                "
              />
            </span>
          </div>
        </UFormGroup>
        <submit-button
          :loading="isSubmitting"
          size="xl"
          block
          label="Change Password"
        />
      </UForm>
    </div>
  </div>
</template>
