"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Shield, BarChart3, Eye } from "lucide-react";
import { useCookieConsent, type ConsentState } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";

// Analytics IDs — replace with your actual IDs
const GTM_ID = "GTM-XXXXXXX";
const YM_ID = "111610907";

const COOKIE_CATEGORIES = [
  {
    key: "necessary" as const,
    label: "Необходимые куки",
    description: "Эти файлы cookie необходимы для работы сайта. Без них сайт не может функционировать правильно. Они не могут быть отключены.",
    examples: "Сессия, CSRF-защита, настройки интерфейса",
    icon: Shield,
    locked: true,
  },
  {
    key: "googleAnalytics" as const,
    label: "Google Analytics",
    description:
      'Сервис веб-аналитики от Google. Собирает данные о посещении страниц, источниках трафика и поведении пользователей для улучшения сайта. Данные обрабатываются в соответствии с <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-[#0076CE] underline underline-offset-2 hover:no-underline">Политикой конфиденциальности Google</a>.',
    examples: "_ga, _gid, _gat, данные о страницах и событиях",
    icon: BarChart3,
    locked: false,
  },
  {
    key: "yandexMetrica" as const,
    label: "Яндекс Метрика",
    description:
      'Сервис веб-аналитики от Яндекса. Собирает данные о поведении посетителей, включая запись сессий (Вебвизор) для анализа юзабилити. Данные обрабатываются в соответствии с <a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer" class="text-[#0076CE] underline underline-offset-2 hover:no-underline">Условиями использования Яндекса</a>.',
    examples: "_ym_uid, _ym_d, _ym_isad, данные Вебвизора",
    icon: Eye,
    locked: false,
  },
];

/* ─── Toggle Switch ─── */
function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-2 ${
        disabled
          ? "bg-gray-300 cursor-not-allowed opacity-70"
          : checked
            ? "bg-[#0076CE] cursor-pointer"
            : "bg-gray-300 cursor-pointer"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ${
          disabled
            ? "bg-gray-400 translate-x-5"
            : checked
              ? "bg-white translate-x-5"
              : "bg-white translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Settings Modal ─── */
function SettingsModalInner({
  initialConsent,
  onSave,
  onClose,
}: {
  initialConsent: ConsentState;
  onSave: (c: ConsentState) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<ConsentState>(initialConsent);

  const toggle = useCallback((key: keyof ConsentState, val: boolean) => {
    setLocal((prev) => ({ ...prev, [key]: val }));
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#0076CE]" />
              <h2 className="text-lg font-bold text-gray-900">Настройки файлов cookie</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Мы используем файлы cookie для улучшения работы сайта и анализа трафика.
              Вы можете выбрать, какие категории cookie разрешить. Необходимые cookie
              нельзя отключить — они обеспечивают базовую функциональность.
            </p>

            {COOKIE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isChecked = local[cat.key];
              return (
                <div
                  key={cat.key}
                  className={`rounded-xl border p-5 transition-colors ${
                    cat.locked
                      ? "bg-gray-50 border-gray-200"
                      : isChecked
                        ? "bg-blue-50/50 border-[#0076CE]/20"
                        : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          cat.locked
                            ? "bg-gray-200"
                            : "bg-[#0076CE]/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            cat.locked ? "text-gray-500" : "text-[#0076CE]"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900">
                            {cat.label}
                          </h3>
                          {cat.locked && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">
                              Всегда вкл.
                            </span>
                          )}
                        </div>
                        <p
                          className="text-sm text-gray-500 mt-1.5 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: cat.description }}
                        />
                        <p className="text-xs text-gray-400 mt-2">
                          <span className="font-medium">Файлы: </span>
                          {cat.examples}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <Toggle
                        checked={!!isChecked}
                        disabled={cat.locked}
                        onChange={(val) => toggle(cat.key, val)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => onSave(local)}
              >
                Сохранить выбранные
              </Button>
              <Button
                className="flex-1 bg-[#0076CE] hover:bg-[#004B87] text-white"
                onClick={() => {
                  const all: ConsentState = {
                    necessary: true,
                    googleAnalytics: true,
                    yandexMetrica: true,
                  };
                  onSave(all);
                }}
              >
                Принять все
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function SettingsModal({
  open,
  onClose,
  consent,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  consent: ConsentState;
  onSave: (c: ConsentState) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <SettingsModalInner
          key={open ? "open" : "closed"}
          initialConsent={consent}
          onSave={onSave}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── Banner ─── */
function ConsentBanner({
  onAcceptAll,
  onRejectAll,
  onOpenSettings,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/50 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900">
              Мы используем файлы cookie
            </h3>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
              Файлы cookie помогают нам улучшать работу сайта, анализировать трафик
              и персонализировать контент. Вы можете выбрать, какие cookie разрешить.
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenSettings();
                }}
                className="text-[#0076CE] font-medium hover:underline ml-1"
              >
                Подробнее
              </a>
            </p>
          </div>

          {/* Buttons — equal prominence, no dark patterns */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={onRejectAll}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Только необходимые
            </button>
            <button
              onClick={onOpenSettings}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Настроить
            </button>
            <button
              onClick={onAcceptAll}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#0076CE] text-white hover:bg-[#004B87] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all cursor-pointer whitespace-nowrap"
            >
              Принять все
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function CookieConsent() {
  const {
    consent,
    showBanner,
    showModal,
    setShowModal,
    acceptAll,
    rejectAll,
    saveSelected,
  } = useCookieConsent(GTM_ID, YM_ID);

  // Listen for "open-cookie-settings" event from footer
  useEffect(() => {
    const handler = () => setShowModal(true);
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, [setShowModal]);

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <ConsentBanner
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onOpenSettings={() => setShowModal(true)}
          />
        )}
      </AnimatePresence>

      <SettingsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        consent={consent}
        onSave={saveSelected}
      />
    </>
  );
}

/* ─── Re-export openSettings for footer link ─── */
export { useCookieConsent };
