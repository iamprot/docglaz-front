<script setup lang="ts">
import type { Service } from "#shared/types/schema";

const appConfig = useAppConfig();

interface Props {
    data: Service;
    color?: string;
    small?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#ffffff",
    small: false,
    // color: "#D7E9FF",
});

const { getTransformedImage } = useDirectusImage();
</script>

<template>
    <NuxtLink :to="appConfig.routes.SERVICE(data.slug)">
        <div
            id="card"
            class="group flex flex-col items-start jus relative group rounded-smooth h-full transition-shadow overflow-hidden duration-300 hover-shadow-soft-blue"
            :style="`background-color: ${color}`"
        >
            <div
                v-if="data.icon"
                :class="[
                    'absolute',
                    {
                        'h-28 w-28 top-5 right-5 lg:top-auto lg:right-auto lg:bottom-5 lg:left-5': small,
                        'top-5 right-5 w-28 h-28 lg:h-42 lg:w-42': !small,
                    },
                ]"
            >
                <NuxtImg
                    :src="getTransformedImage(data.icon)"
                    fit="cover"
                    class="w-full h-full"
                />
            </div>

            <div
                id="content"
                :class="[
                    'z-10 flex w-full h-full pl-8 pr-36 md:py-8',
                    {
                        'items-center lg:items-start justify-between':
                            small,
                        'md:pr-72 md:pl-8 items-center lg:items-end justify-between':
                            !small,
                    },
                ]"
            >
                <!-- FIX ARROW -->
                <div class="flex flex-col">
                    <div
                        :class="[
                            'text-balance text-secondary-dark group-hover:text-primary transition-all duration-300 ease-in-out',
                            {
                                'text-xl lg:text-xl xl:text-2xl font-bold leading-8':
                                    small,
                                'text-xl lg:text-4xl font-bold leading-8 lg:leading-10':
                                    !small,
                            },
                        ]"
                    >
                        {{ data.title }}
                    </div>
                </div>
            </div>
            <div
                id="arrow"
                class="hidden md:block absolute bottom-6 right-6 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
            >
                <BaseIconsLinkArrow class="h-8! w-8! shrink-0" />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped></style>
