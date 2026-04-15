<script setup lang="ts">
import type { Rating } from '#shared/types/schema';

interface Props {
    data: Rating;
}

const props = defineProps<Props>();

const { getImageUrl } = useDirectusImage();

// Проверка внешней ссылки
const isExternalUrl = computed(() => {
  if (!props.data.source) return false;
  return props.data.source.startsWith('http://') || 
         props.data.source.startsWith('https://') ||
         props.data.source.startsWith('www.');
});

// Обработчик клика
const handleClick = () => {
  if (!props.data.source) return;
  
  // Внешняя ссылка
  if (isExternalUrl.value) {
    window.open(props.data.source, '_blank', 'noopener,noreferrer');
    return;
  }
};
</script>

<template>
    <div
    v-if="data.source" 
    class="relative flex flex-col bg-white rounded-smooth px-8 py-6 gap-5 transition-shadow duration-300 hover-shadow-soft-blue hover:cursor-pointer"
    @click="handleClick"
    >
        <div class="text-primary text-[44px] font-semibold leading-12">{{ data.value }}</div>
        
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
            <div id="image" class="pr-2" v-if="data.image">
                <img :src="getImageUrl(data.image)" :alt="data.title || 'Rating'" class="min-w-6 min-h-6 shrink-0" />
            </div>
            <div id="text" class="text-lg xl:text-2xl font-bold text-black">{{ data.title }}</div>
        </div>
        <div class="flex justify-between">
            <div class="text-base md:text-lg text-black">{{ data.reviews }}</div>
        </div>
        <BaseIconsLinkArrow class="absolute bottom-6 right-6"/>
    </div>
</template>
