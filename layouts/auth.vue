<script setup lang="ts">
import NavBar from "@/components/global/navigation/NavBar.vue";
</script>

<template>
  <div>
    <nav-bar />
    <div class="max-w-lg mx-auto mt-12 px-4 flex justify-center items-center">
      <slot />
    </div>
  </div>
</template>
