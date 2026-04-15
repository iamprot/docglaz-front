<script setup lang="ts">
import type {
    BlockPromotion,
    BlockPromotionsPromotion,
    Promotion,
} from "#shared/types/schema";

interface Props {
    data: BlockPromotion;
}

const props = defineProps<Props>();

// чекаем связь с акциями
const isValidPromotionRelation = (
    relation: BlockPromotionsPromotion | string,
): relation is BlockPromotionsPromotion & { promotions_id: Promotion } => {
    return (
        typeof relation !== "string" &&
        relation?.promotions_id !== null &&
        typeof relation.promotions_id === "object" &&
        (relation.promotions_id as Promotion)?.status === "published"
    );
};

// собираем акции
const promotions = computed(() => {
    const relations = props.data.promotionsgroup;

    if (!relations || !Array.isArray(relations)) {
        return [];
    }

    return (
        relations
            // фильтруем валидные связи с опубликованными промками
            .filter(
                (
                    relation,
                ): relation is BlockPromotionsPromotion & {
                    promotions_id: Promotion;
                } => isValidPromotionRelation(relation),
            )
            // сортируем по sort в джанке
            .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
            .map((relation) => relation.promotions_id)
    );
});

const displayMode = computed(() => props.data.display_as || "block");
</script>

<template>
    <div class="relative w-full mx-auto">
        <div
            class="absolute -top-16 right-1/4 opacity-50"
            :class="[displayMode === 'block' ? '-top-16' : '-top-32']"
        >
            <BaseIconsCloudDark class="shrink-0" />
        </div>

        <div
            v-if="data.headline && displayMode == 'block'"
            class="flex flex-col items-start justify-between"
        >
            <BaseHeadline
                v-motion-fade-visible-once
                :duration="400"
                :headline="data.headline"
                as="h2"
                class="z-20 mb-8"
            />

            <!-- Если BLOCK  -->
             <!-- auto-rows-fr тут был, но вряд ли нужен -->
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-[30px]" 
            > 
                <!-- ЛЕВАЯ КОЛОНКА (Большая карточка) -->
                <!-- row-span-2 растягивает на 2 ряда -->
                <div
                    v-motion-fade-visible-once
                    :delay="200"
                    :duration="600"
                    v-if="promotions[0]"
                    class="row-span-2 h-fit md:h-full"
                >
                    <BasePromotionCard :data="promotions[0]" />
                </div>

                <!-- ПРАВАЯ ВЕРХНЯЯ карточка (отдельная ячейка грида) -->
                <div
                    v-motion-fade-visible-once
                    :delay="200"
                    :duration="600"
                    v-if="promotions[1]"
                    class="row-span-1 h-full"
                >
                    <BasePromotionCardSmall :data="promotions[1]" />
                </div>

                <!-- ПРАВАЯ НИЖНЯЯ карточка (отдельная ячейка грида) -->
                <div
                    v-motion-fade-visible-once
                    :delay="200"
                    :duration="600"
                    v-if="promotions[2]"
                    class="row-span-1 h-full"
                >
                    <BasePromotionCardSmall :data="promotions[2]" />
                </div>
            </div>
        </div>

        <!-- Если grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <div
                v-for="(promotion, index) in promotions"
                :key="index"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                }"
                :delay="index * 200"
                :duration="300"
            >
                <BasePromotionCard :key="promotion.id" :data="promotion" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
