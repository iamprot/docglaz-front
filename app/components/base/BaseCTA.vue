<script setup lang="ts">
import type { BlockButton } from "#shared/types/schema";

interface Props {
    button?: BlockButton;
    color?: string;
    text?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#ffffff",
    text: "Поторопитесь увидеть красоту этого мира!",
});
</script>

<template>
    <!-- CTA блок -->
    <!-- <div
        v-if="button && typeof button === 'object'"
        :style="`background-color: ${color};`"
        class="flex flex-col p-8 gap-8 rounded-smooth md:bg-[url(/images/eye.png)] bg-no-repeat bg-right bg-size-[auto_400px] hover:bg-size-[auto_410px] transition-all duration-300"
    > -->
    <div
        v-if="button && typeof button === 'object'"
        :style="`background-color: ${color};`"
        class="relative flex flex-col p-8 gap-8 rounded-smooth transition-all duration-300 overflow-hidden"
    >
        <BaseHeadline as="h3" :headline="text" class="z-10 text-secondary-dark" />
        <BaseButton :data="button" class="z-10" />
        <div class="z-1 city-scape absolute w-full bottom-0 right-0 h-[calc(100%)] opacity-40"></div>
    </div>
</template>

<style scoped>
.city-scape {
    background: url('/images/tula01.svg') bottom right no-repeat;
    background-size: auto 100%;
}
</style>
