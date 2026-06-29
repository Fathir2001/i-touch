import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Tag,
  Trophy,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import OfferBanner from "../components/OfferBanner";
import { fetchActiveOffers, fetchFeaturedProducts } from "../services/resources";
import { featuredCategories, whyChooseUs } from "../data/staticData";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const introItems = [
  {
    label: "Sports",
    icon: Trophy,
    color: "text-itouch-orange",
    stroke: "#ff6a1a",
    startX: -620,
    startY: -280,
    endX: -430,
    endY: -170,
    path: "M 150 120 C 315 170 420 250 640 310",
  },
  {
    label: "Gaming",
    icon: Gamepad2,
    color: "text-itouch-green",
    stroke: "#39ff8a",
    startX: 620,
    startY: -260,
    endX: 430,
    endY: -170,
    path: "M 1130 120 C 950 165 850 245 640 310",
  },
  {
    label: "Mobile",
    icon: Smartphone,
    color: "text-itouch-blue",
    stroke: "#00c2ff",
    startX: -600,
    startY: 290,
    endX: -430,
    endY: 185,
    path: "M 155 505 C 330 455 425 375 640 310",
  },
  {
    label: "Offers",
    icon: Tag,
    color: "text-itouch-orange",
    stroke: "#ff6a1a",
    startX: 600,
    startY: 280,
    endX: 430,
    endY: 185,
    path: "M 1130 505 C 950 455 850 375 640 310",
  },
];

const HomeIntro = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.55, ease: "easeInOut" }}
    className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-itouch-bg"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,106,26,0.14),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(57,255,138,0.12),transparent_24%),radial-gradient(circle_at_18%_82%,rgba(0,194,255,0.13),transparent_25%),radial-gradient(circle_at_82%_80%,rgba(255,106,26,0.1),transparent_24%),linear-gradient(135deg,#0a0a0f_0%,#111119_52%,#07070b_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />

    {[...Array(36)].map((_, index) => {
      const angle = (index / 36) * Math.PI * 2;
      const startRadius = index % 2 === 0 ? 760 : 560;
      const endRadius = index % 4 === 0 ? 360 : index % 4 === 1 ? 270 : index % 4 === 2 ? 430 : 210;
      return (
      <motion.span
        key={index}
        initial={{
          opacity: 0,
          x: Math.cos(angle) * startRadius,
          y: Math.sin(angle) * startRadius * 0.58,
          rotate: index * 16,
        }}
        animate={{
          opacity: [0, 0.85, 0.95, 0.22],
          x: [Math.cos(angle) * startRadius, 0, Math.cos(angle) * endRadius],
          y: [Math.sin(angle) * startRadius * 0.58, 0, Math.sin(angle) * endRadius * 0.55],
          rotate: [index * 16, 360, 540],
        }}
        transition={{
          duration: 3.8,
          delay: index * 0.018,
          ease: "easeInOut",
        }}
        className={`absolute h-1 rounded-full ${
          index % 3 === 0
            ? "w-36 bg-itouch-orange"
            : index % 3 === 1
              ? "w-32 bg-itouch-blue"
              : "w-28 bg-itouch-green"
        } blur-[1px]`}
      />
      );
    })}

    <div className="relative h-[min(78vh,620px)] w-full max-w-7xl">
      <svg
        aria-hidden="true"
        viewBox="0 0 1280 620"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {introItems.map(({ label, path, stroke }, index) => (
          <motion.path
            key={label}
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0.35], opacity: [0, 0.55, 0.35, 0] }}
            transition={{ duration: 3.4, delay: 0.25 + index * 0.1, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
          />
        ))}
      </svg>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.35 }}
        animate={{ opacity: [0, 0.75, 0], scale: [0.35, 1.65, 2.45] }}
        transition={{ duration: 1.35, delay: 2.85, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-itouch-orange/50 shadow-glow"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.45 }}
        animate={{ opacity: [0, 0.55, 0], scale: [0.45, 1.4, 2.05] }}
        transition={{ duration: 1.2, delay: 3.05, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-itouch-blue/50 shadow-glow-blue"
      />

      {introItems.map(({ label, icon: Icon, color, startX, startY, endX, endY }, index) => (
        <div key={label} className="absolute inset-0 grid place-items-center">
          <motion.div
            initial={{ opacity: 0, x: startX, y: startY, scale: 0.92 }}
            animate={{
              opacity: [0, 1, 1, 1],
              x: [startX, startX * 0.32, 0, endX],
              y: [startY, startY * 0.32, 0, endY],
              scale: [0.92, 1.22, 1.05, 1.14],
            }}
            transition={{ duration: 4.05, delay: index * 0.08, ease: "easeInOut" }}
            className="flex min-w-[140px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-5 py-4 shadow-2xl backdrop-blur"
          >
            <Icon className={color} size={28} />
            <span className="font-display text-base font-bold">{label}</span>
          </motion.div>
        </div>
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.72, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: [0.72, 1.08, 1], filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.95, ease: "easeOut" }}
          className="w-[min(78vw,540px)] text-center"
        >
          <div className="mx-auto mb-5 h-px w-40 bg-gradient-to-r from-transparent via-itouch-orange to-transparent" />
          <p className="text-base font-extrabold uppercase tracking-[0.36em] text-itouch-orange sm:text-xl">
            Welcome to
          </p>
          <h2 className="mt-3 flex items-baseline justify-center gap-1 font-display text-6xl font-extrabold leading-tight sm:text-8xl">
            {[
              { text: "i", className: "text-itouch-white" },
              { text: "-", className: "text-itouch-white" },
              { text: "T", className: "text-itouch-orange" },
              { text: "o", className: "text-itouch-white/65" },
              { text: "u", className: "text-itouch-blue" },
              { text: "c", className: "text-cyan-400" },
              { text: "h", className: "text-itouch-green" },
            ].map((letter, index) => (
              <motion.span
                key={`${letter.text}-${index}`}
                initial={{ opacity: 0, y: 34, rotateX: -70, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 2.05 + index * 0.08, ease: "easeOut" }}
                className={letter.className}
              >
                {letter.text}
              </motion.span>
            ))}
          </h2>
          <p className="mt-4 text-sm font-semibold text-itouch-white/65">
            Sports, gaming and mobile in one place
          </p>
          <div className="mx-auto mt-7 flex h-1 max-w-xs overflow-hidden rounded-full bg-white/10">
            {["bg-itouch-orange", "bg-itouch-green", "bg-itouch-blue", "bg-itouch-orange"].map((className, index) => (
              <motion.span
                key={`${className}-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 3.05 + index * 0.22, ease: "easeInOut" }}
                className={`h-full flex-1 origin-left ${className}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const BrandIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState("playing");
  const [navbarTarget, setNavbarTarget] = useState({ x: 0, y: 0 });
  const timersRef = useRef([]);

  useEffect(
    () => {
      timersRef.current.push(window.setTimeout(onComplete, 15000));

      return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      };
    },
    [onComplete],
  );

  const finishIntro = () => {
    setPhase("reveal");
    timersRef.current.push(
      window.setTimeout(() => {
        const navbarLogo = document.getElementById("navbar-brand-logo");
        const bounds = navbarLogo?.getBoundingClientRect();

        if (bounds) {
          setNavbarTarget({
            x: bounds.left + bounds.width / 2 - window.innerWidth / 2,
            y: bounds.top + bounds.height / 2 - window.innerHeight / 2,
          });
        }

        setPhase("closing");
      }, 1400),
      window.setTimeout(onComplete, 2350),
    );
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[999] overflow-hidden bg-[#161a1f]"
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/media/i-touch-logo.png"
        onEnded={finishIntro}
        onError={onComplete}
        aria-label="Animated i-Touch logo"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/i-touch-logo-intro.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(10,10,15,0.48)_100%)]" />

      <button
        type="button"
        onClick={onComplete}
        className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur transition hover:border-itouch-green/50 hover:text-itouch-green"
      >
        Skip intro
      </button>

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.img
          src="/media/i-touch-logo.png"
          alt="i-Touch"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={
            phase === "playing"
              ? { opacity: 0, scale: 0.94, x: 0, y: 0 }
              : phase === "reveal"
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : {
                    opacity: 0.9,
                    scale: 0.075,
                    x: navbarTarget.x,
                    y: navbarTarget.y,
                  }
          }
          transition={{ duration: phase === "closing" ? 0.85 : 0.35, ease: "easeInOut" }}
          className="max-h-[68vh] w-auto max-w-[72vw] rounded-[2rem] shadow-2xl shadow-black/40"
        />
      </div>

      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-4 bottom-8 flex flex-wrap justify-center gap-3 sm:bottom-12"
          >
            {introItems.map(({ label, icon: Icon, color }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.7, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 220 }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2.5 shadow-xl backdrop-blur"
              >
                <Icon className={color} size={18} />
                <span className="font-display text-sm font-bold">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionHeading = ({ eyebrow, title, subtitle, link, linkLabel }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-itouch-white/60">{subtitle}</p>}
    </div>
    {link && (
      <Link
        to={link}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-itouch-white/80 transition hover:border-itouch-orange hover:text-itouch-orange"
      >
        {linkLabel} <ArrowRight size={16} />
      </Link>
    )}
  </div>
);

const quickLinks = [
  { label: "Sports Items", to: "/sports", icon: Trophy, color: "text-itouch-orange" },
  { label: "PS5 Gaming", to: "/gaming", icon: Gamepad2, color: "text-itouch-green" },
  { label: "Mobile Accessories", to: "/mobile", icon: Smartphone, color: "text-itouch-blue" },
  { label: "Latest Offers", to: "/offers", icon: Tag, color: "text-itouch-orange" },
];

const gamingPackages = [
  { title: "Quick Match", time: "30 min", text: "Fast FIFA, racing or shooting session." },
  { title: "Full Session", time: "1 hour", text: "Best pick for friends and multiplayer games." },
  { title: "Group Play", time: "Custom", text: "Plan longer sessions and group bookings." },
];

const shouldShowBrandIntro = () => {
  const navigation = window.performance.getEntriesByType("navigation")[0];
  const isPageRefresh = navigation?.type === "reload";

  return isPageRefresh || window.sessionStorage.getItem("itouch-brand-intro-seen") !== "true";
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [showIntro, setShowIntro] = useState(shouldShowBrandIntro);

  useEffect(() => {
    fetchFeaturedProducts()
      .then(({ data }) => setFeatured(data))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false));

    fetchActiveOffers()
      .then(({ data }) => setOffers(data.slice(0, 3)))
      .catch(() => setOffers([]));
  }, []);

  useEffect(() => {
    if (!showIntro) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showIntro]);

  const completeBrandIntro = () => {
    window.sessionStorage.setItem("itouch-brand-intro-seen", "true");
    setShowIntro(false);
  };

  return (
    <div className="relative overflow-hidden bg-itouch-bg">
      <AnimatePresence>
        {showIntro && <BrandIntro onComplete={completeBrandIntro} />}
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_28%,rgba(255,106,26,0.11),transparent_28%),radial-gradient(circle_at_88%_45%,rgba(0,194,255,0.1),transparent_30%),radial-gradient(circle_at_45%_80%,rgba(57,255,138,0.08),transparent_26%)]" />
      <div id="home-hero">
        <HeroSection />
      </div>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 lg:px-8"
      >
        <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-3 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ label, to, icon: Icon, color }) => (
            <Link
              key={label}
              to={to}
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-itouch-surface-2 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-itouch-orange via-itouch-blue to-itouch-green opacity-0 transition group-hover:opacity-100" />
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-black/30 transition group-hover:scale-110">
                  <Icon className={color} size={22} />
                </span>
                <span className="font-display text-sm font-bold">{label}</span>
              </span>
              <ArrowRight className="text-itouch-white/30 transition group-hover:text-itouch-white" size={16} />
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Shop by category"
          title="Everything customers visit i-Touch for"
          subtitle="Move quickly between sports gear, sportswear, PS5 gaming sessions, phones and accessories."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 border-y border-white/5 bg-itouch-surface/55 py-20 backdrop-blur"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Featured products"
            title="Popular picks from the shop"
            subtitle="A quick look at highlighted products. Customers can open details or order directly through WhatsApp."
            link="/products"
            linkLabel="View all products"
          />
          <ProductGrid products={featured} loading={loadingFeatured} />
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8"
      >
        <div className="group grid gap-8 overflow-hidden rounded-[1.75rem] border border-itouch-green/20 bg-itouch-surface/90 shadow-2xl shadow-itouch-green/5 backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[320px]">
            <img
              src="/media/ps5-controller-frames/09.png"
              alt="PlayStation 5 DualSense controller"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute right-5 top-5 flex gap-2" aria-hidden="true">
              {["△", "○", "×", "□"].map((symbol) => (
                <span
                  key={symbol}
                  className="grid h-8 w-8 place-items-center rounded-full border border-itouch-blue/30 bg-black/45 font-display text-xs text-itouch-blue backdrop-blur"
                >
                  {symbol}
                </span>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-itouch-green">
                PS5 Gaming Zone
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Book your next session</h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="max-w-2xl text-sm leading-7 text-itouch-white/65">
              Make the gaming section feel like a real destination: racing, multiplayer, shooting
              games and group sessions, all with fast WhatsApp booking.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {gamingPackages.map((pkg) => (
                <motion.div
                  key={pkg.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-green/40 hover:shadow-glow-green"
                >
                  <p className="font-display text-xl font-bold text-itouch-green">{pkg.time}</p>
                  <h3 className="mt-2 font-display font-bold">{pkg.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-itouch-white/55">{pkg.text}</p>
                </motion.div>
              ))}
            </div>
            <Link
              to="/gaming"
              className="shine-button mt-7 inline-flex items-center gap-2 rounded-xl bg-itouch-green px-5 py-3 font-display font-bold text-black transition hover:-translate-y-1 hover:shadow-glow-green"
            >
              Book PS5 Session <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 border-y border-white/5 bg-itouch-surface/55 py-20 backdrop-blur"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Latest deals"
            title="Offers worth checking before you order"
            subtitle="Show active promotions here so visitors have a reason to explore deeper."
            link="/offers"
            linkLabel="View offers"
          />
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <OfferBanner key={offer._id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-itouch-bg p-8 text-center">
              <ShoppingBag className="mx-auto text-itouch-orange" size={34} />
              <h3 className="mt-4 font-display text-xl font-bold">No active offers yet</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-itouch-white/60">
                Add offers from the admin panel and they will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Why customers choose us"
          title="Simple service, useful products, fast ordering"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/10 bg-itouch-surface/90 p-5 transition hover:border-itouch-orange/35 hover:bg-itouch-surface-2 hover:shadow-glow"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-itouch-orange/10 transition group-hover:scale-110 group-hover:bg-itouch-orange">
                <ShieldCheck className="text-itouch-orange transition group-hover:text-black" size={28} />
              </div>
              <h3 className="mt-4 font-display font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-itouch-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-20 lg:px-8"
      >
        <div className="relative flex flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-itouch-orange/25 bg-gradient-to-r from-itouch-orange/15 via-itouch-surface to-itouch-blue/10 p-6 shadow-2xl sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-itouch-orange/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 h-56 w-56 rounded-full bg-itouch-blue/20 blur-3xl" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-itouch-orange">
              Need help choosing?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">Chat with i-Touch on WhatsApp</h2>
            <p className="mt-2 text-sm text-itouch-white/60">
              Ask about product availability, prices, offers or PS5 booking times.
            </p>
          </div>
          <button
            onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
            className="shine-button relative inline-flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-6 py-3 font-display font-bold text-black transition hover:-translate-y-1 hover:shadow-glow"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
