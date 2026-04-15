<script setup lang="ts">
import type { Review } from '#shared/types/schema';

interface Props {
    data: Review
}

const props = defineProps<Props>()

</script>

<template>
    <div class="bg-white p-8 rounded-smooth flex flex-col justify-between min-h-80">
        <div class="flex flex-col">
            <div>
                <BaseIconsQuote class="mb-2 shrink-0"/>
            </div>
            <div class="text-base font-light leading-6">
                {{ data.content }}
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="text-sm text-secondary">
                <NuxtTime
                    :datetime="data.date as string"
                    locale="ru-RU"
                    year="numeric"
                    month="long"
                    day="numeric"
                />
            </div>
            <div class="text-lg font-bold text-secondary-dark leading-5">{{ data.name }}</div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>