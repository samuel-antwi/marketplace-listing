<script setup lang="ts">
import { useStore } from "~/composables/Global/useStore";
import SiteSearch from "~/components/global/SiteSearch.vue";

const { isOpen } = useStore();
</script>

<template>
  <div>
    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
        }"
      >
        <template #header>
          <div class="flex items-center justify-end">
            <UButton
              size="xl"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="text-xl"
              @click="isOpen = false"
            />
          </div>
          <site-search class="mt-3" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>
