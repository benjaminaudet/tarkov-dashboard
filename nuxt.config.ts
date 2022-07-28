import { defineNuxtConfig } from 'nuxt'

const lifecycle = process.env.npm_lifecycle_event

export default defineNuxtConfig({
  build: {
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app']
    },
    transpile: lifecycle === 'build' || lifecycle === 'generate' ? ['@apollo/client', '@vue/apollo-composable'] : [],
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
})
