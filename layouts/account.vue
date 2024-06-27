<script setup lang="ts">
import Sidenav from "../components/Account/Sidenav.vue";
import NavBar from "@/components/global/navigation/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <UContainer class="mt-12">
      <div class="lg:grid grid-cols-12 gap-10">
        <sidenav class="col-span-3 hidden lg:block" />
        <div class="col-span-9 bg-white p-8 rounded-lg">
          <slot></slot>
        </div>
      </div>
    </UContainer>
  </div>
</template>
