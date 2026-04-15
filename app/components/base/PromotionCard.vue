<script setup lang="ts">
import type { Promotion } from '#shared/types/schema';

const appConfig = useAppConfig()

interface Props {
    data: Promotion;
}

const props = defineProps<Props>();

const { getTransformedImage, getFullSizeImage } = useDirectusImage()

</script>

<template>
    <NuxtLink :to="appConfig.routes.PROMOTION(data.slug)">
        <div id="card"
            class="relative group bg-white rounded-smooth h-full flex flex-col transition-shadow duration-300 hover-shadow-soft-blue">


            <div class="relative flex flex-col gap-2 items-center rounded-smooth overflow-hidden h-full max-h-[264px] lg:max-h-[364px] aspect-video">
                <img :src="getTransformedImage(data.image, {
                    fit: 'cover',
                    quality: 85,
                    format: 'webp'
                })"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                <div
                    class="absolute bottom-0 left-0 m-5 bg-white text-vio text-sm px-4 py-2 rounded-smooth uppercase tracking-widest group-hover:bg-vio group-hover:text-white  transition-colors duration-300 ease-in-out">
                    C&nbsp;
                    <NuxtTime :datetime="data.date as string" day="numeric" month="long" locale="ru-RU" />
                </div>
            </div>

            <div id="content" class="flex flex-1 p-8 items-start justify-between gap-4">
                <!-- FIX ARROW -->
                <div class="flex flex-row items-end justify-between w-full gap-4">
                    <div class="flex flex-col gap-4">
                        <div class="text-primary text-2xl md:text-3xl font-bold leading-8 md:leading-10">
                            {{ data.title }}
                        </div>
                        <div class="text-base md:text-lg text-secondary">
                            {{ data.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="arrow" class="absolute bottom-6 right-6 group-hover:rotate-45 transition-transform duration-300 ease-in-out">
                <BaseIconsLinkArrow class="h-8! w-8! shrink-0" />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped></style>