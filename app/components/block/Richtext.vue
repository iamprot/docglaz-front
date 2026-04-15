<script setup lang="ts">
import type { BlockRichtext } from '#shared/types/schema';

interface Props {
    data: BlockRichtext
}

const props = defineProps<Props>();

</script>

<template>
    <div>
        <BaseText :content="props?.data.content" :alignment="props.data.alignment"/>
    </div>
</template>

<style scoped>

</style>