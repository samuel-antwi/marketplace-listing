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
            icon: "i-mdi-sign-in",
            click: () => navigateTo("/signin"),
          },
        ],

    [
      {
        label: "My Details",
        icon: "i-mdi-account-outline",
        click: () => navigateTo("/my-account/my-details"),
      },
      {
        label: "Manage my Ads",
        icon: "i-mdi-megaphone-outline",
        click: () => navigateTo("/my-account/my-ads"),
      },
      {
        label: "Help & Contact",
        icon: "i-mdi-question-mark-circle-outline",
        click: () => navigateTo("/help-and-contact"),
      },

      {
        label: "Favorites",
        icon: "i-mdi-heart-outline",
        click: () => navigateTo("/my-account/favourites"),
      },
    ],
    [
      ...(user
        ? [
            {
              label: "Logout",
              icon: "i-mdi-logout",
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
    :popper="{ placement: 'bottom' }"
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
      <UIcon :name="item.icon" class="h-6 w-6 mr-2" />
      <span class="truncate">{{ item.label }}</span>
    </template>
  </UDropdown>
</template>
