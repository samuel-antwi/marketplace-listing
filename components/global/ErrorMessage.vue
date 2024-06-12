<script setup lang="ts">
defineProps(["errorMessage"]);
</script>

<template>
  <div
    class="bg-[#f1d0d0d0] relative rounded mb-6 p-4 border border-[#e5a5af] text-[#ad2e2c] w-full text-left"
  >
    <UIcon name="i-mdi-alert-circle" class="absolute left-2 mt-[2px]" />
    <p class="text-sm ml-3">{{ errorMessage }}</p>
  </div>
</template>
