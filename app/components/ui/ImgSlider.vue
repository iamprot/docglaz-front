<!-- /components/ui/ImgSlider.vue -->
<script setup lang="ts">
import type { BlockPhotoSliderFile } from "#shared/types/schema";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

interface Props {
    photos: BlockPhotoSliderFile[];
}

const props = defineProps<Props>();

const { getTransformedImage } = useDirectusImage();

// Извлекаем только UUID файлов
const photoIds = computed(() => {
    return props.photos
        .map((photo) => {
            const fileId = photo.directus_files_id;
            return typeof fileId === "string" ? fileId : (fileId as any)?.id;
        })
        .filter((id): id is string => typeof id === "string");
});

// Настроим свааайпер
const swiperRef = ref<SwiperType | null>(null);

// Хранилище для экземпляра Swiper
const onSwiper = (swiper: SwiperType) => {
    swiperRef.value = swiper;
};

// Простые функции для кнопок
const goNext = () => swiperRef.value?.slideNext();
const goPrev = () => swiperRef.value?.slidePrev();

const swiperOptions = computed(() => ({
    modules: [Navigation, Pagination], // Передаем массив модулей, а не строк
    spaceBetween: 0,
    loop: true,
    speed: 600,
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 0 },
        760: { slidesPerView: 1, spaceBetween: 0 },
        1024: { slidesPerView: 1.4, spaceBetween: 30 },
    },
    centeredSlides: true,
    initialSlide: 1,
    navigation: {
        nextEl: ".go-next",
        prevEl: ".go-prev",
    },
    pagination: {
        clickable: false,
        dynamicBullets: true,
    },
}));
</script>

<template>
    <div v-if="photoIds.length > 0" class="relative">
        <swiper
            v-bind="swiperOptions"
            @swiper="onSwiper"
            ref="swiperRef"
            class="rounded-smooth overflow-hidden"
        >
            <swiper-slide v-for="(photoId, index) in photoIds" :key="photoId">
                <div class="relative h-full aspect-auto">
                    <NuxtImg
                        :src="
                            getTransformedImage(photoId, {
                                fit: 'cover',
                                width: 1200,
                                height: 800,
                                quality: 80,
                            })
                        "
                        loading="lazy"
                        :alt="`Slide ${index + 1}`"
                        class="w-full h-full object-cover rounded-smooth"
                    />
                </div>
            </swiper-slide>
            <template #container-end>
                <button
                    class="go-prev opacity-40 hover:opacity-100 hover:cursor-pointer transition-all duration-300"
                    @click.prevent="goPrev"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M25 8L13 20L25 32"
                            stroke="#4C85FF"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>

                <button
                    class="go-next opacity-40 hover:opacity-100 hover:cursor-pointer transition-all duration-300"
                    @click.prevent="goNext"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 8L28 20L16 32"
                            stroke="#4C85FF"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </template>
        </swiper>
    </div>

    <div v-else class="text-center py-12 text-gray-500">Фотографий, увы нет</div>
</template>

<style>
.go-prev {
    position: absolute;
    top: calc(50% - 20px);
    left: 12px;
    z-index: 2;
    display: block;
    width: 40px;
    height: 40px;
}

.go-next {
    position: absolute;
    top: calc(50% - 20px);
    right: 12px;
    z-index: 2;
    display: block;
    width: 40px;
    height: 40px;
}

:root {
    --swiper-pagination-color: var(--color-accent);
    --swiper-pagination-bullet-size: 12px;
    --swiper-pagination-bullet-width: 12px;
    --swiper-pagination-bullet-height: 12px;
    --swiper-pagination-bullet-active: #f00;
    --swiper-pagination-bullet-inactive-color: var(--color-primary);
    --swiper-pagination-bullet-inactive-opacity: 0.5;
    --swiper-pagination-bullet-opacity: 1;
    --swiper-pagination-bullet-horizontal-gap: 8px;
    --swiper-pagination-bullet-vertical-gap: 2px;
    --swiper-pagination-bottom: 4px;
}
</style>
