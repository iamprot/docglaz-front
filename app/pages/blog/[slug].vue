<script setup lang="ts">
import type { New as News } from "#shared/types/schema";

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const appConfig = useAppConfig();
const config = useRuntimeConfig();

const { data, error } = await useFetch<{ news: New; related: News[] }>(
    `/api/blog/${slug.value}`,
    {
        key: computed(() => `news-${slug.value}`),
    },
);

// 2. Извлекаем новость из объекта (это уже не ComputedRef массива)
const currentNews = computed(() => data.value?.news);
const relatedNews = computed(() => data.value?.related || []);

if (error.value || !currentNews.value) {
    throw createError({
        statusCode: 404,
        message: "К сожалению, страница не найдена",
    });
}

const parentLink = computed(() => {
    const path = route.path; // "/vrachi/ivan-petrov"

    // Если путь содержит слэши, убираем последний сегмент
    if (path && path.includes("/")) {
        return path.split("/").slice(0, -1).join("/") || "/";
    }
    return "/";
});

const { getTransformedImage, getImageUrl } = useDirectusImage();

// Определяем robots на основе флагов
const robotsTag = computed(() => {
    const noIndex = currentNews.value?.seo?.no_index === true;
    const noFollow = currentNews.value?.seo?.no_follow === true;

    // Массив директив
    const directives = [
        noIndex ? "noindex" : "index",
        noFollow ? "nofollow" : "follow",
    ];

    return directives.join(", ");
});

useSeoMeta({
    title: currentNews.value?.seo?.title || currentNews.value?.title || "",
    description: currentNews.value?.seo?.meta_description || "",
    ogTitle: currentNews.value?.seo?.title || currentNews.value?.title || "",
    ogDescription: currentNews.value?.seo?.meta_description || "",
    ogUrl: config.public.siteUrl + route.fullPath.toString(),
    author: "Специалисты клиники ДОКГЛАЗ",
    robots: () => robotsTag.value,
});

useHead({
    link: [
        {
            rel: "canonical",
            href: `${config.public.siteUrl}${parentLink.value}/${currentNews.value?.slug as string}`,
        },
    ],
});

useSchemaOrg([
    defineArticle({
        headline: currentNews.value.title,
        description: currentNews.value?.seo?.meta_description,
        datePublished: new Date("2026-03-12"),
        author: {
            name: "Специалисты клиники ДОКГЛАЗ",
        },
        publisher: {
            name: "Офтальмологическая клиника ДОКГЛАЗ",
            logo: { url: `${appConfig.websiteUrl}/favicon.png` },
        },
        image: [
            defineImage({
                url: getImageUrl(currentNews.value.image),
            }),
        ],
        mainEntityOfPage: {
            "@id": `${appConfig.websiteUrl}${parentLink.value}/${currentNews.value?.slug as string}`,
        },
    }),
]);
</script>

<template>
    <BaseContainer>
        <BaseBreadcrumbs
            parentLabel="Блог"
            :parentLink="parentLink"
            :currentLabel="currentNews?.title"
        />
        <div v-if="currentNews" class="flex flex-col space-y-[100px]">
            <article class="flex flex-col gap-4 md:gap-8">
                <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-0 transition-shadow duration-300 bg-white rounded-smooth overflow-hidden"
                >
                    <div
                        id="content"
                        class="order-2 lg:order-1 flex flex-1 flex-col p-6 md:p-8 items-start gap-8"
                    >
                        <div class="flex flex-col">
                            <div
                                class="flex items-center gap-6 text-base uppercase tracking-widest text-secondary mb-8"
                            >
                                <time
                                    :datetime="
                                        currentNews?.date_created as string
                                    "
                                >
                                    <NuxtTime
                                        :datetime="
                                            currentNews?.date_created as string
                                        "
                                        day="numeric"
                                        month="long"
                                        year="numeric"
                                        locale="ru-RU"
                                    />
                                </time>
                                <div class="inline-flex gap-2">
                                    <BaseIconsClock />
                                    <span v-if="currentNews?.reading_time || 3"
                                        >{{
                                            currentNews?.reading_time || 3
                                        }}
                                        мин</span
                                    >
                                </div>
                            </div>
                            <BaseHeadline
                                as="h1"
                                :headline="currentNews?.title"
                                class="text-balance font-bold! text-3xl! md:text-4xl! lg:text-5xl! leading-8! md:leading-12!"
                            />
                            <p
                                v-if="currentNews?.excerpt"
                                class="text-secondary text-base md:text-lg mt-8"
                            >
                                {{ currentNews?.excerpt }}
                            </p>
                        </div>

                        <!-- Здесь рендер кнопки -->
                        <div
                            v-if="
                                currentNews?.button &&
                                typeof currentNews?.button === 'object'
                            "
                            class="flex w-full justify-between items-center mt-auto"
                        >
                            <BaseButton :data="currentNews?.button" />
                        </div>
                    </div>

                    <!-- картинка -->
                    <div
                        v-motion-fade-visible-once
                        :duration="400"
                        class="order-1 lg:order-2 md:block h-full md:min-h-[490px] overflow-hidden rounded-smooth"
                    >
                        <NuxtImg
                            v-if="currentNews?.image"
                            :src="
                                getTransformedImage(currentNews?.image, {
                                    width: 800,
                                    height: 600,
                                    fit: 'cover',
                                    quality: 90,
                                    format: 'webp',
                                })
                            "
                            loading="lazy"
                            :alt="currentNews.title"
                            class="aspect-video w-full md:w-full md:h-full object-cover"
                        />
                    </div>
                </div>
                <BaseText :content="currentNews?.content" />

                <!-- CTA блок -->
                <BaseCTA
                    v-if="
                        currentNews?.button &&
                        typeof currentNews.button === 'object'
                    "
                    :button="currentNews?.button"
                    text="Начните видеть мир красивым!"
                    color="#E1E1FF"
                />
            </article>

            <!-- Связанные новости -->
            <section v-if="relatedNews.length">
                <div class="w-full mx-auto flex flex-col">
                    <div class="flex flex-1 items-start justify-between">
                        <BaseHeadline
                            headline="Другие статьи"
                            as="h2"
                            class="mb-8"
                        />
                        <NuxtLink :to="parentLink">
                            <div
                                class="group inline-flex items-start mt-2 gap-2 text-lg text-secondary hover:text-primary transition-colors duration-300"
                            >
                                <span>Все статьи</span>
                                <BaseIconsLinkArrow
                                    use-current-color
                                    class="text-secondary group-hover:text-primary transition-colors"
                                />
                            </div>
                        </NuxtLink>
                    </div>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[30px]"
                    >
                        <div
                            v-motion
                            v-for="(item, idx) in relatedNews"
                            :key="idx"
                            :initial="{ opacity: 0, y: 20 }"
                            :visible-once="{
                                opacity: 1,
                                y: 0,
                            }"
                            :delay="idx * 200"
                            :duration="300"
                        >
                            <BaseNewsCard :data="item" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </BaseContainer>
</template>

<style scoped></style>
