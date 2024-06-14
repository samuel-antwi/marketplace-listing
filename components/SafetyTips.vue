<script setup lang="ts">
import { ref } from "vue";

const safetyTips = ref([
  '"Meet in a public, well-lit area for the exchange of goods and services. Avoid meeting in secluded or poorly lit areas."',
  '"Always tell a friend or family member when and where you\'re meeting. If possible, bring someone along with you."',
  '"Don\'t share personal information like your home address, bank details, or other sensitive information."',
  '"Use cash or secure payment methods. Avoid wire transfers or other forms of payment that can be difficult to track or dispute."',
  '"Inspect the item fully before completing the transaction. Make sure it\'s in the condition that was advertised."',
  '"Be wary of deals that seem too good to be true. They often are."',
  '"Communicate through the platform as much as possible. This provides a record of your interaction."',
  '"Do not click on suspicious links or download attachments from unknown sources."',
  '"If a buyer or seller is pushing to move too fast or seems aggressive, it\'s okay to end the transaction."',
  '"Report any suspicious activity to the site administrators."',
]);

const currentTipIndex = ref(0);
const transitionName = ref("slide-left");

function nextTip() {
  currentTipIndex.value = (currentTipIndex.value + 1) % safetyTips.value.length;
  transitionName.value = "slide-left";
}

function previousTip() {
  currentTipIndex.value =
    (currentTipIndex.value - 1 + safetyTips.value.length) %
    safetyTips.value.length;
  transitionName.value = "slide-right";
}
</script>

<template>
  <div
    class="max-w-md p-6 mt-10 overflow-hidden bg-white border rounded-md shadow-lg"
  >
    <h1 class="mb-3 text-2xl border-b">Stay safe <Icon name="mdi:safe" /></h1>
    <transition :name="transitionName" mode="out-in">
      <p :key="currentTipIndex" class="h-20">
        {{ safetyTips[currentTipIndex] }}
      </p>
    </transition>
    <div class="flex items-center justify-between">
      <NuxtLink class="underline text-link" to="/">
        Read all safety tips
      </NuxtLink>
      <div class="flex items-center justify-between">
        <button
          :disabled="currentTipIndex === 0"
          class="underline text-primary-500 disabled:text-gray-500 disabled:cursor-not-allowed"
          @click="previousTip"
        >
          <UIcon class="text-3xl" name="i-mdi-chevron-left" />
        </button>
        <p>{{ currentTipIndex + 1 }} of {{ safetyTips.length }}</p>
        <button
          :disabled="currentTipIndex === safetyTips.length - 1"
          class="underline text-primary-500 disabled:text-gray-500 disabled:cursor-not-allowed"
          @click="nextTip"
        >
          <UIcon class="text-3xl" name="i-mdi-chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-left-leave-active,
.slide-right-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-100%);
}
</style>
