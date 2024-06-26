<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "../../composables/Auth/auth";
import { useRouter } from "vue-router";
import HeaderView from "~/components/Account/HeaderView.vue";
import SubmitButton from "~/components/global/SubmitButton.vue";

definePageMeta({
  layout: "account",
  middleware: "auth",
});

const user = useUser();
const ads = ref([]); // Assuming ads are fetched and stored in this ref
const router = useRouter();

function goToHomePage() {
  router.push("/");
}
</script>

<template>
  <div>
    <header-view
      title="My Ads"
      description="Manage your ads and edit your ad details."
      icon="i-mdi-folder-outline"
    />
    <div v-if="ads.length === 0">
      <p class="mb-5">You currently don't have any ads</p>
      <submit-button @click="goToHomePage" label="Create an Ad" />
    </div>
  </div>
</template>
