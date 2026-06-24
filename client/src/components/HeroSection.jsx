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
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-itouch-orange/20 blur-3xl"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: [0.25, 0.55, 0.25], x: [0, -24, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-0 top-36 h-96 w-96 rounded-full bg-itouch-blue/20 blur-3xl"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 26, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-16 right-1/4 h-64 w-64 rounded-full bg-itouch-green/15 blur-3xl"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,194,255,0.2),transparent_32%),linear-gradient(90deg,#0a0a0f_0%,rgba(10,10,15,0.92)_45%,rgba(10,10,15,0.42)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-itouch-bg to-transparent" />

    <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-itouch-orange/40 bg-black/45 px-4 py-2 text-sm font-semibold text-itouch-orange shadow-glow backdrop-blur"
        >
          <Sparkles size={16} /> Sports, gaming and mobile in one place
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
        >
          i-Touch <span className="gradient-text">Sports, Gaming</span> &amp; Mobile
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
            className="shine-button flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-6 py-3 font-display font-bold text-black transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <ShoppingBag size={18} /> Shop Products
          </Link>
          <Link
            to="/gaming"
            className="flex items-center justify-center gap-2 rounded-xl border border-itouch-green/50 bg-itouch-green/10 px-6 py-3 font-display font-bold text-itouch-green transition-all hover:-translate-y-1 hover:bg-itouch-green hover:text-black hover:shadow-glow-green"
          >
            <Gamepad2 size={18} /> Book PS5 Session
          </Link>
          <button
            onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
            className="flex items-center justify-center gap-2 rounded-xl border border-itouch-blue/50 bg-itouch-blue/10 px-6 py-3 font-display font-bold text-itouch-blue transition-all hover:-translate-y-1 hover:bg-itouch-blue hover:text-black hover:shadow-glow-blue"
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
            <motion.div
              key={label}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-xl border border-white/10 bg-black/40 p-4 shadow-lg backdrop-blur transition-colors hover:border-itouch-orange/40"
            >
              <p className="font-display text-2xl font-bold text-itouch-white">{value}</p>
              <p className="mt-1 text-xs text-itouch-white/60">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative ml-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur"
        >
          <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-itouch-orange/20 via-transparent to-itouch-green/20 opacity-80" />
          <img
            src="https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=80"
            alt="Gaming controller"
            className="relative aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-itouch-green/30 bg-black/75 p-4 shadow-glow-green backdrop-blur">
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
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
