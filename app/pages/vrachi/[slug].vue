<script setup lang="ts">
import type { Doctor, DoctorsBlock } from "#shared/types/schema";

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const appConfig = useAppConfig();
const config = useRuntimeConfig()

const { data, error } = await useFetch<{ doctor: Doctor[] }>(
    `/api/vrachi/${slug.value}`,
    {
        key: computed(() => `doctor-${slug.value}`),
    },
);

const doctor = computed(() => data.value?.doctor?.[0]);
const doctorBlocks = computed(
    () => (doctor.value?.blocks as DoctorsBlock[]) || [],
);

if (error.value || !doctor.value) {
    throw createError({
        statusCode: 404,
        message: "К сожалению, страница не найдена",
    });
}

const { getTransformedImage } = useDirectusImage();

const parentLink = computed(() => {
    const path = route.path;

    // Если путь содержит слэши, убираем последний сегмент
    if (path && path.includes("/")) {
        return path.split("/").slice(0, -1).join("/") || "/";
    }
    return "/";
});

// Определяем robots на основе флагов
const robotsTag = computed(() => {
    const noIndex = doctor.value?.seo?.no_index === true;
    const noFollow = doctor.value?.seo?.no_follow === true;

    // Массив директив
    const directives = [
        noIndex ? "noindex" : "index",
        noFollow ? "nofollow" : "follow",
    ];

    return directives.join(", ");
});

useSeoMeta({
    title: doctor.value?.seo?.title || doctor.value?.title || "",
    description: doctor.value?.seo?.meta_description || "",
    ogTitle: doctor.value?.seo?.title || doctor.value?.title || "",
    ogDescription: doctor.value?.seo?.meta_description || "",
    ogUrl: config.public.siteUrl + route.fullPath.toString(),
    ogImage: getTransformedImage(doctor.value.seo?.og_image),
    robots: () => robotsTag.value,
});

useHead({
    link: [
        {
            rel: "canonical",
            href: `${config.public.siteUrl}${parentLink.value}/${doctor.value?.slug as string}`,
        },
    ],
});

const currentBackground = computed(() => {
    return `background-color: ${doctor.value?.color};`;
});
</script>

<template>
    <div>
        <BaseContainer>
            <BaseBreadcrumbs
                parentLabel="Врачи"
                :parentLink="parentLink"
                :currentLabel="doctor?.title"
            />

            <div class="flex flex-col gap-4 md:gap-8">
                <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-0 transition-shadow duration-300 bg-white rounded-smooth"
                >
                    <div
                        class="flex justify-center rounded-smooth w-full aspect-video h-full md:min-h-[490px] overflow-hidden"
                        :style="currentBackground || '#DBEAFE'"
                    >
                        <img
                            :src="
                                getTransformedImage(doctor?.image, {
                                    fit: 'cover',
                                })
                            "
                            class="object-cover h-full"
                        />
                    </div>

                    <div
                        id="content"
                        class="flex flex-1 flex-col p-6 md:p-8 items-start gap-8"
                    >
                        <div class="flex flex-col gap-6">
                            <BaseHeadline
                                as="h1"
                                :headline="doctor?.title"
                                class="wrap-break-word"
                            />
                            <div class="text-lg font-light text-black/60">
                                {{ doctor?.description }}
                            </div>
                            <div
                                class="bg-secondary/10 px-4 py-1 rounded-2xl flex-none w-fit"
                            >
                                Стаж работы {{ doctor?.standing }}
                            </div>
                        </div>
                        <!-- Здесь рендер кнопки -->
                        <div
                            v-if="
                                doctor?.button &&
                                typeof doctor?.button === 'object'
                            "
                            class="flex w-full justify-between items-center mt-auto"
                        >
                            <BaseButton :data="doctor?.button" />
                        </div>
                    </div>
                </div>

                <BaseAccordion
                    :open="true"
                    title="Образование"
                    :content="doctor?.education"
                />
                <BaseAccordion
                    v-if="doctor?.experience"
                    :open="false"
                    title="Опыт работы"
                    :content="doctor?.experience"
                />
                <BaseAccordion
                    v-if="doctor?.skills"
                    :open="false"
                    title="Профессиональные навыки"
                    :content="doctor?.skills"
                />
                <BaseAccordion
                    v-if="doctor?.certificates"
                    :open="false"
                    title="Курсы и сертификаты"
                    :content="doctor?.certificates"
                />

                <!-- CTA блок -->
                <BaseCTA
                    v-if="
                        doctor?.button &&
                        typeof doctor.button === 'object'
                    "
                    :button="doctor?.button"
                    text="Вы можете увидеть мир ярче!"
                    color="#E2F2FF"
                />
            </div>
        </BaseContainer>
        <PageBuilder :blocks="doctorBlocks" />
    </div>
</template>

<style scoped></style>
