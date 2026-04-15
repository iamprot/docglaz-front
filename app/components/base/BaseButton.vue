<script setup lang="ts">
import type { BlockButton, Page } from '#shared/types/schema';

interface Props {
  data: BlockButton;
}

const props = defineProps<Props>();

const router = useRouter();

const variantClasses = computed(() => {
  const variants = {
    solid: 'bg-primary text-white hover:shadow-[0_5px_15px_rgba(188,199,255,0.75)] shadow-none',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  };
  return variants[props.data.variant || 'solid'] || variants.solid;
});

const sizeClasses = computed(() => {
  const sizes = {
    default: 'px-7 h-[48px] md:h-[54px] text-lg shrink-0 w-full md:w-fit',
    small: 'px-8 h-[48px] text-lg'
  };
  return sizes[props.data.size || 'default'] || sizes.default;
});

const gapClasses = computed(() => {
  return props.data.arrow ? 'gap-2' : '';
});

const arrowClasses = computed(() => {
  if (props.data.variant === 'solid') {
    return 'fill-white group-hover:fill-white group-hover:translate-x-1';
  }
  return 'fill-primary group-hover:fill-white group-hover:translate-x-1';
});

// Получаем целевой путь
const targetPath = computed(() => {
  if (!props.data) return null;

  // URL
  if (props.data.type === 'url' && props.data.url) {
    return props.data.url;
  }

  // Page
  if ((props.data.type === 'page' || !props.data.type) && props.data.page) {
    if (typeof props.data.page === 'object' && props.data.page !== null) {
      const page = props.data.page as Page;
      return `/${page.permalink || 'page'}`;
    }
  }
  
  return null;
});

// Обработчик клика
const handleClick = () => {
  if (!targetPath.value) return;
  
  console.log('Navigating to:', targetPath.value);
  
  // Внешняя ссылка
  if (targetPath.value.startsWith('http')) {
    window.open(targetPath.value, '_blank');
    return;
  }
  
  // Внутренняя навигация
  router.push(targetPath.value).catch(err => {
    console.error('Navigation error:', err);
  });
};
</script>

<template>
  <button
    @click="handleClick"
    class="group flex items-center justify-center font-normal rounded-xl hover:cursor-pointer transition-all duration-300 ease-in select-none"
    :class="[variantClasses, sizeClasses, gapClasses]"
  >
    <span class="whitespace-nowrap">{{ data.label }}</span>

    <svg v-if="data.arrow" class="w-6 h-6 transition-transform duration-300" viewBox="0 0 24 24">
      <path  
        class="transition-all duration-300"
        :class="arrowClasses"
        d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z"
      />
    </svg>
  </button>
</template>