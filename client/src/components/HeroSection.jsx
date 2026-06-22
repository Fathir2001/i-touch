import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const stats = [
  ["4", "Shop sections"],
  ["PS5", "Gaming zone"],
  ["WhatsApp", "Easy orders"],
];

const HeroSection = () => (
  <section className="relative min-h-[720px] overflow-hidden bg-itouch-bg">
    <img
      src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1800&q=85"
      alt="Sports shoes and shop display"
      className="absolute inset-0 h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-itouch-bg via-itouch-bg/90 to-itouch-bg/25" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-itouch-bg to-transparent" />

    <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-itouch-orange/40 bg-black/40 px-4 py-2 text-sm font-semibold text-itouch-orange backdrop-blur"
        >
          <Sparkles size={16} /> Sports, gaming and mobile in one place
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
        >
          i-Touch Sports, Gaming &amp; Mobile
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl text-base leading-8 text-itouch-white/75 sm:text-lg"
        >
          Shop sports gear, sportswear, mobile accessories and book PS5 gaming sessions. Browse the
          latest products, check offers, and order fast through WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-6 py-3 font-display font-bold text-black transition-all hover:shadow-glow"
          >
            <ShoppingBag size={18} /> Shop Products
          </Link>
          <Link
            to="/gaming"
            className="flex items-center justify-center gap-2 rounded-xl border border-itouch-green/50 bg-itouch-green/10 px-6 py-3 font-display font-bold text-itouch-green transition-all hover:shadow-glow-green"
          >
            <Gamepad2 size={18} /> Book PS5 Session
          </Link>
          <button
            onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
            className="flex items-center justify-center gap-2 rounded-xl border border-itouch-blue/50 bg-itouch-blue/10 px-6 py-3 font-display font-bold text-itouch-blue transition-all hover:shadow-glow-blue"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
        >
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur">
              <p className="font-display text-2xl font-bold text-itouch-white">{value}</p>
              <p className="mt-1 text-xs text-itouch-white/60">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="hidden lg:block"
      >
        <div className="relative ml-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur">
          <img
            src="https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=80"
            alt="Gaming controller"
            className="aspect-[4/5] w-full rounded-xl object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-itouch-green/30 bg-black/70 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-itouch-green">
              Gaming Zone
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">PS5 sessions ready to book</h2>
            <Link
              to="/gaming"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-itouch-green"
            >
              View packages <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
