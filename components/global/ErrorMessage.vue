<script setup lang="ts">
defineProps(["errorMsg"]);
</script>

<template>
  <div
    v-if="errorMsg"
    class="flex items-center p-8 mb-4 text-gray-700 bg-[#FAE7EC]"
  >
    <ExclamationCircleIcon class="w-6 h-6 mr-2 text-gray-900" />
    <UIcon
      class="w-6 h-6 mr-2 text-red-500"
      name="i-mdi-exclamation-triangle"
    />
    <p>{{ errorMsg }}</p>
  </div>
</template>
