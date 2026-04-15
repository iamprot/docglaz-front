<!-- /pages/index.vue -->
<script setup lang="ts">
import type { Page } from "#shared/types/schema";

const config = useRuntimeConfig();

const { data, error } = await useFetch<{ page: Page }>(`/api/pages/index`, {
    key: "page-home",
});

const page = computed(() => data.value?.page);
const pageBlocks = computed(() => (page.value?.blocks as PagesBlock[]) || []);

if (error.value || !page.value) {
    throw createError({
        statusCode: 404,
        message: "Главная страница не найдена",
    });
}

// Определяем robots на основе флагов
const robotsTag = computed(() => {
    const noIndex = page.value?.seo?.no_index === true;
    const noFollow = page.value?.seo?.no_follow === true;

    // Массив директив
    const directives = [
        noIndex ? "noindex" : "index",
        noFollow ? "nofollow" : "follow",
    ];

    return directives.join(", ");
});

useSeoMeta({
    title: page.value?.seo?.title || page.value?.title || "",
    description: page.value?.seo?.meta_description || "",
    ogTitle: page.value?.seo?.title || page.value?.title || "",
    ogDescription: page.value?.seo?.meta_description || "",
    // ogUrl: pageUrl.toString(),
    robots: () => robotsTag.value,
});

useHead({
    link: [
        {
            rel: "canonical",
            href: config.public.siteUrl,
        },
    ],
});
</script>

<template>
    <div>
        <PageBuilder :blocks="pageBlocks" />
    </div>
</template>
