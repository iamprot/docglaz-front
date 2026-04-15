<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: "ru",
    },
    // script: [
    //   { src: 'https://booking.medflex.ru/components/round/round_widget_button.js', defer: true }
    // ]
});

useSeoMeta({
    keywords: "офтальмология, клиника, тула, линзы, зрение",
});

useSchemaOrg([
    defineOrganization({
        name: "Офтальмологическая клиника ДОКГЛАЗ",
        url: "https://www.doc-glaz.ru",
        telephone: "+7 828 372 73 27",
        address: [
          defineAddress({
            streetAddress: "ул. Фрунзе, 13А",
            addressLocality: "Тула",
            addressCountry: "RU"
          })
        ],
        openingHours: "Пн-Пт 10:00-19:00, Сб: 10:00-18:00, Вск: Вых"
    }),
    defineWebSite({
        name: "Офтальмологическая клиника ДОКГЛАЗ",
        url: "https://www.doc-glaz.ru",
    }),
]);
</script>
<template>
    <main>
        <NuxtLoadingIndicator
            class="absolute top-0 left-0"
            :throttle="10"
            color="var(--color-primary)"
            :height="5"
        />
        <NuxtLayout>
            <NuxtPage />
            <CookieBanner />
        </NuxtLayout>
        <!-- <div id="medflexRoundWidgetData" data-src="https://booking.medflex.ru?
user=c660d059a9118bf6d3fce016c6ea9346&isRoundWidget=true"></div> -->
    </main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
