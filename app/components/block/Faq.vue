<!-- components/blocks/BlockFaq.vue -->
<script setup lang="ts">
import type { BlockFaq, BlockFaqFaq, Faq } from '#shared/types/schema';

interface Props {
  data: BlockFaq;
}

const props = defineProps<Props>();

// Вспомогательная функция: проверка валидности связи M2M
const isValidFaqRelation = (
  relation: BlockFaqFaq | string
): relation is BlockFaqFaq & { faq_id: Faq } => {
  return (
    typeof relation !== 'string' &&
    relation?.faq_id !== null &&
    typeof relation.faq_id === 'object' &&
    (relation.faq_id as Faq)?.status === 'published'
  );
};

// Получаем и обрабатываем вопросы из M2M связи
const faqs = computed(() => {
  const relations = props.data.items;
  
  if (!relations || !Array.isArray(relations)) {
    return [];
  }

  return relations
    // 1. Фильтруем: только валидные связи с опубликованными FAQ
    .filter((relation): relation is BlockFaqFaq & { faq_id: Faq } => 
      isValidFaqRelation(relation)
    )
    // 2. Сортируем по полю sort из junction-таблицы (items)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    // 3. Извлекаем сами объекты FAQ для удобства
    .map(relation => relation.faq_id);
});

// Режим отображения
const displayMode = computed(() => props.data.display_as || 'block');

// Логика аккордеона: только один открытый вопрос
const openQuestionId = ref<string | null>(null);

const toggleQuestion = (id: string) => {
  openQuestionId.value = openQuestionId.value === id ? null : id;
};

const isOpen = (id: string) => openQuestionId.value === id;

// 🔹 Хуки анимации (должны быть в script setup для доступа в template)
const beforeEnter = (el: Element) => {
  (el as HTMLElement).style.height = '0px';
  (el as HTMLElement).style.opacity = '0';
};

const enter = (el: Element) => {
  const height = (el as HTMLElement).scrollHeight + 'px';
  (el as HTMLElement).style.height = height;
  (el as HTMLElement).style.opacity = '1';
};

const afterEnter = (el: Element) => {
  (el as HTMLElement).style.height = 'auto';
};

const beforeLeave = (el: Element) => {
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
  (el as HTMLElement).style.opacity = '1';
};

const leave = (el: Element) => {
  (el as HTMLElement).style.height = '0px';
  (el as HTMLElement).style.opacity = '0';
};

const afterLeave = (el: Element) => {
  (el as HTMLElement).style.height = '';
  (el as HTMLElement).style.opacity = '';
};
</script>

<template>
  <div class="relative w-full mx-auto">
    <!-- Декоративный элемент -->
    <div class="hidden md:absolute -top-16 right-1/4 opacity-50" :class="[
      displayMode === 'block' ? '-top-16' : '-top-32'
    ]">
      <BaseIconsCloudDark class="shrink-0" />
    </div>

    <!-- Заголовок блока -->
    <BaseHeadline 
      v-if="data.headline && displayMode == 'block'" 
      :headline="data.headline" 
      as="h2" 
      class="mb-8" 
    />

    <!-- Список вопросов -->
    <div class="space-y-3">
      <div v-for="(faq, idx) in faqs" :key="faq.id" class="rounded-smooth overflow-hidden bg-white"
                      v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                }"
                :delay="idx * 200"
                :duration="300"
      >

        <!-- Кнопка вопроса -->
        <button 
          @click="toggleQuestion(faq.id)"
          class="w-full p-6 md:p-8 text-left flex items-center justify-between hover:cursor-pointer transition-colors"
          :class="{ 'rounded-b-none': isOpen(faq.id) }"
        >
          <h4 
            class="text-lg md:text-2xl font-bold transition-colors duration-300"
            :class="{ 'text-primary': isOpen(faq.id) }"
          >
            {{ faq.question }}
          </h4>

          <!-- Иконка плюс -->
          <svg 
            class="w-8 h-8 text-gray-500 transition-transform duration-300 shrink-0"
            :class="{ 'rotate-45': isOpen(faq.id) }" 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none"
          >
            <path 
              d="M27.313 16H4.68555M15.9993 4.68628V27.3137" 
              stroke="#4C85FF" 
              stroke-width="2"
              stroke-linecap="round" 
              stroke-linejoin="round" 
            />
          </svg>
        </button>

        <!-- Анимированный контент ответа -->
        <Transition 
          name="slide-fade" 
          @before-enter="beforeEnter" 
          @enter="enter" 
          @after-enter="afterEnter"
          @before-leave="beforeLeave" 
          @leave="leave" 
          @after-leave="afterLeave"
        >
          <div v-show="isOpen(faq.id)" class="overflow-hidden">
            <div class="pb-6 md:pb-8 px-6 md:px-8">
              <!-- 🔹 v-html для ответа из WYSIWYG -->
              <div class="max-w-none v-html-content" v-html="faq.answer"></div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Кнопка блока (если есть) -->
    <div v-if="data.button && typeof data.button === 'object'" class="flex justify-center mt-8 md:mt-12">
      <BaseButton :data="data.button" />
    </div>
  </div>
</template>

<style scoped>
/* Анимация слайда и фейда */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>