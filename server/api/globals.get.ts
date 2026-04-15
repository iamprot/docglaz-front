// /server/api/globals.get.ts
import { readSingleton } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  try {
    const globals = await directusServer.request(
      readSingleton('globals', {
        fields: [
          // '*',
          'price_list_file',
          {
            price_list_file: [
              'id',
              'title',
              'filename_download',
              'description'
            ]
          }
        ]
      })
    );

    return globals;
  } catch (error: any) {
    console.error('Failed to fetch globals:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch globals'
    });
  }
});