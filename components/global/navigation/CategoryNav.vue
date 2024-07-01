<script setup lang="ts">
import { ref, computed } from "vue";
import type { Category } from "@/types/category";

const { data: categories, refresh: refreshCategories } = await useAsyncData(
  `navigation`,
  () => $fetch<Category[]>(`/api/navigation`)
);

const currentCategory = ref<Category | null>(null);
const isCategoryHovered = ref(false);

const updateCurrentCategory = (category: Category) => {
  currentCategory.value = category;
  isCategoryHovered.value = true;
};

const hideOverlay = () => {
  isCategoryHovered.value = false;
};

// Compute sorted subCategories
const sortedSubCategories = computed(() => {
  if (!currentCategory.value) return [];
  return [...currentCategory.value.subCategories].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
});
</script>

<template>
  <div @mouseleave="hideOverlay">
    <div v-if="isCategoryHovered" class="overlay"></div>
    <UPopover
      :popper="{ offsetDistance: 0 }"
      :ui="{ rounded: 'rounded-none' }"
      mode="hover"
      @close="hideOverlay"
    >
      <template #default="{ open }">
        <div
          class="flex justify-center items-center overflow-x-auto md:overflow-x-visible"
        >
          <!-- <button
            class="hover:text-gray-900 px-4 text-sm py-4 hover:bg-gray-100"
            v-for="category in categories"
            :key="category.id"
            @mouseover="updateCurrentCategory(category)"
          >
            {{ category.uiLabel }}
          </button> -->
          <UButton
            v-for="category in categories"
            :key="category.id"
            :ui="{
              color: 'text-gray-300 hover:text-gray-500',
            }"
            variant="ghost"
            color="white"
            :label="category.uiLabel"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            @mouseover="updateCurrentCategory(category)"
          />
        </div>
      </template>
      <template #panel="{ close }">
        <div @mouseleave="hideOverlay" class="lg:w-[1080px] text-gray-900 p-6">
          <div v-if="currentCategory">
            <h3 class="text-lg font-semibold mb-4">
              <span class="text-gray-600">{{ currentCategory.uiLabel }}</span>
            </h3>
            <div class="grid md:grid-cols-3 grid-cols-2 gap-4">
              <div
                v-for="subCategory in sortedSubCategories"
                :key="subCategory.id"
              >
                <NuxtLink
                  @click="
                    () => {
                      close();
                      isCategoryHovered = false;
                    }
                  "
                  :to="`/${currentCategory.slug}/${subCategory.url}`"
                  class="text-gray-600 hover:underline"
                >
                  {{ subCategory.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 124px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
