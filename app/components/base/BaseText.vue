<script setup lang="ts">
interface BaseText {
    title?: string | null;
    content?: string | null;
    alignment?: "left" | "center" | null;
    as?: "default" | "price";
}

const props = withDefaults(defineProps<BaseText>(), {
    title: "",
    content: "",
    alignment: "left",
    as: "default",
});
</script>

<template>
    <div
        v-if="(as === 'default')"
        :class="[
            {
                'p-8 bg-white overflow-hidden rounded-smooth': as === 'default' && alignment === 'left',
                'rounded-smooth': as === 'default' && alignment === 'center',
            },
        ]"
    >
        <div
            :class="[
                'v-html-content',
                {
                    'text-center': alignment === 'center',
                    'text-left': alignment === 'left',
                },
            ]"
            v-html="content"
        />
    </div>

    <div
        v-else-if="as === 'price'"
        class="p-8 rounded-smooth overflow-hidden bg-white"
    >
        <BaseHeadline
            as="h2"
            :headline="title"
            class="text-4x font-bold transition-colors text-secondary-dark duration-300"
        >
            {{ title }}
        </BaseHeadline>

        <div class="mt-7 text-lg leading-8">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>
