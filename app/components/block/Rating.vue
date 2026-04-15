<script setup lang="ts">
import type { BlockRating, Rating } from "#shared/types/schema";

interface Props {
    data: BlockRating;
}
const props = defineProps<Props>();

// Получаем и фильтруем рейтинги
const ratings = computed(() => {
    if (!props.data.ratingsgroup || !Array.isArray(props.data.ratingsgroup)) {
        return [];
    }

    return (props.data.ratingsgroup as Rating[])
        .filter((rating): rating is Rating => {
            return !!(rating && rating.value && rating.value.trim().length > 0);
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0));
});
</script>

<template>
    <div class="w-full mx-auto flex flex-col">
        <BaseHeadline :headline="data.headline" as="h2" class="mb-8" />
        <div
            class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[30px]"
        >
            <div
                v-for="(item, index) in ratings"
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
                <BaseRatingCard :data="item" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
