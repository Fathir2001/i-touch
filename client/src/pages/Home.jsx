import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts()
      .then(({ data }) => setFeatured(data))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false));

    fetchActiveOffers()
      .then(({ data }) => setOffers(data.slice(0, 3)))
      .catch(() => setOffers([]));
  }, []);

  return (
    <div className="relative overflow-hidden bg-itouch-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_28%,rgba(255,106,26,0.11),transparent_28%),radial-gradient(circle_at_88%_45%,rgba(0,194,255,0.1),transparent_30%),radial-gradient(circle_at_45%_80%,rgba(57,255,138,0.08),transparent_26%)]" />
      <HeroSection />

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
              src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80"
              alt="Console gaming setup"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
