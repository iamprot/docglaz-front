<script setup lang="ts">
interface AccordionProps {
  title?: string | null;
  content?: string | null;
  open: boolean;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  title: '',
  content: '',
  open: false,
});

// 🔹 Простой булевый флаг для одного аккордеона
const isOpen = ref(props.open);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

</script>


<template>
    <div class="space-y-3">
      <div class="rounded-smooth overflow-hidden bg-white">

        <button @click="toggle"
          class="w-full py-8 px-8 text-left flex items-center justify-between hover:cursor-pointer transition-colors"
          :class="{ 'rounded-b-none': isOpen }">

          <h2 class="text-2xl md:text-4xl text-secondary-dark font-bold transition-colors duration-300">
            {{ title }}
          </h2>

          <svg class="w-8 h-8 text-gray-500 transition-transform duration-300 shrink-0"
            :class="{ 'rotate-45': isOpen }" width="32" height="32" viewBox="0 0 32 32"
            fill="none">
            <path d="M27.313 16H4.68555M15.9993 4.68628V27.3137" stroke="#4C85FF" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <Transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
          @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
          <div v-show="isOpen" class="overflow-hidden">
            <div class="pb-8 px-8">
              <div class="max-w-none v-html-content" v-html="content"></div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
</template>

<script lang="ts">
// Анимация для плавного изменения высоты
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

<style scoped>
/* Анимация появления списка */
.faq-list-move {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.faq-list-enter-active,
.faq-list-leave-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.faq-list-enter-from,
.faq-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

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

/* Анимация вращения стрелки */
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(0deg);
}

.rotate-enter-to,
.rotate-leave-from {
  transform: rotate(180deg);
}
</style>