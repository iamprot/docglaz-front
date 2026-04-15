<script setup lang="ts">
import type { Promotion } from "#shared/types/schema";

const appConfig = useAppConfig();

interface Props {
    data: Promotion;
}

const props = defineProps<Props>();

const { getTransformedImage, getFullSizeImage } = useDirectusImage()

</script>

<template>
    <NuxtLink :to="appConfig.routes.PROMOTION(data.slug)">
        <div id="card"
            class="relative group bg-black/90 hover:bg-black/70 rounded-smooth h-full flex flex-col transition-all overflow-hidden duration-300 hover-shadow-soft-blue">

            <div class="relative flex flex-col gap-2 items-start p-8 rounded-smooth">
                <div
                    class="z-10 bg-vio text-white text-sm px-4 py-2 rounded-smooth uppercase tracking-widest group-hover:bg-vio group-hover:text-white transition-colors duration-300 ease-in-out">
                    C&nbsp;
                    <NuxtTime :datetime="data.date as string" day="numeric" month="long" locale="ru-RU" />
                </div>
                <div
                    class="absolute top-0 right-0 opacity-40 group-hover:scale-105 transition-transform duration-400 ease-in-out w-full">
                    <!-- <NuxtImg src="/images/percents.png" width="320" height="310" format="webp" densities="x1 x2" /> -->
                     <NuxtImg :src="getTransformedImage(data.image)" class="cover w-full h-full" />
                </div>
            </div>

            <div id="content" class="z-20 flex flex-1 p-8 items-start justify-between gap-4">
                <!-- FIX ARROW -->
                <div class="flex flex-row items-end justify-between w-full gap-4">
                    <div class="flex flex-col gap-4">
                        <div class="text-balance text-white text-3xl font-bold leading-10">
                            {{ data.title }}
                        </div>
                        <div class="text-lg text-white">
                            {{ data.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="arrow" class="absolute bottom-6 right-6 group-hover:rotate-45 transition-transform duration-300 ease-in-out">
                <BaseIconsLinkArrow color="#ffffff" class="h-8! w-8! shrink-0" />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped></style>
