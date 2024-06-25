<script setup lang="ts">
const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" mode="hover" :popper="{ placement: 'bottom' }">
    <div class="flex flex-col items-center">
      <UIcon class="text-xl" name="i-mdi-menu" />
      <span>Menu</span>
    </div>
  </UDropdown>
</template>
