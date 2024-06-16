<script setup lang="ts">
import Sidenav from "~/components/Account/Sidenav.vue";
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

console.log(route);

const isMyAccountPage = computed(() => {
  return route.name === "my-account";
});
</script>

<template>
  <div class="md:mt-20 mt-12">
    <UContainer>
      <div class="grid-cols-12 gap-5 md:grid">
        <div class="col-span-3 mb-4 lg:mb-0">
          <Sidenav v-if="isMyAccountPage" class="md:hidden" />
          <Sidenav class="hidden md:block" />
        </div>
        <div class="col-span-9 bg-white shadow">
          <div v-if="isMyAccountPage" class="hidden md:block overview">
            <div>
              <div class="pt-12 pl-12">
                <h1 class="overview-content">Welcome to</h1>
                <h1 class="overview-content">your account overview</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.overview {
  background-image: url("/images/account-overview.svg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}

.overview-content {
  @apply px-3 py-2 text-2xl tracking-wider mb-2 font-semibold uppercase bg-[#2D2D2D] w-fit text-gray-50;
}
</style>
