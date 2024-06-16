<script setup lang="ts">
defineProps<{
  loading?: boolean;
  size?: string;
  block?: boolean;
  label: string;
}>();
</script>

<template>
  <UButton
    trailing
    :loading="loading"
    loading-icon="i-mdi-loading"
    :size="size"
    :block="block"
    type="submit"
  >
    {{ label }}
  </UButton>
</template>
