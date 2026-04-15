// composables/useDocFile.ts
import type { DirectusFile } from '#shared/types/schema';

export interface DocFileOptions {
  /** Добавить параметр ?download для скачивания */
  download?: boolean;
  /** Дополнительные параметры запроса (transform, width, etc.) */
  params?: Record<string, string | number>;
}

export const useDocFile = () => {
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl || process.env.DIRECTUS_URL || '';

  /**
   * Получает ID файла (из объекта или строки)
   */
  const getFileId = (file: DirectusFile | string | null | undefined): string | null => {
    if (!file) return null;
    return typeof file === 'string' ? file : file.id || null;
  };

  /**
   * Генерирует ссылку на файл в Directus
   */
  const getUrl = (
    file: DirectusFile | string | null | undefined,
    options: DocFileOptions = {}
  ): string => {
    const fileId = getFileId(file);
    if (!fileId || !directusUrl) return '#';

    const { download = false, params = {} } = options;
    
    // Базовый URL: /assets/{id}
    let url = `${directusUrl}/assets/${fileId}`;
    
    // Параметры запроса
    const queryParams = new URLSearchParams();
    
    // Параметр скачивания
    if (download) {
      const fileObj = typeof file === 'object' ? file : null;
      const filename = fileObj?.filename_download;
      if (filename) {
        queryParams.set('download', filename);
      } else {
        queryParams.set('download', 'true');
      }
    }
    
    // Дополнительные параметры (transform, width, height, quality, etc.)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.set(key, String(value));
      }
    });

    // Добавляем query string, если есть параметры
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    return url;
  };

  /**
   * Отображаемое имя файла (title или filename_download)
   */
  const getDisplayName = (file: DirectusFile | string | null | undefined): string => {
    if (!file || typeof file === 'string') return 'Файл';
    
    return file.title?.trim() || file.filename_download || 'Файл';
  };

  /**
   * Форматирует размер файла (байты → КБ/МБ)
   */
  const formatSize = (file: DirectusFile | string | null | undefined): string => {
    if (!file || typeof file === 'string' || !file.filesize) return '';
    
    const bytes = file.filesize;
    if (bytes === 0) return '0 Б';
    
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  /**
   * Возвращает иконку по MIME-типу файла
   */
  const getFileIcon = (file: DirectusFile | string | null | undefined): string => {
    if (!file || typeof file === 'string' || !file.type) return 'icon-file';
    
    const type = file.type.toLowerCase();
    
    if (type.includes('pdf')) return 'icon-pdf';
    if (type.includes('image')) return 'icon-image';
    if (type.includes('video')) return 'icon-video';
    if (type.includes('audio')) return 'icon-audio';
    if (type.includes('word') || type.includes('document')) return 'icon-word';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'icon-excel';
    if (type.includes('zip') || type.includes('archive')) return 'icon-archive';
    
    return 'icon-file';
  };

  /**
   * Проверяет, является ли файл изображением
   */
  const isImage = (file: DirectusFile | string | null | undefined): boolean => {
    if (!file || typeof file === 'string' || !file.type) return false;
    return file.type.startsWith('image/');
  };

  /**
   * Проверяет, является ли файл PDF
   */
  const isPdf = (file: DirectusFile | string | null | undefined): boolean => {
    if (!file || typeof file === 'string' || !file.type) return false;
    return file.type === 'application/pdf';
  };

  return {
    getFileId,
    getUrl,
    getDisplayName,
    formatSize,
    getFileIcon,
    isImage,
    isPdf,
  };
};