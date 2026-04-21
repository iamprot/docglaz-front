<script setup lang="ts">
import type { Promotion } from "#shared/types/schema";

const appConfig = useAppConfig();

interface Props {
    data: Promotion;
}

const props = defineProps<Props>();

const { getTransformedImage, getFullSizeImage } = useDirectusImage();
</script>

<template>
    <NuxtLink :to="appConfig.routes.PROMOTION(data.slug)">
        <div
            id="card"
            class="relative group bg-black/70 hover:bg-black/50 rounded-smooth p-6 h-full flex flex-col min-h-64 transition-all overflow-hidden duration-300 hover-shadow-soft-blue"
        >
            <div
                class="absolute h-full w-full top-0 left-0 opacity-50 mix-blend-lighten group-hover:scale-105 transition-transform duration-400 ease-in-out"
            >
                <!-- <NuxtImg src="/images/percents.png" width="320" height="310" format="webp" densities="x1 x2" /> -->
                <NuxtImg
                    :src="getTransformedImage(data.image,{
                                    fit: 'cover',
                                    quality: 90,
                                    format: 'webp',
                                })"
                    class="object-cover h-full w-full"
                />
            </div>

            <div
                id="content"
                class="borderz-20 flex flex-col flex-1 items-start justify-between gap-4 after:content"
            >
                <div
                    class="z-10 bg-vio text-white text-sm px-4 py-2 rounded-smooth uppercase tracking-widest group-hover:bg-vio group-hover:text-white transition-colors duration-300 ease-in-out"
                >
                    C&nbsp;
                    <NuxtTime
                        :datetime="data.date as string"
                        day="numeric"
                        month="long"
                        locale="ru-RU"
                    />
                </div>
                <!-- FIX ARROW -->
                <div
                    class="z-50 flex flex-row items-end justify-between w-full gap-4"
                >
                    <div class="flex flex-col gap-4">
                        <div
                            class="text-balance text-white text-2xl md:text-3xl font-bold leading-8 md:leading-10"
                        >
                            {{ data.title }}
                        </div>
                        <div class="text-base md:text-lg text-white">
                            {{ data.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="arrow"
                class="absolute bottom-6 right-6 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
            >
                <BaseIconsLinkArrow
                    color="#ffffff"
                    class="h-8! w-8! shrink-0"
                />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped></style>
