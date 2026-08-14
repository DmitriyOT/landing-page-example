"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Monitor,
  Server,
  Shield,
  Leaf,
  Headphones,
  Cpu,
  ChevronRight,
  Menu,
  X,
  Laptop,
  Gamepad2,
  Building2,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick, type CTAEvent } from "@/lib/analytics";

const DELL_BLUE = "#0076CE";
const DELL_DARK = "#1D1D1D";
const DELL_BLUE_DARK = "#004B87";
const DELL_LINK = "https://www.dell.com/ru-ru";

function CTAButton({
  href,
  children,
  variant = "primary",
  location,
  buttonName,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  location: string;
  buttonName: string;
  className?: string;
}) {
  const handleClick = useCallback(() => {
    trackCTAClick({
      buttonName,
      buttonLocation: location,
      destinationUrl: href,
    });
  }, [buttonName, location, href]);

  const baseClasses =
    "inline-flex items-center gap-2 font-semibold transition-all duration-200 rounded-lg text-sm sm:text-base cursor-pointer";

  const variants = {
    primary: `${baseClasses} px-6 py-3 bg-[#0076CE] text-white hover:bg-[#004B87] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5`,
    secondary: `${baseClasses} px-6 py-3 bg-white text-[#0076CE] hover:bg-blue-50 border border-[#0076CE]/20 shadow-md hover:shadow-lg hover:-translate-y-0.5`,
    outline: `${baseClasses} px-6 py-3 bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10`,
    ghost: `${baseClasses} px-4 py-2 bg-transparent text-[#0076CE] hover:bg-blue-50`,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

function DellLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      aria-label="Dell Technologies"
      role="img"
    >
      <text
        x="0"
        y="34"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="40"
        fill="currentColor"
      >
        DELL
      </text>
    </svg>
  );
}

/* ─────────── NAVIGATION ─────────── */
function Navigation() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Ноутбуки", href: `${DELL_LINK}/shop/np/laptops` },
    { label: "Решения", href: `${DELL_LINK}/solutions` },
    { label: "Сервис", href: `${DELL_LINK}/support/home` },
    { label: "Для бизнеса", href: `${DELL_LINK}/business` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href={DELL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0076CE] hover:opacity-80 transition-opacity"
          aria-label="Dell Technologies — Главная"
        >
          <DellLogo className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-[#0076CE] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <CTAButton
            href={`${DELL_LINK}/shop`}
            location="navigation"
            buttonName="buy_now_nav"
            variant="primary"
            className="text-sm"
          >
            Купить
          </CTAButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#0076CE] py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <CTAButton
              href={`${DELL_LINK}/shop`}
              location="navigation_mobile"
              buttonName="buy_now_nav_mobile"
              variant="primary"
              className="w-full justify-center mt-2"
            >
              Купить
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────── HERO ─────────── */
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#0a1628] min-h-[90vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #0076CE 1px, transparent 1px), radial-gradient(circle at 75% 75%, #0076CE 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#0076CE]/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0076CE]/20 border border-[#0076CE]/30 text-[#0076CE] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Новые модели 2025 уже в продаже
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Технологии, которые{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0076CE] to-[#00B4D8]">
                двигают мир
              </span>{" "}
              вперёд
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Ноутбуки XPS, игровые системы Alienware, бизнес-решения Latitude и серверы
              PowerEdge — всё для работы, творчества и бизнеса.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <CTAButton
                href={`${DELL_LINK}/shop/np/laptops`}
                location="hero"
                buttonName="catalog_hero"
                variant="primary"
                className="text-base px-8 py-3.5"
              >
                Каталог ноутбуков
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton
                href={`${DELL_LINK}/business`}
                location="hero"
                buttonName="business_hero"
                variant="outline"
                className="text-base px-8 py-3.5"
              >
                Решения для бизнеса
              </CTAButton>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0076CE]" />
                Гарантия до 5 лет
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#0076CE]" />
                4.8 / 5.0 рейтинг
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#0076CE]" />
                24/7 поддержка
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#0076CE]/30 to-[#00B4D8]/30 rounded-2xl blur-2xl" />
              <Image
                src="/hero-dell.png"
                alt="Ноутбук Dell XPS — тонкий, мощный, стильный"
                width={700}
                height={400}
                priority
                className="relative rounded-xl shadow-2xl w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── PRODUCT CATEGORIES ─────────── */
const products = [
  {
    icon: Laptop,
    title: "XPS Series",
    subtitle: "Премиальные ноутбуки",
    description:
      "Ультратонкие дисплеи InfinityEdge, процессоры Intel Core Ultra, потрясающий OLED-экран. Идеальны для творчества и работы.",
    href: `${DELL_LINK}/shop/np/xps-laptops`,
    badge: "Хит продаж",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Gamepad2,
    title: "Alienware",
    subtitle: "Игровые системы",
    description:
      "Мощнейшие GPU NVIDIA RTX, дисплеи до 480 Гц, продвинутое охлаждение. Создано для побед.",
    href: `${DELL_LINK}/en-us/shop/gaming-laptops/alienware-laptops`,
    badge: "Топ gamers",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    icon: Building2,
    title: "Latitude",
    subtitle: "Бизнес-ноутбуки",
    description:
      "Безопасность корпоративного уровня, автономность до 22 часов, управление через Dell Technologies Unified Workspace.",
    href: `${DELL_LINK}/shop/np/latitude-laptops`,
    badge: "Для бизнеса",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Server,
    title: "PowerEdge",
    subtitle: "Серверы и ИТ-инфраструктура",
    description:
      "Высокопроизводительные серверы для ЦОД, AI-ускорители, масштабируемые решения для любого бизнеса.",
    href: `${DELL_LINK}/en-us/shop/server-networking/poweredge`,
    badge: "Enterprise",
    gradient: "from-orange-500 to-amber-400",
  },
];

function ProductsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="products-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          >
            Продукты для любых задач
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            От ультратонких ноутбуков до мощных серверов — Dell создаёт технологии, которые
            соответствуют вашим амбициям.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <a
                key={product.title}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick({
                    buttonName: `product_${product.title.toLowerCase()}`,
                    buttonLocation: "products_section",
                    destinationUrl: product.href,
                  })
                }
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${product.gradient} mb-4`}
                >
                  {product.badge}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                <p className="text-sm font-medium text-[#0076CE] mt-1">{product.subtitle}</p>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-[#0076CE] group-hover:gap-2 transition-all">
                  Подробнее
                  <ChevronRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── WHY DELL ─────────── */
const features = [
  {
    icon: Cpu,
    title: "Инновации в каждом продукте",
    description:
      "Технологии AI, процессоры последнего поколения, передовые дисплеи. Dell инвестирует $3 млрд ежегодно в R&D.",
  },
  {
    icon: Headphones,
    title: "ProSupport 24/7",
    description:
      "Персональный инженер на связи круглосуточно. Решение 93% проблем при первом обращении.",
  },
  {
    icon: Leaf,
    title: "Экологичность",
    description:
      "55% упаковки из переработанных материалов. Цель — 100% возобновляемая энергия к 2030 году.",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description:
      "Шифрование на аппаратном уровне, биометрия, удалённое стирание. Защита корпоративного класса.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          >
            Почему выбирают Dell
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Более 40 лет опыта, 180+ стран присутствия и доверие миллионов клиентов по всему миру.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0076CE] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#0076CE] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── STATS BAR ─────────── */
function StatsSection() {
  const stats = [
    { value: "40+", label: "лет на рынке" },
    { value: "180+", label: "стран присутствия" },
    { value: "120K+", label: "сотрудников" },
    { value: "$92B", label: "выручка в 2024" },
  ];

  return (
    <section className="py-16 bg-[#0076CE]" aria-label="Статистика Dell">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-blue-100 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA SECTION ─────────── */
function CTASection() {
  return (
    <section
      className="relative py-20 sm:py-28 bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#1a3a5c] overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0076CE]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00B4D8]/15 rounded-full blur-[80px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
        >
          Готовы сделать шаг в будущее?
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Найдите идеальное решение для себя: от ультрапортативного ноутбука для путешествий до
          мощной рабочей станции для профессионалов.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <CTAButton
            href={`${DELL_LINK}/shop/np/laptops`}
            location="cta_section"
            buttonName="shop_laptops_cta"
            variant="primary"
            className="text-base px-8 py-4"
          >
            <Monitor className="w-5 h-5" />
            Ноутбуки и ПК
            <ArrowRight className="w-5 h-5" />
          </CTAButton>

          <CTAButton
            href={`${DELL_LINK}/en-us/shop/gaming-laptops/alienware-laptops`}
            location="cta_section"
            buttonName="shop_gaming_cta"
            variant="secondary"
            className="text-base px-8 py-4"
          >
            <Gamepad2 className="w-5 h-5" />
            Игровые системы
            <ArrowRight className="w-5 h-5" />
          </CTAButton>

          <CTAButton
            href={`${DELL_LINK}/business`}
            location="cta_section"
            buttonName="business_solutions_cta"
            variant="secondary"
            className="text-base px-8 py-4"
          >
            <Building2 className="w-5 h-5" />
            Для бизнеса
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Бесплатная доставка • Возврат в течение 30 дней • Гарантия производителя
        </p>
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  const footerLinks = [
    {
      title: "Продукты",
      links: [
        { label: "XPS", href: `${DELL_LINK}/shop/np/xps-laptops` },
        { label: "Alienware", href: `${DELL_LINK}/en-us/shop/gaming-laptops/alienware-laptops` },
        { label: "Latitude", href: `${DELL_LINK}/shop/np/latitude-laptops` },
        { label: "Мониторы", href: `${DELL_LINK}/shop/np/monitors` },
        { label: "Аксессуары", href: `${DELL_LINK}/shop/np/accessories` },
      ],
    },
    {
      title: "Решения",
      links: [
        { label: "Для бизнеса", href: `${DELL_LINK}/business` },
        { label: "Для образования", href: `${DELL_LINK}/education` },
        { label: "ИТ-инфраструктура", href: `${DELL_LINK}/en-us/solutions/infrastructure-solutions` },
        { label: "Кибербезопасность", href: `${DELL_LINK}/en-us/solutions/cybersecurity-solutions` },
        { label: "AI и ML", href: `${DELL_LINK}/en-us/solutions/artificial-intelligence-solutions` },
      ],
    },
    {
      title: "Поддержка",
      links: [
        { label: "Сервисный центр", href: `${DELL_LINK}/support/home` },
        { label: "Драйверы", href: `${DELL_LINK}/support/home/drivers` },
        { label: "Гарантия", href: `${DELL_LINK}/support/services/warranty` },
        { label: "Статус заказа", href: `${DELL_LINK}/support/orders` },
        { label: "Контакты", href: `${DELL_LINK}/contact-us` },
      ],
    },
  ];

  return (
    <footer className="bg-[#1D1D1D] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={DELL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#0076CE] hover:opacity-80 transition-opacity"
            >
              <DellLogo className="h-7 w-auto" />
            </a>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              Dell Technologies — мировой лидер в области ИТ-инфраструктуры, облачных решений и
              персональных компьютеров.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Dell Technologies. Все права защищены. Данный сайт является
            информационным и не является официальным ресурсом Dell Inc.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a
              href={`${DELL_LINK}/en-us/privacy`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Конфиденциальность
            </a>
            <a
              href={`${DELL_LINK}/en-us/legal`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── PAGE ─────────── */
export default function DellLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
