<!-- components/BaseBreadcrumbs.vue -->
<script setup lang="ts">
interface BreadcrumbsProps {
  parentLabel?: string | null;    // Название родительского раздела
  parentLink?: string | null;     // Ссылка на родительский раздел
  currentLabel?: string | null;   // Название текущей страницы без ссыли
  as?: 'div' | 'nav';             // обертка
}

withDefaults(defineProps<BreadcrumbsProps>(), {
  as: 'div',
  parentLabel: null,
  parentLink: null,
  currentLabel: null,
});
</script>

<template>
  <component 
    :is="as" 
    v-if="parentLabel || currentLabel"
    :class="`py-6 text-secondary min-h-16 md:min-h-24 flex font-light items-center md:text-lg`"
  >
    <span class="flex items-center flex-wrap">
      <!-- Главная - всегда ссылка -->
      <NuxtLink to="/" class="hover:text-primary transition-colors">Главная</NuxtLink>
      
      <!-- Родительский раздел (например, "Услуги") -->
      <template v-if="parentLabel">
        <span class="mx-2">/</span>
        <NuxtLink 
          v-if="parentLink" 
          :to="parentLink" 
          class="hover:text-primary transition-colors"
        >
          {{ parentLabel }}
        </NuxtLink>
        <span v-else>{{ parentLabel }}</span>
      </template>
      
      <!-- Текущая страница -->
      <template v-if="currentLabel">
        <span class="mx-2">/</span>
        <span>{{ currentLabel }}</span>
      </template>
    </span>
  </component>
</template>