/** The browser API client: same-origin `/api/platform` proxy (ADR-005), HttpOnly cookie only (WEB-5). */
import { createApiClient } from '@/platform/shared/api-client';

export const api = createApiClient();
