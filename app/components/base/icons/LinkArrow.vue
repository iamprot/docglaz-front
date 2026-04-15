<script setup lang="ts">
interface Props {
    color?: string;
    useCurrentColor?: boolean; // Новый проп
}
const props = withDefaults(defineProps<Props>(), {
    color: '#697CA6',
    useCurrentColor: false
})

</script>
<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42157 6.34326C8.42157 5.92905 8.75735 5.59326 9.17157 5.59326L17.6568 5.59326C18.0711 5.59326 18.4068 5.92905 18.4068 6.34326L18.4068 14.8285C18.4068 15.2428 18.0711 15.5785 17.6568 15.5785C17.2426 15.5785 16.9068 15.2428 16.9068 14.8285V8.15392L6.87347 18.1873C6.58058 18.4802 6.1057 18.4802 5.81281 18.1873C5.51992 17.8944 5.51992 17.4195 5.81281 17.1266L15.8462 7.09326L9.17157 7.09326C8.75735 7.09326 8.42157 6.75748 8.42157 6.34326Z" :fill="useCurrentColor ? 'currentColor' : color"/>
    </svg>
</template>
