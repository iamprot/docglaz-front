// server/utils/directus-server.ts
import {
	// aggregate,
	createDirectus,
	// readItem,
	// readItems,
	rest,
	// readSingleton,
	// createItem,
	// updateItem,
	staticToken,
	// uploadFiles,
	// readMe,
	withToken,
	// type QueryFilter,
	// readUser,
} from '@directus/sdk';

import type { Schema } from '#shared/types/schema';

const runtimeConfig = useRuntimeConfig()
const directusUrl = runtimeConfig.public.directusUrl || 'http://localhost:8055';
const directusToken = runtimeConfig.directusServerToken;

export const directusServer = createDirectus<Schema>(directusUrl, {
  globals: { fetch: globalThis.fetch },
})
  .with(rest())
  .with(staticToken(directusToken));

