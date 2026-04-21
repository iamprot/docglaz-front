<script setup lang="ts">
import type { BlockButton } from "#shared/types/schema";

interface Props {
    button?: BlockButton;
    color?: string;
    text?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#ffffff",
    text: "Поторопитесь увидеть красоту этого мира!"
});
</script>

<template>
    <!-- CTA блок -->
    <div
        v-if="button && typeof button === 'object'"
        :style="`background-color: ${color};`"
        class="flex flex-col p-8 gap-8 bg-linear-to-r from-cyan-500 to-blue-500 rounded-smooth md:bg-[url(/images/eye.png)] bg-no-repeat bg-right bg-size-[auto_400px] hover:bg-size-[auto_410px] transition-all duration-300"
    >
        <BaseHeadline
            as="h3"
            :headline="text"
            class="text-secondary-dark"
        />
        <BaseButton :data="button" />
    </div>
</template>

<style scoped></style>
