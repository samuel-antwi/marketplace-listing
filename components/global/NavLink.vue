<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  to: string;
  icon?: string;
  title: string;
  isActive?: boolean;
}>();
const isActiveRoute = computed(() => route.fullPath === props.to);
</script>

<template>
  <NuxtLink :to="to">
    <div
      class="flex items-center p-4 border-b"
      :class="[
        isActiveRoute
          ? ' border-r-[4px] border-r-primary-500 font-medium text-gray-600'
          : 'text-gray-500',
      ]"
    >
      <UIcon class="mr-2 text-2xl" :name="icon" />
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
