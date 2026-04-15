// /composables/useDirectusImage.ts
import type { DirectusFile } from '#shared/types/schema';

interface ImageTransformOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  format?: 'jpg' | 'png' | 'webp' | 'avif' | 'tiff';
  quality?: number;
  withoutEnlargement?: boolean;
  focalPoint?: {
    x: number;
    y: number;
  };
  transforms?: Record<string, any>;
}

export const useDirectusImage = () => {
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl || '';

  /**
   * Получить базовый URL изображения
   */
  const getImageUrl = (image: string | DirectusFile | null | undefined): string => {
    if (!image) return '';

    // Если это строка (UUID)
    if (typeof image === 'string') {
      return `${directusUrl}/assets/${image}`;
    }

    // Если это объект DirectusFile
    if ('id' in image) {
      return `${directusUrl}/assets/${image.id}`;
    }

    return '';
  };

  /**
   * Получить трансформированное изображение
   */
  const getTransformedImage = (
    image: string | DirectusFile | null | undefined,
    options: ImageTransformOptions = {}
  ): string => {
    const baseUrl = getImageUrl(image);
    if (!baseUrl) return '';

    const {
      width,
      height,
      fit,
      format,
      quality,
      withoutEnlargement,
      focalPoint,
      transforms = {}
    } = options;

    const params = new URLSearchParams();

    // Добавляем параметры трансформации
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    if (fit) params.append('fit', fit);
    if (format) params.append('format', format);
    if (quality) params.append('quality', quality.toString());
    if (withoutEnlargement) params.append('withoutEnlargement', 'true');

    // Focal point для кадрирования
    if (focalPoint) {
      params.append('focal-point', `${focalPoint.x},${focalPoint.y}`);
    }

    // Дополнительные кастомные трансформации
    Object.entries(transforms).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    // Возвращаем URL с параметрами
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  /**
   * Получить несколько размеров для адаптивных изображений (srcset)
   */
  const getSrcSet = (
    image: string | DirectusFile | null | undefined,
    sizes: number[] = [320, 640, 1024, 1920],
    options: Omit<ImageTransformOptions, 'width'> = {}
  ): string => {
    if (!image) return '';

    return sizes
      .map((width) => {
        const url = getTransformedImage(image, { ...options, width });
        return `${url} ${width}w`;
      })
      .join(', ');
  };

  /**
   * Получить изображение с оптимальными настройками для веба
   */
  const getWebOptimizedImage = (
    image: string | DirectusFile | null | undefined,
    width?: number
  ): string => {
    return getTransformedImage(image, {
      width,
      format: 'webp',
      quality: 85,
      fit: 'cover',
      withoutEnlargement: true
    });
  };

  /**
   * Получить превью (thumbnail)
   */
  const getThumbnail = (
    image: string | DirectusFile | null | undefined,
    size: number = 300
  ): string => {
    return getTransformedImage(image, {
      width: size,
      height: size,
      fit: 'cover',
      format: 'webp',
      quality: 75
    });
  };

  /**
   * Получить полноразмерное изображение
   */
  const getFullSizeImage = (
    image: string | DirectusFile | null | undefined
  ): string => {
    return getTransformedImage(image, {
      format: 'webp',
      quality: 90
    });
  };

  return {
    getImageUrl,
    getTransformedImage,
    getSrcSet,
    getWebOptimizedImage,
    getThumbnail,
    getFullSizeImage
  };
};