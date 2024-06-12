<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-gray-700 text-center mb-4">
        Invalid password reset link.
      </h2>
      <p class="text-gray-700 text-center mb-6">
        It seems the link to reset your password has expired. Click on the
        button below to request a new link.
      </p>
      <UButton
        @click="$router.push('/forgot-password')"
        block
        size="lg"
        label="Request a New Reset Link"
      />
    </div>
  </div>
</template>
