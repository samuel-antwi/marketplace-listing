<script setup lang="ts">
import NavBar from "~/components/global/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <UContainer class="mt-12">
      <slot></slot>
    </UContainer>
  </div>
</template>
