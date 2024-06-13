<script setup lang="ts">
defineProps(["errorMessage"]);
</script>

<template>
  <div
    class="bg-[#FDF3F5] relative mb-6 p-4 border-l-2 border-[#D91440] w-full text-left"
  >
    <p class="text-sm ml-3">{{ errorMessage }}</p>
  </div>
</template>
