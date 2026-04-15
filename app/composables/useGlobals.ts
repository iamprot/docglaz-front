// /composables/useGlobals.ts
import type { Globals } from '#shared/types/schema';

export const useGlobals = () => {
  // 🔥 Один запрос на всё приложение (useFetch кэширует по ключу)
  const { data: globals, error, refresh } = useFetch<Globals>('/api/globals', {
    key: 'globals',
    cache: 'force-cache',  // Кэшируем ответ
  });

  // 🔥 Хелпер для получения ссылки на прайс-лист
  const getPriceListUrl = () => {
    const file = globals.value?.price_list_file;
    
    if (!file) return '#';
    
    // file может быть строкой (ID) или объектом
    const fileId = typeof file === 'string' ? file : file.id;
    const filename = typeof file === 'object' ? file.filename_download : null;
    
    const config = useRuntimeConfig();
    const directusUrl = config.public.directusUrl;
    
    if (filename) {
      return `${directusUrl}/assets/${fileId}?download=${encodeURIComponent(filename)}`;
    }
    
    return `${directusUrl}/assets/${fileId}`;
  };

  return {
    globals,
    error,
    refresh,
    getPriceListUrl,
  };
};