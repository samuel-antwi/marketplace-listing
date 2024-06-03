<script lang="ts" setup>
defineProps<{ code: string }>();
</script>

<template>
  <e-html lang="en">
    <e-button>{{ code }}</e-button>
  </e-html>
</template>
