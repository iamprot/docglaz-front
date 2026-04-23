<!-- components/blocks/BlockServices.vue -->
<script setup lang="ts">
import type { BlockService, Service } from "#shared/types/schema";

interface Props {
    data: BlockService;
}

const props = defineProps<Props>();

// Нормализуем категории с услугами для режима catalog
const categoriesServices = computed(() => {
    if (!props.data.list_categories) return [];

    return props.data.list_categories.map((category: any) => ({
        id: category.id,
        title: category.title,
        color: category.color,
        services: ((category.services as Service[]) || []).filter(
            (service): service is Service => service.status === "published",
        ),
    }));
});

// Нормализуем услуги для режима featured
const featuredServices = computed(() => {
    if (!props.data.featured_services) return [];
    return props.data.featured_services as Service[];
});

// Создаем безопасные геттеры для каждой позиции
const service0 = computed(() => (featuredServices.value?.[0] as Service) || "");
const service1 = computed(() => (featuredServices.value?.[1] as Service) || "");
const service2 = computed(() => (featuredServices.value?.[2] as Service) || "");
const service3 = computed(() => (featuredServices.value?.[3] as Service) || "");
const service4 = computed(() => (featuredServices.value?.[4] as Service) || "");
const service5 = computed(() => (featuredServices.value?.[5] as Service) || "");
</script>

<template>
    <div class="w-full mx-auto snap-start">
        <div
            v-if="data.headline && data.display_as == 'block'"
            class="flex flex-col items-start justify-between"
        >
            <!-- РЕЖИМ: Block / Featured (плоский список) -->

            <div class="flex w-full items-start justify-between gap-2">
                <BaseHeadline :headline="data.headline" as="h2" class="mb-8" />
                <NuxtLink to="/uslugi">
                    <div
                        class="group inline-flex items-center mt-2 gap-2 text-lg text-secondary hover:text-primary transition-colors duration-300"
                    >
                        <span class="text-base md:text-lg whitespace-nowrap"
                            >Все услуги</span
                        >
                        <BaseIconsLinkArrow
                            use-current-color
                            class="text-secondary group-hover:text-primary transition-colors"
                        />
                    </div>
                </NuxtLink>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 w-full">
                <!-- Row 1 -->
                <div
                    v-if="service0"
                    class="col-span-1 lg:col-span-2 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature :data="service0" />
                </div>
                <div
                    v-if="service1"
                    class="col-span-1 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature small :data="service1" />
                </div>
                <div
                    v-if="service2"
                    class="col-span-1 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature small :data="service2" />
                </div>

                <!-- Row 2 -->
                <div
                    v-if="service3"
                    class="col-span-1 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature small :data="service3" />
                </div>
                <div
                    v-if="service4"
                    class="col-span-1 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature small :data="service4" />
                </div>
                <div
                    v-if="service5"
                    class="col-span-1 lg:col-span-2 row-span-1 min-h-[150px] lg:min-h-[300px]"
                >
                    <BaseServiceCardFeature :data="service5" />
                </div>
            </div>
        </div>

        <!-- РЕЖИМ: Grid - Catalog (группировка по категориям) -->
        <div
            v-else-if="data.display_as === 'grid'"
            class="space-y-8 md:space-y-12"
        >
            <div
                v-for="category in categoriesServices"
                :key="category.id"
                class="category-section"
            >
                <BaseHeadline
                    as="h2"
                    :headline="category.title"
                    class="text-primary! mb-6 md:mb-8"
                />

                <div
                    v-if="category.services.length > 0"
                    class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8"
                >
                    <div
                        v-for="(service, index) in category.services"
                        :key="index"
                    >
                        <BaseServiceCard
                            :data="service"
                            :bgColor="category?.color"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
