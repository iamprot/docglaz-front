<!-- /components/news/NewsFeaturedCard.vue -->
<script setup lang="ts">
import type { New } from '#shared/types/schema';

const appConfig = useAppConfig()

interface Props {
  data: New;
}

const props = defineProps<Props>();

const { getTransformedImage } = useDirectusImage();

</script>

<template>
  <NuxtLink :to="appConfig.routes.NEWS(data.slug)"
    class="block bg-white rounded-smooth overflow-hidden transition-shadow duration-300 hover-shadow-soft-blue">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">

      <!-- Левая часть: контент -->
      <div class="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-6 text-base uppercase tracking-widest text-secondary mb-8">
            <time :datetime="(data.date_created as string)">
              <NuxtTime :datetime="data.date_created as string" day="numeric" month="long" year="numeric"
                locale="ru-RU" />
            </time>
            <div class="inline-flex gap-2">
              <BaseIconsClock />
              <span v-if="data?.reading_time">{{ data?.reading_time }} мин</span>
            </div>
          </div>
          <BaseHeadline as="h2" :headline="data.title" class="font-bold! text-primary! text-2xl lg:text-5xl!" />
          <p v-if="data.excerpt" class="text-secondary text-lg mt-8 line-clamp-3">
            {{ data.excerpt }}
          </p>
        </div>

        <div class="inline-flex items-center gap-2 text-primary font-light text-lg mt-8">
          Читать далее
          <BaseIconsLinkArrow color="var(--color-primary)" />
        </div>
      </div>

      <!-- Правая часть: изображение -->
      <div class="order-1 lg:order-2 relative h-auto lg:min-h-[490px] overflow-hidden">
        <img v-if="data.image" :src="getTransformedImage(data.image, {
          width: 800,
          height: 600,
          fit: 'cover',
          quality: 90,
          format: 'webp'
        })" :alt="data.title" class="w-full h-full object-cover rounded-smooth" />
      </div>

    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>