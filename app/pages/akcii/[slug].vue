<script setup lang="ts">
import type { Promotion, PromotionsBlock } from "#shared/types/schema";

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const appConfig = useAppConfig();
const config = useRuntimeConfig();

const { data, error } = await useFetch<{ promotion: Promotion[] }>(
    `/api/akcii/${slug.value}`,
    {
        key: computed(() => `promotion-${slug.value}`),
    },
);

const promotion = computed(() => data.value?.promotion?.[0]);
const promotionBlocks = computed(
    () => (promotion.value?.blocks as PromotionsBlock[]) || [],
);

if (error.value || !promotion.value) {
    throw createError({
        statusCode: 404,
        message: "К сожалению, страница не найдена",
    });
}

const { getTransformedImage } = useDirectusImage();

const parentLink = computed(() => {
    const path = route.path; // "/vrachi/ivan-petrov"

    // Если путь содержит слэши, убираем последний сегмент
    if (path && path.includes("/")) {
        return path.split("/").slice(0, -1).join("/") || "/";
    }
    return "/";
});

// Определяем robots на основе флагов
const robotsTag = computed(() => {
    const noIndex = promotion.value?.seo?.no_index === true;
    const noFollow = promotion.value?.seo?.no_follow === true;

    // Массив директив
    const directives = [
        noIndex ? "noindex" : "index",
        noFollow ? "nofollow" : "follow",
    ];

    return directives.join(", ");
});

useSeoMeta({
    title: promotion.value?.seo?.title || promotion.value?.title || "",
    description: promotion.value?.seo?.meta_description || "",
    ogTitle: promotion.value?.seo?.title || promotion.value?.title || "",
    ogDescription: promotion.value?.seo?.meta_description || "",
    ogUrl: config.public.siteUrl + route.fullPath.toString(),
    robots: () => robotsTag.value,
});

useHead({
    link: [
        {
            rel: "canonical",
            href: `${config.public.siteUrl}${parentLink.value}/${promotion.value?.slug as string}`,
        },
    ],
});
</script>

<template>
    <div>
        <BaseContainer>
            <BaseBreadcrumbs
                parentLabel="Акции"
                :parentLink="parentLink"
                :currentLabel="promotion?.title"
            />

            <div class="flex flex-col gap-4 md:gap-8">
                <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-0 transition-shadow duration-300 bg-white rounded-smooth"
                >
                    <div
                        id="content"
                        class="order-2 lg:order-1 flex flex-1 flex-col p-8 items-start gap-8"
                    >
                        <div class="flex flex-col gap-6">
                            <div
                                class="bg-vio text-white px-4 py-2 text-sm rounded-smooth uppercase tracking-widest group-hover:bg-white group-hover:text-vio transition-colors duration-300 ease-in-out w-fit"
                            >
                                C&nbsp;
                                <NuxtTime
                                    :datetime="promotion?.date as string"
                                    day="numeric"
                                    month="long"
                                    locale="ru-RU"
                                />
                            </div>
                            <BaseHeadline
                                as="h1"
                                :headline="promotion?.title"
                                class="text-balance font-bold! text-4xl! md:text-5xl! leading-10! lg:leading-12!"
                            />
                            <div class="text-lg text-secondary">
                                {{ promotion?.description }}
                            </div>
                        </div>
                        <!-- Здесь рендер кнопки -->
                        <div
                            v-if="
                                promotion?.button &&
                                typeof promotion?.button === 'object'
                            "
                            class="flex w-full justify-between items-center mt-auto"
                        >
                            <BaseButton :data="promotion?.button" />
                        </div>
                    </div>

                    <!-- картинка -->
                    <div
                        class="order-1 lg:order-2 md:block h-full md:min-h-[490px] overflow-hidden rounded-smooth"
                    >
                        <NuxtImg
                            v-if="promotion?.image"
                            :src="
                                getTransformedImage(promotion?.image, {
                                    width: 800,
                                    height: 600,
                                    fit: 'cover',
                                    quality: 90,
                                    format: 'webp',
                                })
                            "
                            loading="lazy"
                            :alt="promotion.image"
                            class="aspect-video w-full md:w-full md:h-full object-cover"
                        />
                    </div>
                </div>
                <BaseText :content="promotion?.content" />

                <BaseCTA
                    v-if="
                        promotion?.button &&
                        typeof promotion.button === 'object'
                    "
                    :button="promotion?.button"
                    text="Пусть мир будет ярким!"
                    color="#F2E4F9"
                />
            </div>
        </BaseContainer>
        <PageBuilder :blocks="promotionBlocks" />
    </div>
</template>

<style scoped></style>
