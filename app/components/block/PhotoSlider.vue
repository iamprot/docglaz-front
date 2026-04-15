<!-- /components/block/BlockPhotoSlider.vue -->
<script setup lang="ts">
import type {
    BlockPhotoSlider,
    BlockPhotoSliderFile,
} from "#shared/types/schema";

interface Props {
    data: BlockPhotoSlider;
}

const props = defineProps<Props>();

// Получаем массив файлов
const photos = computed(() => {
    if (!props.data.photos || !Array.isArray(props.data.photos)) {
        return [];
    }

    return (props.data.photos as BlockPhotoSliderFile[]).filter(
        (photo): photo is BlockPhotoSliderFile =>
            photo &&
            typeof photo === "object" &&
            photo.directus_files_id !== null &&
            photo.directus_files_id !== undefined,
    );
});
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
            opacity: 1,
            y: 0,
        }"
        :delay="300"
        :duration="500"
        class="w-full mx-auto"
    >
        <BaseHeadline
            v-if="data.headline"
            :headline="data.headline"
            as="h2"
            class="mb-8"
        />
        <UiImgSlider :photos="photos" />
    </div>
</template>
