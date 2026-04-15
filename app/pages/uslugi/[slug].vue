<script setup lang="ts">
import type { Category, Service, ServicesBlock } from "#shared/types/schema";

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const appConfig = useAppConfig();
const config = useRuntimeConfig()

const { data, error } = await useFetch<{ service: Service[] }>(
    `/api/uslugi/${slug.value}`,
    {
        key: computed(() => `service-${slug.value}`),
    },
);

const service = computed(() => data.value?.service?.[0]);
const serviceBlocks = computed(
    () => (service.value?.blocks as ServicesBlock[]) || [],
);

if (error.value || !service.value) {
    throw createError({
        statusCode: 404,
        message: "К сожалению, страница не найдена",
    });
}

// чекаем, что category это объект
const isCategory = (cat: unknown): cat is Category =>
    typeof cat === "object" && cat !== null && "title" in cat;

// получаем заголовок
const categoryTitle = computed(() => {
    const cat = service.value?.category;
    return isCategory(cat) ? cat.title : null;
});

const { getTransformedImage } = useDirectusImage();

const parentLink = computed(() => {
    const path = route.path; // "/uslugi/usluggga"

    // Если путь содержит слэши, убираем последний сегмент
    if (path && path.includes("/")) {
        return path.split("/").slice(0, -1).join("/") || "/";
    }
    return "/";
});

// Определяем robots
const robotsTag = computed(() => {
    const noIndex = service.value?.seo?.no_index === true;
    const noFollow = service.value?.seo?.no_follow === true;

    const directives = [
        noIndex ? "noindex" : "index",
        noFollow ? "nofollow" : "follow",
    ];

    return directives.join(", ");
});

useSeoMeta({
    title: service.value?.seo?.title || service.value?.title || "",
    description: service.value?.seo?.meta_description || "",
    ogTitle: service.value?.seo?.title || service.value?.title || "",
    ogDescription: service.value?.seo?.meta_description || "",
    ogUrl: config.public.siteUrl + route.fullPath.toString(),
    ogImage: getTransformedImage(service.value.seo?.og_image),
    robots: () => robotsTag.value,
});

useHead({
    link: [
        {
            rel: "canonical",
            href: `${config.public.siteUrl}${parentLink.value}/${service.value?.slug as string}`,
        },
    ],
});
</script>

<template>
    <div>
        <BaseContainer class="w-full">
            <BaseBreadcrumbs
                parentLabel="Услуги"
                :parentLink="parentLink"
                :currentLabel="service?.title"
            />

            <div class="flex flex-col gap-4 md:gap-8">
                <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-0 transition-shadow duration-300 bg-white rounded-smooth"
                >
                    <div
                        id="content"
                        class="order-2 lg:order-1 flex flex-1 flex-col p-8 items-start gap-8"
                    >
                        <div class="flex flex-col">
                            <div
                                class="flex items-center gap-6 text-base uppercase tracking-widest text-secondary mb-8"
                            >
                                {{ categoryTitle }}
                            </div>
                            <BaseHeadline
                                as="h1"
                                :headline="service?.title"
                                class="text-balance font-bold! text4xl! md:text-5xl! leading-8! lg:leading-12!"
                            />
                            <p
                                v-if="service?.description"
                                class="text-secondary text-base md:text-lg mt-8 line-clamp-3"
                            >
                                {{ service?.description }}
                            </p>
                        </div>
                        <!-- Здесь рендер кнопки -->
                        <div
                            v-if="
                                service?.button &&
                                typeof service?.button === 'object'
                            "
                            class="flex w-full justify-between items-center mt-auto"
                        >
                            <BaseButton :data="service?.button" />
                        </div>
                    </div>

                    <!-- картинка -->
                    <div
                        class="order-1 lg:order-2 md:block h-full md:min-h-[490px] overflow-hidden rounded-smooth"
                    >
                        <NuxtImg
                            v-if="service?.image"
                            :src="
                                getTransformedImage(service?.image, {
                                    width: 800,
                                    height: 600,
                                    fit: 'cover',
                                    quality: 90,
                                    format: 'webp',
                                })
                            "
                            loading="lazy"
                            :alt="service.image"
                            class="aspect-video w-full md:w-full md:h-full object-cover"
                        />
                    </div>
                </div>

                <BaseServiceTabs v-if="service" :service="(service as any)" />

                <!-- price -->
                <BaseText title="Стоимость" as="price">
                    <div class="divide-y divide-black/20 divide-dashed mb-4">
                        <div
                            v-for="(item, idx) in service?.prices"
                            :key="idx"
                            class="flex justify-between items-center gap-4 py-4"
                        >
                            <div class="flex flex-col items-start">
                                <div
                                    id="price-details"
                                    class="max-w-max text-base md:text-lg font-semibold wrap-break-word text-black"
                                >
                                    {{ item.item }}
                                </div>
                                <div
                                    class="text-sm font-light text-black/50 uppercase tracking-wider whitespace-nowrap"
                                >
                                    {{ item.code }}
                                </div>
                            </div>
                            <div
                                class="text-xl md:text-2xl font-bold text-primary whitespace-nowrap shrink-0"
                            >
                                {{ item.value }}₽
                            </div>
                        </div>
                    </div>
                    <BaseInfoAccent
                        showPriceLink
                        v-if="service?.notice"
                        :msg="service?.notice"
                    />
                </BaseText>
                <!-- CTA блок -->
                <BaseCTA
                    v-if="service?.button && typeof service.button === 'object'"
                    :button="service?.button"
                    color="#F9DCF9"
                />
            </div>
        </BaseContainer>
        <PageBuilder :blocks="serviceBlocks" />
    </div>
</template>

<style scoped></style>
