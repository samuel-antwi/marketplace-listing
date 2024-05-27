<script lang="ts" setup>
import { useUser } from "~/composables/Auth/auth";
const router = useRouter();
const user = useUser();
async function signup(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  await $fetch("/api/signup", {
    method: "POST",
    body: formData,
  });
  if (user.value) {
    router.push("/");
  }
  console.log(formData);
}
</script>

<template>
  <h1>Create an account</h1>
  <form method="post" action="/api/signup" @submit.prevent="signup">
    <label htmlFor="email">Username</label>
    <input name="email" id="email" />
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" />
    <br />
    <button>Continue</button>
  </form>
</template>
