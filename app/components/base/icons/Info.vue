<script setup lang="ts">
interface Props {
    color?: string;
    useCurrentColor?: boolean; // Новый проп
}
const props = withDefaults(defineProps<Props>(), {
    color: '#4c85ff',
    useCurrentColor: false
})

</script>
<template>
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M16 23.6666C16.5522 23.6666 17 23.2189 17 22.6666V14.6666C17 14.1143 16.5522 13.6666 16 13.6666C15.4477 13.6666 15 14.1143 15 14.6666V22.6666C15 23.2189 15.4477 23.6666 16 23.6666Z"
            :fill="useCurrentColor ? 'currentColor' : color"
        />
        <path
            d="M16 9.33329C16.7363 9.33329 17.3333 9.93025 17.3333 10.6666C17.3333 11.403 16.7363 12 16 12C15.2636 12 14.6666 11.403 14.6666 10.6666C14.6666 9.93025 15.2636 9.33329 16 9.33329Z"
            :fill="useCurrentColor ? 'currentColor' : color"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.66663 16C1.66663 8.08388 8.08388 1.66663 16 1.66663C23.916 1.66663 30.3333 8.08388 30.3333 16C30.3333 23.916 23.916 30.3333 16 30.3333C8.08388 30.3333 1.66663 23.916 1.66663 16ZM16 3.66663C9.18845 3.66663 3.66663 9.18845 3.66663 16C3.66663 22.8115 9.18845 28.3333 16 28.3333C22.8115 28.3333 28.3333 22.8115 28.3333 16C28.3333 9.18845 22.8115 3.66663 16 3.66663Z"
            :fill="useCurrentColor ? 'currentColor' : color"
        />
    </svg>
</template>
