<!-- components/pagebuilder/Container.vue -->
<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'xl'
});

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-xl',
  full: 'max-w-full'
};
</script>

<template>
  <div class="px-4 lg:px-16 mx-auto" :class="sizeClasses[size]">
    <slot />
  </div>
</template>