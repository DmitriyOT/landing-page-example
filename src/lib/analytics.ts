// Analytics tracking utilities for Dell landing page
// Replace placeholder IDs with your actual tracking IDs

export const ANALYTICS_CONFIG = {
  // Replace with your actual GTM container ID
  GTM_ID: 'GTM-XXXXXXX',
  // Replace with your actual GA4 measurement ID
  GA4_ID: 'G-XXXXXXXXXX',
  // Replace with your actual Yandex Metrica counter ID
  YM_ID: 'XXXXXXXXX',
  // Enable/disable webvisor
  YM_WEBVISOR: true,
} as const;

export interface CTAEvent {
  buttonName: string;
  buttonLocation: string;
  destinationUrl: string;
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(event: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  (window as unknown as Record<string, unknown[]>).dataLayer =
    (window as unknown as Record<string, unknown[]>).dataLayer || [];

  (window as unknown as Record<string, unknown[]>).dataLayer.push({
    event,
    ...params,
  });
}

/**
 * Send event to Yandex Metrica
 */
export function ymReachGoal(target: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;

  const w = window as unknown as Record<string, (...args: unknown[]) => void>;
  if (typeof w.ym === 'function') {
    const ymId = ANALYTICS_CONFIG.YM_ID;
    w.ym(ymId, 'reachGoal', target, params);
  }
}

/**
 * Track CTA button click across all analytics platforms
 */
export function trackCTAClick(event: CTAEvent) {
  // GTM dataLayer push
  pushToDataLayer('cta_click', {
    event_category: 'CTA',
    event_label: event.buttonName,
    event_location: event.buttonLocation,
    destination_url: event.destinationUrl,
  });

  // Yandex Metrica reachGoal
  ymReachGoal(`cta_${event.buttonName.replace(/\s+/g, '_').toLowerCase()}`, {
    location: event.buttonLocation,
    url: event.destinationUrl,
  });
}

/**
 * Handle CTA click: track + navigate
 */
export function handleCTAClick(event: CTAEvent) {
  trackCTAClick(event);
  // Navigation happens naturally via <a href> target="_blank"
}

/**
 * Generate GTM script tags (for use in layout)
 */
export function getGTMScriptTags(gtmId: string) {
  return {
    headScript: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
    bodyNoscript: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  };
}

/**
 * Generate Yandex Metrica script tag (for use in layout)
 */
export function getYandexMetricaScript(ymId: string, webvisor = true) {
  return `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${ymId}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:${webvisor},
  trackHash:true
});`;
}

/**
 * Generate Yandex Metrica noscript fallback
 */
export function getYandexMetricaNoscript(ymId: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
}
