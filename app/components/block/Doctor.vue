<script setup lang="ts">
import type {
    BlockDoctor,
    BlockDoctorsDoctor,
    Doctor,
} from "#shared/types/schema";

import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

interface Props {
    data: BlockDoctor;
}

const props = defineProps<Props>();

// ПРоверяем, что связь загружена и содержит врача
const isValidDoctorRelation = (
    relation: BlockDoctorsDoctor | string,
): relation is BlockDoctorsDoctor & { doctors_id: Doctor } => {
    return (
        typeof relation !== "string" &&
        relation?.doctors_id !== null &&
        typeof relation.doctors_id === "object" &&
        (relation.doctors_id as Doctor)?.status === "published"
    );
};

// Собираем врачей
const doctors = computed(() => {
    const relations = props.data.doctors;

    // Если данных нет или это не массив — возвращаем пустой массив
    if (!relations || !Array.isArray(relations)) {
        return [];
    }

    return (
        relations
            // 1. Фильтруем: оставляем только валидные связи с опубликованными врачами
            .filter(
                (
                    relation,
                ): relation is BlockDoctorsDoctor & { doctors_id: Doctor } =>
                    isValidDoctorRelation(relation),
            )
            // 2. Сортируем по полю sort из таблицы связи (джанкшн)
            .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
            // 3. Извлекаем сами объекты врачей для удобства использования в шаблоне
            .map((relation) => relation.doctors_id)
    );
});

// Определяем режим отображения
const displayMode = computed(() => props.data.display_as || "block");

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
    loop: false,
    speed: 400,
    breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1260: { slidesPerView: 2, spaceBetween: 30 },
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
        class="relative w-full mx-auto"
    >
        <div
            class="hidden md:block absolute opacity-50 -z-10"
            :class="[
                displayMode === 'block'
                    ? '-top-16 right-2/4'
                    : '-top-32 right-1/4',
            ]"
        >
            <BaseIconsCloudDark class="shrink-0" />
        </div>

        <div
            v-if="data.headline && displayMode == 'block'"
            class="flex items-start justify-between"
        >
            <BaseHeadline :headline="data.headline" as="h2" class="mb-8" />
            <div class="flex flex-row justify-end gap-4">
                <!-- Go back one slide -->
                <UiButtonLeft @click="goPrev" :class="classNavButtons" />
                <!-- Go forward one slide -->
                <UiButtonRight @click="goNext" :class="classNavButtons" />
            </div>
        </div>

        <!-- Если сетка -->
        <div
            v-if="displayMode !== 'block'"
            class="grid grid-cols-1 md:grid-cols-2 gap-[30px]"
        >
            <div
                v-for="(doctor, index) in doctors"
                :key="index"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                }"
                :delay="index * 200"
                :duration="300"
            >
                <BaseDoctorCard :data="doctor" />
            </div>
        </div>

        <!-- если блок -->
        <div v-else class="flex flex-1">
            <swiper
                v-bind="swiperOptions"
                @swiper="onSwiper"
                ref="swiperRef"
                class="rounded-smooth"
            >
                <swiper-slide v-for="doctor in doctors" :key="doctor.id">
                    <BaseDoctorCard :data="doctor" noShadow />
                </swiper-slide>
            </swiper>
        </div>

        <div
            v-if="data.button && typeof data.button === 'object'"
            class="flex justify-center mt-8 md:mt-12"
        >
            <!-- рендерим кнопочку -->
            <BaseButton :data="data.button" />
        </div>
    </div>
</template>

<style scoped></style>
