<script setup lang="ts">
const destination = useCookie("attemptedRoute");
onBeforeMount(() => {
  if (destination.value) destination.value = null;
});
</script>

<template>
  <div class="max-w-5xl px-4 mx-auto mt-10 text-gray-700">
    <div class="border-b border-gray-300">
      <h1 class="mb-3 text-2xl font-medium">
        You have been successfully logged out.
      </h1>
    </div>
    <safety-tips />
  </div>
</template>
