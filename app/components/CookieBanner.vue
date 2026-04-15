<!-- /components/ui/CookieBanner.vue -->
<script setup lang="ts">
const isVisible = ref(false);
const STORAGE_KEY = 'cookie-consent-accepted';

// Проверяем localStorage ТОЛЬКО на клиенте (после гидратации)
onMounted(() => {
  const accepted = localStorage.getItem(STORAGE_KEY);
  if (!accepted) {
    isVisible.value = true;
  }
});

const acceptCookies = () => {
  localStorage.setItem(STORAGE_KEY, 'true');
  isVisible.value = false;
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6"
      role="alert"
    >
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Текст -->
        <p class="text-base text-black/60 text-center md:text-left">
          Наш сайт использует cookie. Они помогают нам понять, как вы взаимодействуете с сайтом.
        </p>

        <!-- Кнопка -->
        <button
          @click="acceptCookies"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-medium whitespace-nowrap"
        >
          OK
        </button>

      </div>
    </div>
  </Transition>
</template>