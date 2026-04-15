<script setup lang="ts">
import type { Page, PagesBlock } from '#shared/types/schema';

const route = useRoute()
const appConfig = useAppConfig()
const config = useRuntimeConfig()
const permalink = computed(() => String(route.params.permalink))

const { data, error } = await useFetch<{ page: Page }>(`/api/pages/${permalink.value}`, {
  key: computed(() => `page-${permalink.value}`),
})

const page = computed(() => data.value?.page)
const pageBlocks = computed(() => (page.value?.blocks as PagesBlock[]) || []);

if (error.value || !page.value) {
  throw createError({
    statusCode: 404,
    message: 'К сожалению, страница не найдена',
  })
}

// Определяем robots на основе флагов
const robotsTag = computed(() => {
  const noIndex = page.value?.seo?.no_index === true;
  const noFollow = page.value?.seo?.no_follow === true;
  
  // Массив директив
  const directives = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow'
  ];
  
  return directives.join(', ');
});

useSeoMeta({
	title: page.value?.seo?.title || page.value?.title || '',
	description: page.value?.seo?.meta_description || '',
	ogTitle: page.value?.seo?.title || page.value?.title || '',
	ogDescription: page.value?.seo?.meta_description || '',
	// ogUrl: page.toString(),
  robots: () => robotsTag.value,
});


useHead({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/${page.value?.permalink as string}`,
    }
  ]
})
</script>

<template>
  <div>
    <BaseContainer>
      <BaseBreadcrumbs alwaysShow :parentLabel="page?.title" />
      <BaseHeadline as="h1" :headline="page?.title" />
    </BaseContainer>
    <PageBuilder :blocks="pageBlocks" />
  </div>
</template>

<style scoped></style>