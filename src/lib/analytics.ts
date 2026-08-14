// Analytics tracking utilities for Dell landing page
// ID берутся из переменных окружения (GitHub Secrets → env vars при билде)

export const ANALYTICS_CONFIG = {
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID || '',
  YM_ID: process.env.NEXT_PUBLIC_YM_ID || '',
  YM_WEBVISOR: true,
} as const;

// Активные ID — устанавливаются при инъекции скриптов через cookie consent
let activeGtmId: string | null = null;
let activeYmId: string | null = null;

/**
 * Сохранить активные ID аналитики (вызывается из cookie-consent при загрузке скриптов)
 */
export function setActiveIds(gtmId: string | null, ymId: string | null) {
  activeGtmId = gtmId;
  activeYmId = ymId;
}

export interface CTAEvent {
  buttonName: string;
  buttonLocation: string;
  destinationUrl: string;
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(event: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !activeGtmId) return;

  const w = window as unknown as Record<string, unknown[]>;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event,
    ...params,
  });
}

/**
 * Send event to Yandex Metrica
 */
export function ymReachGoal(target: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined' || !activeYmId) return;

  const w = window as unknown as Record<string, (...args: unknown[]) => void>;
  if (typeof w.ym === 'function') {
    w.ym(activeYmId, 'reachGoal', target, params);
  }
}

/**
 * Track CTA button click across all analytics platforms
 */
export function trackCTAClick(event: CTAEvent) {
  pushToDataLayer('cta_click', {
    event_category: 'CTA',
    event_label: event.buttonName,
    event_location: event.buttonLocation,
    destination_url: event.destinationUrl,
  });

  ymReachGoal(`cta_${event.buttonName.replace(/\s+/g, '_').toLowerCase()}`, {
    location: event.buttonLocation,
    url: event.destinationUrl,
  });
}
