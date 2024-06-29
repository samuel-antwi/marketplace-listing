<script setup lang="ts">
const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],

  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];
</script>

<template>
  <div class="flex items-center justify-between">
    <div v-for="n in 8" :key="n">
      <UDropdown
        mode="hover"
        :items="items"
        :ui="{
          item: {
            disabled: 'cursor-text select-text',
            active: 'bg-white underline',
            padding: 'py-2.5',
          },
          width: 'w-full',
          padding: 'px-20',
          rounded: 'rounded-none',
          shadow: 'shadow-none',
        }"
        :popper="{ placement: 'bottom' }"
      >
        <p>Name</p>

        <template #account="{ item }">
          <div class="text-left">
            <h2 class="text-gray-900 text-lg">Browse by</h2>
          </div>
        </template>
        <template #item="{ item }">
          <div class="grid grid-cols-6">
            <div class="flex items-center col-span-1">
              <UIcon
                :name="item.icon"
                class="h-6 w-6 mr-3 text-gray-400 dark:text-gray-500"
              />
              <span class="truncate">{{ item.label }}</span>
            </div>
          </div>
        </template>
      </UDropdown>
    </div>
  </div>
</template>
