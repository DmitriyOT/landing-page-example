"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface ConsentState {
  necessary: true; // always true, cannot be disabled
  googleAnalytics: boolean;
  yandexMetrica: boolean;
}

const STORAGE_KEY = "dell_cookie_consent";
const CONSENT_VERSION = 1;

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  googleAnalytics: false,
  yandexMetrica: false,
};

type ConsentListener = (consent: ConsentState) => void;
const listeners = new Set<ConsentListener>();

function notifyListeners(consent: ConsentState) {
  listeners.forEach((fn) => fn(consent));
}

export function onConsentChange(fn: ConsentListener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Reset if version changed
    if (parsed._v !== CONSENT_VERSION) return null;
    const { _v, ...rest } = parsed;
    return rest as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...consent, _v: CONSENT_VERSION }),
  );
}

/* ─── Script Injection ─── */
const injectedScripts = new Set<string>();

function injectGTM(gtmId: string) {
  if (injectedScripts.has("gtm")) return;
  injectedScripts.add("gtm");

  const w = window as unknown as Record<string, unknown[]>;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(s);

  // noscript iframe fallback
  const ns = document.createElement("noscript");
  ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.appendChild(ns);
}

function injectYandexMetrica(ymId: string, webvisor: boolean) {
  if (injectedScripts.has("ym")) return;
  injectedScripts.add("ym");

  const s = document.createElement("script");
  s.async = true;
  s.innerHTML = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${ymId}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:${webvisor},
  trackHash:true
});
`;
  document.head.appendChild(s);

  // noscript fallback
  const ns = document.createElement("noscript");
  ns.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute;left:-9999px;" alt=""/></div>`;
  document.body.appendChild(ns);
}

function removeAnalyticsScripts() {
  // Remove GTM scripts
  document.querySelectorAll('script[src*="googletagmanager"]').forEach((el) => el.remove());
  document.querySelectorAll('iframe[src*="googletagmanager"]').forEach((el) => el.remove());
  // Remove YM scripts
  document.querySelectorAll('script[src*="yandex"][src*="metrika"]').forEach((el) => el.remove());
  document.querySelectorAll('img[src*="mc.yandex"]').forEach((el) => el.remove());
  // Reset flags so they can be re-injected if consent is re-given
  injectedScripts.delete("gtm");
  injectedScripts.delete("ym");
}

function applyConsent(consent: ConsentState, gtmId: string, ymId: string) {
  // Always clean up first
  removeAnalyticsScripts();

  if (consent.googleAnalytics && gtmId) {
    injectGTM(gtmId);
  }
  if (consent.yandexMetrica && ymId) {
    injectYandexMetrica(ymId, true);
  }
}

/* ─── Hook ─── */
export function useCookieConsent(gtmId: string, ymId: string) {
  // SSR-safe: start with defaults, sync from localStorage after hydration
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Post-hydration: sync from localStorage (browser-only external store).
  useEffect(() => {
    const saved = loadConsent();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved);
      applyConsent(saved, gtmId, ymId);
    } else {
      setShowBanner(true);
    }
  }, []);

  const save = useCallback(
    (newConsent: ConsentState) => {
      setConsent(newConsent);
      saveConsent(newConsent);
      applyConsent(newConsent, gtmId, ymId);
      notifyListeners(newConsent);
    },
    [gtmId, ymId],
  );

  const acceptAll = useCallback(() => {
    const full: ConsentState = {
      necessary: true,
      googleAnalytics: true,
      yandexMetrica: true,
    };
    save(full);
    setShowBanner(false);
    setShowModal(false);
  }, [save]);

  const rejectAll = useCallback(() => {
    save(DEFAULT_CONSENT);
    setShowBanner(false);
    setShowModal(false);
  }, [save]);

  const saveSelected = useCallback(
    (selected: ConsentState) => {
      save(selected);
      setShowBanner(false);
    setShowModal(false);
    },
    [save],
  );

  const openSettings = useCallback(() => {
    setShowModal(true);
  }, []);

  return {
    consent,
    showBanner,
    showModal,
    setShowModal,
    acceptAll,
    rejectAll,
    saveSelected,
    openSettings,
  };
}
