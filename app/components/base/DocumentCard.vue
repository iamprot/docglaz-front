<script setup lang="ts">
import type { DirectusFile } from "#shared/types/schema";

interface Props {
    file: DirectusFile;
}

const props = defineProps<Props>();

const { getUrl, getDisplayName, formatSize } = useDocFile();
const fileSize = computed(() => formatSize(props.file));
const downloadUrl = computed(() => getUrl(props.file, { download: false }));
const name = computed(() => getDisplayName(props.file));
</script>

<template>
    <div>
        <a
            :href="downloadUrl"
            :download="file.filename_download"
            target="_blank"
            :aria-label="`Скачать ${name}`"
        >
            <div
                class="group flex flex-col h-full items-start p-4 md:p-8 border border-dashed gap-2 md:gap-4 rounded-2xl border-accent/30 hover:bg-primary/10 transition-all duration-300"
            >
                <BaseIconsPdf class="h-6! w-6! shrink-0" />
                <div class="flex flex-col items-start gap-2">
                    <div class="text-secondary-dark">
                        {{ name }}
                    </div>
                    <div
                        class="text-secondary text-sm px-2 py-1 bg-secondary/10 rounded-xl"
                    >
                        {{ fileSize }}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<style></style>
