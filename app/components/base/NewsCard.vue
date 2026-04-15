<script setup lang="ts">
import type { New } from '#shared/types/schema';

const appConfig = useAppConfig()

interface Props {
    data: New;
}

const props = defineProps<Props>();

const { getTransformedImage } = useDirectusImage()
</script>

<template>
    
    <NuxtLink :to="appConfig.routes.NEWS(data.slug)">
        <div id="card"
            class="group bg-white rounded-smooth h-full flex flex-col transition-shadow duration-300 hover-shadow-soft-blue">

            <div class="relative flex flex-col gap-2 items-center rounded-smooth overflow-hidden aspect-video">
                <NuxtImg :src="getTransformedImage(data.image, {
                    fit: 'cover',
                    height: 300,
                    quality: 85,
                    format: 'webp'
                })" placeholder="/images/image_placeholder.png"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
            </div>

            <div id="content" class="flex flex-1 p-8 items-start justify-between gap-2">
                <!-- FIX ARROW -->
                <div class="flex flex-row items-end justify-between w-full gap-4">
                    <div class="flex flex-col gap-4 mr-6">
                        <div class="uppercase tracking-widest text-secondary">
                            <NuxtTime :datetime="data.date_created as string" day="numeric" month="long" year="numeric"
                                locale="ru-RU" />

                        </div>
                        <div class="text-black text-xl font-bold">
                            {{ data.title }}
                        </div>

                    </div>
                </div>
                <div id="arrow" class="absolute bottom-5 right-5 md:bottom-5 md:right-5 mt-auto flex justify-end group-hover:rotate-45 transition-transform duration-300 ease-in-out">
                    <BaseIconsLinkArrow class="h-8! w-8! shrink-0" />
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped></style>