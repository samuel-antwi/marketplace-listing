<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  icon: String,
});

const { title, description, icon } = toRefs(props);
</script>

<template>
  <div>
    <div class="flex items-center text-gray-700">
      <UIcon :name="icon" class="mb-3 text-2xl mr-2" />
      <h1 class="mb-3 font-semibold">
        {{ title }}
      </h1>
    </div>
    <p class="text-gray-600">{{ description }}</p>
    <UDivider class="my-6" />
  </div>
</template>
