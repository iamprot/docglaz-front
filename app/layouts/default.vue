<!-- layouts/default.vue -->
<script setup>
const { data: siteData } = await useFetch('/api/site-data', {
    key: 'site-data',
    lazy: false,
    server: true,
    deep: true
});

// Опционально: для глобального доступа к globals
provide('globals', computed(() => siteData.value?.globals));
</script>

<template>
    <div class="flex flex-col">
        <NavigationMain :navigation="siteData.navigation" :globals="siteData.globals"/>
            <slot />
        <Footer :navigation="siteData.navigation" :footer="siteData.footer" :globals="siteData.globals" />
    </div>
</template>