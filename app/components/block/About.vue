<script setup lang="ts">
import type { BlockAbout } from "#shared/types/schema";
import DocumentCard from "../base/DocumentCard.vue";

interface Props {
    data: BlockAbout;
}

const props = defineProps<Props>();

const relatedDocuments = computed(() => {
    const relations = props.data.documents;
    if (!relations || !Array.isArray(relations)) return [];

    return relations
        .filter(
            (rel): rel is any =>
                typeof rel !== "string" &&
                typeof rel.directus_files_id === "object" &&
                rel.directus_files_id !== null,
        )
        .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
        .map((rel) => rel.directus_files_id);
});

const { getTransformedImage } = useDirectusImage();
</script>

<template>
    <div class="flex flex-col gap-[30px]">
        <div
            class="w-full mx-auto grid lg:grid-cols-2 grid-flow-row lg:grid-flow-col rounded-smooth bg-white"
        >
            <div
                id="content"
                class="flex flex-col p-8 items-start gap-12 order-last lg:order-first"
            >
                <div class="flex flex-col gap-8">
                    <h2
                        class="text-balance text-black text-5xl font-bold leading-12"
                    >
                        {{ data.title }}
                    </h2>
                    <div
                        class="text-secondary text-lg space-y-6"
                        v-html="data.description"
                    ></div>
                </div>
                <!-- Здесь рендер кнопки -->
                <div
                    v-if="data.button && typeof data.button === 'object'"
                    class="flex w-full justify-between items-center mt-auto"
                >
                    <BaseButton :data="data.button" />
                </div>
            </div>
            <div class="rounded-smooth overflow-hidden">
                <img
                    :src="
                        getTransformedImage(data.image, {
                            fit: 'cover',
                        })
                    "
                    class="object-cover h-full"
                />
            </div>
        </div>
        <BaseText v-if="data.advantages" :content="data.advantages" />
        <BaseAccordion
            v-if="data.info"
            :open="false"
            title="Сведения о медицинской организации"
            :content="data.info"
        />
        <BaseDocsAccordion :open="false" title="Правовые документы">
            <div
                class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
                <DocumentCard
                    v-for="file in relatedDocuments"
                    :key="file.id"
                    :file="file"
                />
            </div>
        </BaseDocsAccordion>
        <BaseInfoAccent
            msg="Клиника работает на платной основе. Услуги по полисам ОМС/ДМС не оказываются"
        />
    </div>
</template>

<style scoped></style>
