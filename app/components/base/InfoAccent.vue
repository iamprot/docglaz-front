<script setup lang="ts">
import { useGlobals } from "~/composables/useGlobals";

interface Props {
    msg?: string | null | undefined;
    warning?: boolean | undefined;
    showPriceLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    msg: "Важно! Окончательную стоимость уточняйте у администратора.",
    warning: false,
    showPriceLink: false,
});

// Вызываем composable без await
const { getPriceListUrl } = useGlobals();
const priceUrl = computed(() => getPriceListUrl());
</script>

<template>
    <div
        :class="{
            'border-red-700': warning,
            'border-primary': !warning,
            'items-start': showPriceLink,
            'items-center': !showPriceLink,
        }"
        class="flex gap-4 p-4 md:p-6 border border-dashed rounded-smooth text-base text-black/60"
    >
        <BaseIconsInfo
            class="w-8! h-8! shrink-0"
            :color="warning ? '#ff0000' : '#4c85ff'"
        />
        <div class="flex flex-col gap-2">
            <span>{{ props.msg }}</span>
            <span
                v-if="showPriceLink && priceUrl !== '#'"
                class="flex gap-2 text-black/50 underline hover:no-underline"
            >
                <BaseIconsPdf />
                <NuxtLink :href="priceUrl" target="_blank"
                    >Полный прайс&ndash;лист с актуальными ценами
                </NuxtLink>
            </span>
        </div>
    </div>
</template>

<style scoped></style>
