"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  Building2,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Wrench,
} from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { trackCTAClick, type CTAEvent } from "@/lib/analytics";

const DELL_LINK = "https://www.dell.com/ru-ru";

/* ─── ANIMATION HELPERS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (target >= 1000) return `${Math.round(v / 1000)}K+`;
    if (suffix === "+") return `${Math.round(v)}+`;
    if (suffix === "B") return `$${(v / 1).toFixed(0)}B`;
    return `${Math.round(v)}`;
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, target, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─── CTA BUTTON ─── */
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
  variant?: "primary" | "secondary" | "outline";
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

  const base =
    "inline-flex items-center gap-2 font-semibold transition-all duration-300 rounded-xl text-sm sm:text-base cursor-pointer";

  const v = {
    primary: `${base} px-7 py-3.5 bg-gradient-to-r from-[#0076CE] to-[#005BA1] text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/50 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]`,
    secondary: `${base} px-7 py-3.5 bg-white text-[#0076CE] hover:bg-blue-50 border border-[#0076CE]/20 shadow-lg hover:shadow-xl hover:-translate-y-1`,
    outline: `${base} px-7 py-3.5 bg-transparent text-white border-2 border-white/30 hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5`,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${v[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/* ─── DELL LOGO ─── */
function DellLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-label="Dell Technologies" role="img">
      <text x="0" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="40" fill="currentColor">
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <a
          href={DELL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0076CE] hover:opacity-80 transition-opacity"
          aria-label="Dell Technologies"
        >
          <DellLogo className="h-8 w-auto" />
        </a>

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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
        >
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
        </motion.div>
      )}
    </header>
  );
}

/* ─────────── HERO ─────────── */
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden min-h-screen flex items-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1e38] to-[#071422]">
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,118,206,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,118,206,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 2 }}
        />
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0076CE]/15 rounded-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ filter: "blur(120px)" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00B4D8]/10 rounded-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
        style={{ filter: "blur(100px)" }}
      />
      {/* Moving accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0076CE]/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0076CE]/15 border border-[#0076CE]/25 text-[#4da8e8] text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" />
              Эра интеллектуальных технологий
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Мы не просто создаём{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0076CE] via-[#00A3E0] to-[#00B4D8]">
                технологии
              </span>
              .<br className="hidden sm:block" />
              Мы формируем{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#0076CE]">
                будущее
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-7 text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Ноутбуки XPS для тех, кто не идёт на компромиссы. Рабочие станции Precision для
              невообразимых задач. Серверы PowerEdge, на которых держится мир.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <CTAButton
                href={`${DELL_LINK}/shop/np/laptops`}
                location="hero"
                buttonName="catalog_hero"
                variant="primary"
                className="text-base px-9 py-4"
              >
                Открыть каталог
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton
                href={`${DELL_LINK}/business`}
                location="hero"
                buttonName="business_hero"
                variant="outline"
                className="text-base px-9 py-4"
              >
                Решения для бизнеса
              </CTAButton>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start text-sm text-gray-500">
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
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={scaleIn}
            custom={1}
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Primary ambient glow — wide soft light spill */}
              <motion.div
                className="absolute -inset-16 bg-[#0076CE]/20 rounded-full"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
                style={{ filter: "blur(80px)" }}
              />
              {/* Secondary glow — tight cyan accent around the screen */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-[#00B4D8]/40 via-[#0076CE]/25 to-transparent rounded-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
                style={{ filter: "blur(30px)" }}
              />
              <Image
                src="hero-dell.png"
                alt="Ноутбук Dell XPS — воплощение инноваций"
                width={700}
                height={400}
                priority
                className="relative rounded-2xl shadow-2xl shadow-cyan-500/15 w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
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
      "OLED-дисплей InfinityEdge, Intel Core Ultra, тоньше карандаша — для тех, кто видит мир шире.",
    href: `${DELL_LINK}/shop/np/xps-laptops`,
    badge: "Флагман",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Wrench,
    title: "Precision",
    subtitle: "Рабочие станции",
    description:
      "До 128 ГБ памяти, NVIDIA RTX Ada Generation, сертификация ISV. Инструмент для невозможных задач.",
    href: `${DELL_LINK}/en-us/shop/workstations/precision-mobile-workstations`,
    badge: "Pro",
    gradient: "from-slate-600 to-slate-400",
  },
  {
    icon: Building2,
    title: "Latitude",
    subtitle: "Бизнес-ноутбуки",
    description:
      "22 часа без подзарядки, TPM 2.0, удалённое управление. Броня для корпоративных данных.",
    href: `${DELL_LINK}/shop/np/latitude-laptops`,
    badge: "Enterprise",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Server,
    title: "PowerEdge",
    subtitle: "Серверы нового поколения",
    description:
      "AI-ускорители, масштабируемость до тысячи узлов. Инфраструктура, на которой держится прогресс.",
    href: `${DELL_LINK}/en-us/shop/server-networking/poweredge`,
    badge: "Data Center",
    gradient: "from-orange-500 to-amber-400",
  },
];

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-[#0076CE] uppercase tracking-widest mb-3">
            Линейка продуктов
          </motion.p>
          <motion.h2
            id="products-heading"
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Технологии, достойные ваших амбиций
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            От ультратонких ноутбуков до серверных ферм — Dell создаёт инструменты, которые
            превращают смелые идеи в реальность.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <AnimatedSection key={product.title}>
                <motion.a
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
                  variants={fadeUp}
                  custom={i}
                  className="group relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer block"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.gradient} mb-5 shadow-lg`}
                  >
                    {product.badge}
                  </span>

                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                  <p className="text-sm font-semibold text-[#0076CE] mt-1">{product.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">{product.description}</p>

                  <div className="flex items-center gap-1 mt-5 text-sm font-semibold text-[#0076CE] group-hover:gap-2.5 transition-all duration-300">
                    Подробнее
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.a>
              </AnimatedSection>
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
    { value: 40000, label: "лет опыта", display: "40+" },
    { value: 180, label: "стран присутствия", display: "180+" },
    { value: 120000, label: "сотрудников по всему миру", display: "120K+" },
    { value: 92, label: "млрд $ выручки в 2024", display: "$92B" },
  ];

  return (
    <section className="relative py-20 overflow-hidden" aria-label="Статистика Dell">
      <div className="absolute inset-0 bg-gradient-to-r from-[#004B87] via-[#0076CE] to-[#005BA1]" />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label}>
              <motion.div variants={fadeUp} custom={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {stat.display}
                </div>
                <div className="text-sm text-blue-100/80 mt-2 font-medium">{stat.label}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── WHY DELL ─────────── */
const features = [
  {
    icon: Cpu,
    title: "Инновации без границ",
    description:
      "$3 млрд ежегодно в R&D. AI-чипы нового поколения, дисплеи, опережающие время. Dell не следует трендам — он их создаёт.",
  },
  {
    icon: Headphones,
    title: "ProSupport 24/7",
    description:
      "Персональный инженер на связи круглосуточно. 93% проблем решаются при первом обращении. Ваш бизнес не ждёт — и мы тоже.",
  },
  {
    icon: Leaf,
    title: "Ответственность перед планетой",
    description:
      "55% упаковки из переработанных материалов. Цель — 100% возобновляемая энергия к 2030 году. Технологии, которые берегут мир.",
  },
  {
    icon: Shield,
    title: "Защита корпоративного уровня",
    description:
      "Аппаратное шифрование, биометрия, удалённое стирание. Ваши данные под охраной 24/7 — без исключений.",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 sm:py-32 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-[#0076CE] uppercase tracking-widest mb-3">
            Преимущества
          </motion.p>
          <motion.h2
            id="features-heading"
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Почему мир доверяет Dell
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Не просто производитель — стратегический партнёр. Более 40 лет мы строим технологии,
            которые определяют завтрашний день.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title}>
                <motion.div variants={scaleIn} custom={i} className="text-center group">
                  <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mx-auto mb-6 group-hover:from-[#0076CE] group-hover:to-[#005BA1] transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-600/20 p-4">
                    <Icon className="w-10 h-10 text-[#0076CE] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA SECTION ─────────── */
function CTASection() {
  return (
    <section
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Cinematic gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030a14] via-[#0a1e38] to-[#0d2847]" />

      {/* Animated orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#0076CE]/20 rounded-full"
        style={{ filter: "blur(120px)" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8 }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#00B4D8]/15 rounded-full"
        style={{ filter: "blur(100px)" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.3 }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-[#4da8e8] uppercase tracking-widest mb-4">
            Начните сегодня
          </motion.p>

          <motion.h2
            id="cta-heading"
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Мир не ждёт.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0076CE] to-[#00B4D8]">
              Ваш следующий шаг — сейчас.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} custom={2} className="mt-7 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Найдите решение, которое ускорит ваш рост: от ультрапортативного ноутбука для
            командировок до серверной инфраструктуры для глобальной компании.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <CTAButton
              href={`${DELL_LINK}/shop/np/laptops`}
              location="cta_section"
              buttonName="shop_laptops_cta"
              variant="primary"
              className="text-base px-9 py-4"
            >
              <Monitor className="w-5 h-5" />
              Ноутбуки и ПК
              <ArrowRight className="w-5 h-5" />
            </CTAButton>

            <CTAButton
              href={`${DELL_LINK}/en-us/shop/workstations/precision-mobile-workstations`}
              location="cta_section"
              buttonName="shop_workstations_cta"
              variant="secondary"
              className="text-base px-9 py-4"
            >
              <Wrench className="w-5 h-5" />
              Рабочие станции
              <ArrowRight className="w-5 h-5" />
            </CTAButton>

            <CTAButton
              href={`${DELL_LINK}/business`}
              location="cta_section"
              buttonName="business_solutions_cta"
              variant="secondary"
              className="text-base px-9 py-4"
            >
              <Building2 className="w-5 h-5" />
              Для бизнеса
              <ArrowRight className="w-5 h-5" />
            </CTAButton>
          </motion.div>

          <motion.p variants={fadeUp} custom={4} className="mt-10 text-sm text-gray-500">
            Бесплатная доставка • Возврат в течение 30 дней • Гарантия производителя
          </motion.p>
        </motion.div>
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
        { label: "Precision", href: `${DELL_LINK}/en-us/shop/workstations/precision-mobile-workstations` },
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
    <footer className="bg-[#0a0a0a] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={DELL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#0076CE] hover:opacity-80 transition-opacity"
            >
              <DellLogo className="h-7 w-auto" />
            </a>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              Dell Technologies — мировой лидер в области ИТ-инфраструктуры, облачных решений и
              вычислительных систем, определяющий облик цифровой эпохи.
            </p>
          </div>

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
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Dell Technologies. Все права защищены. Данный сайт является
            информационным и не является официальным ресурсом Dell Inc.
          </p>
          <div className="flex gap-6 text-xs text-gray-600 items-center">
            <a href={`${DELL_LINK}/en-us/privacy`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href={`${DELL_LINK}/en-us/legal`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Условия
            </a>
            <button
              type="button"
              onClick={() => {
                // Dispatch custom event to open cookie settings
                window.dispatchEvent(new CustomEvent("open-cookie-settings"));
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Настройки куки
            </button>
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
