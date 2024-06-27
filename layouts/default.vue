<script setup lang="ts">
import NavBar from "@/components/global/navigation/NavBar.vue";
</script>

<template>
  <div>
    <nav-bar />
    <UContainer class="mt-12">
      <slot></slot>
    </UContainer>
  </div>
</template>
