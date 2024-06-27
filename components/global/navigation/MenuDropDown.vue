<script setup lang="ts">
import { ref, watch } from "vue";
import { useUser } from "@/composables/Auth/auth";
import { useLogout } from "@/composables/Auth/useLogout";
import type { User } from "lucia";

const user = useUser();
const { logout } = useLogout();
const items = ref(getItems(user.value));

watch(user, (newUser) => {
  items.value = getItems(newUser);
});

function getItems(user: User | null) {
  return [
    user
      ? [
          {
            label: user.email,
            slot: "account",
          },
        ]
      : [
          {
            label: "Sign in",
            icon: "i-heroicons-arrow-right-on-rectangle",
            click: () => navigateTo("/signin"),
          },
        ],

    [
      {
        label: "My account",
        icon: "i-heroicons-user-circle",
        click: () => navigateTo("/my-account"),
      },
      {
        label: "My Details",
        icon: "i-heroicons-book-open",
        click: () => navigateTo("/my-account/my-details"),
      },
      {
        label: "Help & Contact",
        icon: "i-heroicons-question-mark-circle",
        click: () => navigateTo("/help-and-contact"),
      },
      {
        label: "Manage my Ads",
        icon: "i-heroicons-megaphone",
        click: () => navigateTo("/my-account/my-ads"),
      },
      {
        label: "Favorites",
        icon: "i-heroicons-heart",
        click: () => navigateTo("/my-account/favorites"),
      },
    ],
    [
      ...(user
        ? [
            {
              label: "Logout",
              icon: "i-heroicons-arrow-left-on-rectangle",
              click: () => logout(),
            },
          ]
        : []),
    ],
  ];
}
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{
      padding: 'p-2',
      item: { disabled: 'cursor-text select-text', padding: 'py-2.5' },
      width: 'w-[250px] md:w-[300px]',
    }"
    :popper="{ placement: 'bottom-start' }"
    mode="hover"
  >
    <div class="flex flex-col items-center">
      <UIcon class="text-xl" name="i-mdi-menu" />
      <span>Menu</span>
    </div>
    <template #account="{ item }">
      <div class="flex items-center justify-between">
        <p class="truncate font-medium ml-2 text-gray-900">
          Hi, {{ user?.given_name }}
        </p>
        <UIcon name="i-mdi-close" class="absolute right-3 text-xl" />
      </div>
    </template>

    <template #item="{ item }">
      <UIcon :name="item.icon" class="h-4 w-4 mr-2" />
      <span class="truncate">{{ item.label }}</span>
    </template>
  </UDropdown>
</template>
