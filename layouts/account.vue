<script setup lang="ts">
import Sidenav from "../components/Account/Sidenav.vue";
</script>

<template>
  <UContainer class="md:mt-20 mt-12">
    <div class="grid grid-cols-12 gap-10">
      <sidenav class="col-span-3" />
      <div class="col-span-9 bg-white p-5">
        <slot></slot>
      </div>
    </div>
  </UContainer>
</template>
