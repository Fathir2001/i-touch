import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PageHero = ({ eyebrow, title, subtitle, image, ctaLabel, ctaTo, align = "left" }) => (
  <section className="relative overflow-hidden border-b border-white/10 bg-itouch-bg">
    <img
      src={image}
      alt=""
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40"
      aria-hidden="true"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: [0.28, 0.58, 0.28], scale: [1, 1.08, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-itouch-orange/20 blur-3xl"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: [0.22, 0.5, 0.22], x: [0, -22, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-0 top-20 h-80 w-80 rounded-full bg-itouch-blue/20 blur-3xl"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(57,255,138,0.16),transparent_30%),linear-gradient(90deg,#0a0a0f_0%,rgba(10,10,15,0.92)_50%,rgba(10,10,15,0.52)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-itouch-bg to-transparent" />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={`relative mx-auto max-w-7xl px-4 py-20 lg:px-8 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base leading-8 text-itouch-white/70 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="shine-button mt-7 inline-flex items-center gap-2 rounded-xl bg-itouch-orange px-5 py-3 font-display font-bold text-black transition hover:-translate-y-1 hover:shadow-glow"
        >
          {ctaLabel} <ArrowRight size={18} />
        </Link>
      )}
    </motion.div>
  </section>
);

export default PageHero;
