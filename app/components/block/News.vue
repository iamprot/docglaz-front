<script setup lang="ts">
import type { BlockNew } from "#shared/types/schema";

interface Props {
    data: BlockNew;
}
const props = defineProps<Props>();

// Все новости с сервера
const allNews = computed(() => (props.data as any)._news || []);

// Безопасные лимиты с fallback
const initialLimit = computed(() => {
    const limit = props.data.items_limit;
    return typeof limit === "number" && limit > 0 ? limit : 4;
});

const loadMoreStep = computed(() => {
    const step = props.data.load_more_step;
    return typeof step === "number" && step > 0 ? step : 3;
});

// === FEATURED NEWS ===
// Первая новость (всегда показывается отдельно)
const featuredNews = computed(() => {
    return allNews.value.length > 0 ? allNews.value[0] : null;
});

// === GRID NEWS ===
// Все новости КРОМЕ первой (для сетки)
const gridNewsPool = computed(() => allNews.value.slice(1));

// Счётчик видимых новостей в сетке (начинаем с initialLimit - 1, т.к. 1 уже в featured)
// Но логичнее: initialLimit — это общее количество, значит в сетке показываем initialLimit - 1
const initialGridCount = computed(() => Math.max(0, initialLimit.value - 1));

const visibleGridCount = ref(initialGridCount.value);

// Сброс при изменении данных
watch(
    () => props.data,
    () => {
        visibleGridCount.value = initialGridCount.value;
    },
    { deep: true },
);

// Видимые новости для сетки
const visibleGridNews = computed(() =>
    gridNewsPool.value.slice(0, visibleGridCount.value),
);

// Показывать ли кнопку "Показать ещё"
const showLoadMore = computed(() => {
    return visibleGridCount.value < gridNewsPool.value.length;
});

// Подгрузка: +3 новости в сетку
const loadMore = () => {
    const step = Number(props.data.load_more_step) || 3;
    visibleGridCount.value += loadMoreStep.value;
};
</script>

<template>
    <div class="relative w-full mx-auto">
        <div v-motion-fade-visible-once :duration="600">
            <BaseNewsFeaturedCard
                v-if="featuredNews"
                :data="featuredNews"
                class="mb-8"
            />
        </div>

        <!-- Сетка новостей -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <div
                v-motion
                v-for="(news, idx) in visibleGridNews"
                :key="idx"
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                }"
                :delay="((idx as number) % loadMoreStep) * 200"
                :duration="300"
            >
                <BaseNewsCard :data="news" />
            </div>
        </div>

        <!-- Кнопка "Показать ещё" (для grid) -->
        <div
            v-if="showLoadMore"
            class="flex items-center justify-center text-center mt-10"
        >
            <BaseButton
                :data="{
                    id: 'loadMore',
                    label: 'Показать еще',
                    variant: 'outline',
                }"
                @click="loadMore"
            />
        </div>
    </div>
</template>

<style scoped></style>
