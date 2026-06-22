import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PageHero = ({ eyebrow, title, subtitle, image, ctaLabel, ctaTo, align = "left" }) => (
  <section className="relative overflow-hidden border-b border-white/10 bg-itouch-bg">
    <img
      src={image}
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-35"
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-itouch-bg via-itouch-bg/90 to-itouch-bg/45" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-itouch-bg to-transparent" />

    <div
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
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-itouch-orange px-5 py-3 font-display font-bold text-black transition hover:shadow-glow"
        >
          {ctaLabel} <ArrowRight size={18} />
        </Link>
      )}
    </div>
  </section>
);

export default PageHero;
