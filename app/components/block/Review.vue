<script setup lang="ts">
import type { Review } from "#shared/types/schema";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation } from "swiper/modules";


interface Props {
    data: BlockReview;
}

const props = defineProps<Props>();

// Фильтруем отзывы всяеския
const reviews = computed(() => {
    if (!props.data.reviewsgroup || !Array.isArray(props.data.reviewsgroup)) {
        return [];
    }

    return (props.data.reviewsgroup as Review[])
        .filter((review): review is Review => {
            return !!(
                review.status === "published" &&
                review.name &&
                review.date &&
                review.content
            );
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0));
});

const swiperRef = ref<SwiperType | null>(null);

// Хранилище для экземпляра Swiper
const onSwiper = (swiper: SwiperType) => {
    swiperRef.value = swiper;
};

// Простые функции для кнопок
const goNext = () => swiperRef.value?.slideNext();
const goPrev = () => swiperRef.value?.slidePrev();

const swiperOptions = computed(() => ({
    modules: [Navigation], // Передаем массив модулей, а не строк
    spaceBetween: 0,
    loop: true,
    speed: 400,
    breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1260: { slidesPerView: 3, spaceBetween: 30 },
    },
}));

const classNavButtons = computed(() => {
    return "opacity-50 hover:opacity-100 transition-all duration-300 hover:cursor-pointer hover:scale-105";
});
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
            opacity: 1,
            y: 0,
        }"
        :delay="300"
        :duration="500"
        class="relative mx-auto w-full"
    >
        <div class="absolute -top-12 left-1/4">
            <BaseIconsCloudDark class="shrink-0 opacity-50" />
        </div>

        <div class="flex items-start justify-between">
            <BaseHeadline :headline="data.headline" as="h2" class="mb-8" />

            <div class="flex flex-row justify-end gap-4">
                <!-- Кнопка НАЗАД с обработчиком клика -->
                <UiButtonLeft :class="classNavButtons" @click="goPrev" />
                <!-- Кнопка ВПЕРЁД с обработчиком клика -->
                <UiButtonRight :class="classNavButtons" @click="goNext" />
            </div>
        </div>

        <!-- Привязываем событие @swiper для получения инстанса -->
        <swiper
            class="overflow-hidden rounded-smooth"
            v-bind="swiperOptions"
            @swiper="onSwiper"
            ref="swiperRef"
        >
            <swiper-slide v-for="item in reviews" :key="item.id">
                <BaseReviewCard :data="item" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style></style>
