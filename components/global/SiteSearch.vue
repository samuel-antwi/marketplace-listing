<script setup lang="ts">
import { ref, computed } from "vue";

const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

const shouldShowShadow = computed(() => {
  return isFocused.value && window.innerWidth > 768;
});
</script>

<template>
  <div>
    <transition name="fade">
      <div
        v-if="shouldShowShadow"
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
      ></div>
    </transition>
    <UInput
      :ui="{ rounded: 'rounded-full' }"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      trailing
      placeholder="Search items"
      @focus="handleFocus"
      @blur="handleBlur"
      class="relative z-20"
    />
  </div>
</template>

<style scoped>
/* Ensure the shadow covers the entire page */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
