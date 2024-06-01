// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@formkit/nuxt"],
  devtools: { enabled: true },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI_DEV: process.env.GOOGLE_REDIRECT_URI_DEV,
      GOOGLE_REDIRECT_URI_PROD: process.env.GOOGLE_REDIRECT_URI_PROD,
    },
  },
  colorMode: {
    preference: "light",
  },
  css: ["@/assets/css/main.css"],
  ui: {
    icons: ["mdi"],
  },
});
