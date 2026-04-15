<script setup lang="ts">

import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <!-- flex-1 займёт всё доступное пространство между navbar и footer -->
    <div id="errorContent" class="flex flex-col gap-8 h-[calc(100vh-200px)] items-center justify-center">
      <h2 class="font-bold text-8xl text-primary">{{ error?.statusCode }}</h2>
      <p class="text-2xl text-secondary">{{ error?.message }}</p>
      <button @click="handleError" class="cursor-pointer hover:underline transition-all">
        На главную страницу
      </button>
    </div>
  </NuxtLayout>
</template>