// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL
        }
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ]
})
