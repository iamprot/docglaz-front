<!-- /components/ui/YandexMap.vue -->
<script setup lang="ts">
interface Props {
  center?: [number, number]; // [широта, долгота]
  zoom?: number;
  markerIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [54.194421, 37.592227], // Москва по умолчанию
  zoom: 17,
  markerIcon: '/mapSign.svg'
});



const mapContainer = ref<HTMLElement | null>(null);
let myMap: any = null;
let ymaps: any = null;

// Загружаем скрипт Яндекс.Карт динамически
const loadYandexMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Если уже загружен
    if (window.ymaps) {
      ymaps = window.ymaps;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    script.onload = () => {
      ymaps = window.ymaps;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Инициализация карты
const initMap = async () => {
  if (!mapContainer.value) return;

  try {
    await loadYandexMaps();

    ymaps.ready(() => {
      myMap = new ymaps.Map(mapContainer.value, {
        center: props.center,
        zoom: props.zoom,
        controls: [],
      });

      // Маркер
      const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        iconLayout: 'default#image',
        iconImageHref: props.markerIcon,
        iconImageSize: [64, 46],
        iconImageOffset: [-30, -50]
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');

      // Отключаем перетаскивание на мобильных
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('drag');
      }
    });
  } catch (error) {
    console.error('Failed to load Yandex Maps:', error);
  }
};

// Хуки жизненного цикла
onMounted(() => {
  initMap();
});

onUnmounted(() => {
  // Очистка: удаляем карту для предотвращения утечек памяти
  if (myMap) {
    myMap.destroy();
    myMap = null;
  }
});
</script>

<template>
  <div class="map relative w-full h-full rounded-lg overflow-hidden">
    <div ref="mapContainer" id="map" class="w-full h-full" />
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}

.ymaps-2-1-79-ground-pane {
  filter: grayscale();
}
</style>