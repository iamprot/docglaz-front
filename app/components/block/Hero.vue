<script setup lang="ts">
import type { BlockHero, BlockButton } from "#shared/types/schema";

interface Props {
    data: BlockHero;
}

const props = defineProps<Props>();

const { getTransformedImage, getImageUrl } = useDirectusImage();

const buttons = computed(() => {
    if (!props.data.button_group) return [];

    if (typeof props.data.button_group === "string") {
        console.warn("Button group not loaded!");
        return [];
    }
    const groupButtons = props.data.button_group.buttons;
    if (!groupButtons || !Array.isArray(groupButtons)) return [];

    return (groupButtons as BlockButton[])
        .filter(
            (btn): btn is BlockButton =>
                typeof btn === "object" &&
                typeof btn.label === "string" && // Явная проверка типа
                btn.label.trim().length > 0,
        )
        .sort((a, b) => (a.sort || 0) - (b.sort || 0));
});
</script>

<template>
    <section
        class="relative bg-linear-to-br from-[#FFEAFB] to-[#A7ECFF] rounded-b-smooth overflow-hidden"
    >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[75px]">
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-auto lg:min-h-[600px]"
            >
                <!-- Левая колонка: контент -->
                <div
                    class="z-10 order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start py-8 lg:py-0"
                >
                    <!-- Tagline -->
                    <span
                        v-motion-slide-visible-once-top
                        :delay="100"
                        :duration="400"
                        class="text-sm sm:text-base text-secondary mb-3 lg:mb-8 tracking-[0.2rem] uppercase"
                    >
                        {{ data.tagline }}
                    </span>

                    <!-- Заголовок -->
                    <h1
                        v-motion-slide-visible-once-left
                        :delay="200"
                        :duration="400"
                        class="text-balance text-center md:text-left text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-dark mb-4 lg:mb-8"
                    >
                        {{ data.headline }}
                    </h1>
                    <!-- Описание -->
                    <p
                        v-motion-fade-visible-once
                        :delay="300"
                        :duration="400"
                        class="text-balance text-base lg:text-lg text-center lg:text-left text-secondary mb-6 lg:mb-12 max-w-xl leading-8 font-light"
                    >
                        {{ data.description }}
                    </p>

                    <!-- Кнопки -->
                    <div
                        v-motion-fade-visible-once
                        :delay="400"
                        :duration="400"
                        class="flex flex-col md:flex-row gap-3 sm:gap-4 w-full md:w-fit"
                    >
                        <div
                            v-for="(button, index) in buttons"
                            :key="index"
                            class="flex flex-col md:flex-row gap-3 sm:gap-4 w-full"
                        >
                            <BaseButton
                                :data="button"
                                class="w-full sm:w-auto justify-center"
                            />
                        </div>
                    </div>
                </div>

                <!-- Правая колонка: изображение -->
                <div class="order-1 lg:order-2 relative flex justify-center items-center h-full select-none">
                    <div
                        v-motion-fade-visible-once
                        :delay="500"
                        :duration="500"
                        class="relative z-10 h-full w-full aspect-square"
                    >
                        <UiHeroFloat /> 
                        <NuxtImg v-if="data.image"
                            :src="
                                getTransformedImage(data.image, {
                                    width: 610,
                                    height: 610,
                                    fit: 'cover',
                                    format: 'webp',
                                    withoutEnlargement: true,
                                    quality: 100,
                                })
                            "
                            height="610"
                            width="610"
                            fit="cover"
                            class="absolute object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>
            </div>

            <div
                v-motion-slide-visible-once-top
                :duration="400"
                class="absolute -top-80 -left-80 h-[743px] opacity-50"
            >
                <BaseIconsCircleSmall class="w-full h-full text-white" />
            </div>
            <div
                v-motion-slide-visible-once-right
                :duration="500"
                class="absolute -bottom-80 -right-80 h-[743px] opacity-50"
            >
                <BaseIconsCircleLarge class="w-full h-full text-white" />
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>