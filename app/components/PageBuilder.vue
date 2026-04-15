<!-- /components/PageBuilder.vue -->
<script setup lang="ts">
import type { PagesBlock } from '#shared/types/schema';

interface Props {
  blocks?: PagesBlock[];
}

const props = defineProps<Props>();

// Блоки без верхнего отступа
const noMarginBlocks = ['block_hero'];

// Блоки, которым нужен overflow-visible
// const overflowVisibleBlocks = ['block_review'];

const getBlockClasses = (block: PagesBlock) => {
  if (!block.collection) return 'mt-[100px]';
  return noMarginBlocks.includes(block.collection) ? 'mt-0' : 'mt-[64px] lg:mt-[100px]';
};

// Фильтруем невалидные блоки - проверяем наличие обязательных полей
const validBlocks = computed(() => 
  (props.blocks || []).filter(
    (block): block is PagesBlock & { collection: string } => 
      !!block.collection && !!block.id
  )
);

</script>

<template>
    <section
      v-for="block in validBlocks"
      :key="block.id"
      :data-block-id="block.id"
      :class="getBlockClasses(block)"
    >
      <BaseContainer>
        <BaseBlock :block="block" />
      </BaseContainer>
    </section>
</template>