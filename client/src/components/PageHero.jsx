import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroVideo = ({ src, poster, label }) => {
  const videoRef = useRef(null);
  const replayTimerRef = useRef(null);
  const [showFinalFrame, setShowFinalFrame] = useState(false);

  useEffect(
    () => () => {
      window.clearTimeout(replayTimerRef.current);
    },
    [],
  );

  const replayAfterPause = () => {
    setShowFinalFrame(true);
    replayTimerRef.current = window.setTimeout(() => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = 0;
      setShowFinalFrame(false);
      videoRef.current.play().catch(() => {});
    }, 1500);
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onEnded={replayAfterPause}
        className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-90 motion-safe:block"
      >
        <source src={src} type="video/mp4" />
      </video>
      {showFinalFrame && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-90 motion-safe:block"
        />
      )}
    </>
  );
};

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  video,
  videoLabel,
  ctaLabel,
  ctaTo,
  align = "left",
}) => (
  <section className="relative min-h-[520px] overflow-hidden border-b border-white/10 bg-itouch-bg">
    <img
      src={image}
      alt=""
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40"
      aria-hidden="true"
    />
    {video && (
      <HeroVideo
        src={video}
        poster={image}
        label={videoLabel}
      />
    )}
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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(57,255,138,0.08),transparent_26%),linear-gradient(90deg,rgba(10,10,15,0.96)_0%,rgba(10,10,15,0.82)_34%,rgba(10,10,15,0.22)_62%,rgba(10,10,15,0.05)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-itouch-bg to-transparent" />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={`relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20 lg:px-8 ${
        align === "center" ? "items-center text-center" : "items-start"
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
