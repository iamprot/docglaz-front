<script setup lang="ts">
import type { Doctor } from '#shared/types/schema';

const appConfig = useAppConfig()

interface Props {
    data: Doctor;
    noShadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    noShadow: false
});

const currentBackground = computed(() => {
    return `background-color: ${props.data?.color};`
})

const { getTransformedImage } = useDirectusImage()
</script>

<template>
    <div :class="[
        'bg-white rounded-smooth h-full flex flex-col',
        {
            'transition-shadow duration-300 hover-shadow-soft-blue': noShadow === false,
        }
    ]">

        <NuxtLink :to="`${appConfig.routes.DOCTOR(data.slug)}`">
            <div class="relative flex flex-col gap-2 items-center rounded-smooth overflow-hidden h-full min-h-[264px] lg:min-h-[364px]"
                :style="currentBackground || '#DBEAFE'">
                <NuxtImg :src="getTransformedImage(data.image, {
                    fit: 'cover',
                })" class="z-10 h-full object-cover" />
            </div>
        </NuxtLink>

        <div id="content" class="flex flex-1 flex-col p-8 items-start gap-8">

            <div class="flex flex-col gap-4">
                <div class="text-balance text-black text-2xl font-bold leading-8">
                    {{ data.title }}
                </div>
                <div class="text-lg font-light text-black/60">
                    {{ data.description }}
                </div>
                <div class="bg-secondary/10 px-4 py-1 rounded-2xl flex-none w-fit">
                    Стаж работы {{ data.standing }}
                </div>
            </div>

            <!-- Здесь рендер кнопки -->
            <div v-if="data.button && typeof data.button === 'object'"
                class="flex w-full justify-between items-center mt-auto">
                <BaseButton :data="data.button" />

            </div>
        </div>
                <BaseIconsLinkArrow class="absolute bottom-6 right-6  h-8! w-8! shrink-0 hidden md:block" />
</div>
</template>

<style scoped></style>