<script setup lang="ts">
import type { Service } from "#shared/types/schema";

const appConfig = useAppConfig();

interface Props {
    data: Service;
    bgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
    bgColor: "#D7E9FF", // #D7E9FF
});

const { getTransformedImage, getImageUrl } = useDirectusImage();
</script>

<template>
    <NuxtLink :to="appConfig.routes.SERVICE(data.slug)">
        <div
            :style="`background-color: ${bgColor}`"
            class="group card-flare flex flex-col relative group rounded-3xl md:rounded-smooth h-full min-h-[150px] md:min-h-[200px] transition-shadow overflow-hidden duration-300 hover-shadow-soft-blue"
        >
            <!-- <div
                v-if="data.icon"
                class="absolute top-5 right-5 opacity-30 group-hover:opacity-75 transition-opacity duration-300 ease-in-out h-24 w-24 md:h-32 md:w-32 lg:h-36 lg:w-36"
            >
                <NuxtImg
                    :src="getImageUrl(data.icon)"
                    fit="cover"
                    class="w-full h-full"
                />
            </div> -->

            <div
                id="content"
                class="borderz-10 flex w-full h-full py-4 pl-4 pr-4 md:p-8 items-start"
            >
                <div
                    class="text-balance text-secondary-dark text-base md:text-2xl font-bold leading-5.5 md:leading-8"
                >
                    {{ data.title }}
                </div>
            </div>
            <div
                id="arrow"
                class="absolute bottom-2 right-2 md:bottom-5 md:right-5 mt-auto flex justify-end group-hover:rotate-45 transition-transform duration-300 ease-in-out"
            >
                <BaseIconsLinkArrow
                    class="h-6! w-6! md:h-8! md:w-8! shrink-0"
                />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>
.card-flare {
    background: url("/images/card_flare.svg") no-repeat right center;
    background-size: auto;
}
</style>
