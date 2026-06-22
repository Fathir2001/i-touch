import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, ShoppingBag, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-itouch-bg">
    <div className="absolute inset-0 bg-itouch-gradient" />
    <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-itouch-orange/20 blur-3xl" />
    <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-itouch-blue/20 blur-3xl" />

    <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center lg:py-28">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-full border border-itouch-orange/40 bg-itouch-orange/10 px-4 py-1.5 text-sm font-semibold text-itouch-orange"
      >
        Sports • Gaming • Mobile
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-5xl"
      >
        i-Touch – Your One-Stop{" "}
        <span className="gradient-text">Sports, Gaming &amp; Mobile</span> Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl text-base text-itouch-white/70 sm:text-lg"
      >
        Shop quality sports items, stylish sportswear, mobile phones, phone accessories, mobile
        templates, and enjoy PS5 gaming with multiplayer, shooting, and steering wheel racing
        modes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Link
          to="/products"
          className="flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-6 py-3 font-display font-bold text-black transition-all hover:shadow-glow"
        >
          <ShoppingBag size={18} /> Explore Products
        </Link>
        <Link
          to="/gaming"
          className="flex items-center justify-center gap-2 rounded-xl border border-itouch-green/50 bg-itouch-green/10 px-6 py-3 font-display font-bold text-itouch-green transition-all hover:shadow-glow-green"
        >
          <Gamepad2 size={18} /> Book PS5 Gaming
        </Link>
        <button
          onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
          className="flex items-center justify-center gap-2 rounded-xl border border-itouch-blue/50 bg-itouch-blue/10 px-6 py-3 font-display font-bold text-itouch-blue transition-all hover:shadow-glow-blue"
        >
          <MessageCircle size={18} /> Contact on WhatsApp
        </button>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
