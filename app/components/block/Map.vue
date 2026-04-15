<script setup lang="ts">
import type { BlockMap } from '#shared/types/schema';

interface Props {
    data: BlockMap;
}

const props = defineProps<Props>();

const { getIcon } = useSocialIcons();


// Парсим координаты из строки "55.684862, 37.560302" → [55.684862, 37.560302]
const mapCenter = computed((): [number, number] => {
    const coords = props.data.map || '54.194421, 37.592227';
    const [lat, lon] = coords.split(',').map(str => parseFloat(str.trim()));

    // Принудительно приводим тип, предполагая, что данные валидны
    return [lat, lon] as [number, number];
});
</script>

<template>
    <div class="flex flex-col gap-[30px]">
        <div class="w-full mx-auto grid lg:grid-cols-2 grid-flow-row lg:grid-flow-col rounded-smooth gap-8">
            <div id="content"
                class="flex flex-col p-8 items-start gap-10 order-last lg:order-first bg-white rounded-smooth">
                <div class="flex flex-col gap-6 md:gap-10">
                    <h2 class="text-balance text-black text-3xl md:text-5xl font-bold leading-12">
                        {{ data.title }}
                    </h2>

                    <ul class="text-secondary text-lg space-y-4 md:space-y-5">
                        <li v-for="(item, idx) in data.links" :key="idx"
                        class="flex items-center gap-4">
                            <component v-if="getIcon(item.icon)" :is="getIcon(item.icon)" class="w-6 h-6 shrink-0" />
                            <NuxtLink v-if="item.link" :to="item.link" class="hover:text-primary transition-colors duration-300">{{ item.text }}</NuxtLink>
                            <span v-else>{{ item.text }}</span>
                        </li>
                    </ul>

                    <div class="flex flex-col gap-4">
                        <BaseHeadline as="h4" headline="График работы" />
                        <p class="text-lg text-secondary">{{ data.working_hours }}</p>
                    </div>
                </div>
                <!-- Здесь рендер кнопки -->
                <div v-if="data.button && typeof data.button === 'object'"
                    class="flex w-full justify-between items-center mt-auto">
                    <BaseButton :data="data.button" />
                </div>
            </div>
            <div class="rounded-smooth overflow-hidden h-96 md:min-h-full">
                <UiYandexMap :center="mapCenter"  />
            </div>
        </div>
        <!-- <BaseText v-if="data.advantages" :content="data.advantages" />
    <BaseText v-if="data.info" :content="data.info" /> -->
    </div>


</template>

<style scoped></style>