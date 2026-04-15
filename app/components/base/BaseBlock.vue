<!-- /components/base/BaseBlock.vue -->
<script setup lang="ts">
import type { PagesBlock } from '#shared/types/schema';

interface Props {
  block: PagesBlock;
}

const props = defineProps<Props>();

// Динамический импорт компонентов блоков
const blockComponents: Record<string, any> = {
  block_about: resolveComponent('BlockAbout'),
  block_doctors: resolveComponent('BlockDoctor'),
  block_faq: resolveComponent('BlockFaq'),
  block_form: resolveComponent('BlockForm'),
  block_hero: resolveComponent('BlockHero'),
  block_map: resolveComponent('BlockMap'),
  block_news: resolveComponent('BlockNews'),
  block_photo_slider: resolveComponent('BlockPhotoSlider'),
  block_promotions: resolveComponent('BlockPromotion'),
  block_ratings: resolveComponent('BlockRating'),
  block_reviews: resolveComponent('BlockReview'),
  block_services: resolveComponent('BlockServices'),
  block_richtext: resolveComponent('BlockRichtext'),
  // block_features: resolveComponent('BlockFeatures'),
};

// Используем collection для поиска компонента
const currentComponent = computed(() => {
  if (!props.block.collection) return null;
  return blockComponents[props.block.collection] || null;
});
</script>

<template>
  <component 
    v-if="currentComponent && block.item" 
    :is="currentComponent" 
    :data="block.item"
  />
  <div v-else class="p-4 bg-red-50 border border-red-200 rounded">
    <p class="text-red-600">
      Неизвестный тип блока: <strong>{{ block.collection || 'undefined' }}</strong>
    </p>
    <pre class="text-xs mt-2">{{ JSON.stringify(block, null, 2) }}</pre>
  </div>
</template>