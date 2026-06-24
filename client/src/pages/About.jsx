import { Dumbbell, Gamepad2, ShieldCheck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";

const pillars = [
  { icon: Dumbbell, title: "Sports & Sportswear", text: "Quality gear and apparel for cricket, football, badminton and daily training." },
  { icon: Gamepad2, title: "PS5 Gaming Zone", text: "Shooting, racing, multiplayer and group gaming experiences in one place." },
  { icon: Smartphone, title: "Mobile & Accessories", text: "Phones, chargers, earphones, covers, glass protectors and useful mobile accessories." },
  { icon: ShieldCheck, title: "Trusted Service", text: "Simple WhatsApp ordering, friendly support and products selected for local customers." },
];

const About = () => (
  <div className="relative overflow-hidden bg-itouch-bg">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(255,106,26,0.1),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(57,255,138,0.08),transparent_26%)]" />
    <PageHero
      eyebrow="About i-Touch"
      title="A local shop for sports, gaming and mobile lifestyle"
      subtitle="i-Touch brings together practical products and fun experiences: sports gear, sportswear, PS5 gaming sessions, phones and accessories."
      image="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1800&q=85"
    />

    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-itouch-orange/80 to-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
            Our idea
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">Play. Shop. Connect.</h2>
          <p className="mt-5 leading-8 text-itouch-white/70">
            i-Touch is built around the things customers ask for often: sports items, sportswear,
            mobile accessories and a gaming place to enjoy with friends. The site keeps ordering
            simple by sending product and booking requests through WhatsApp.
          </p>
          <p className="mt-4 leading-8 text-itouch-white/70">
            Whether someone is preparing for a match, replacing a charger, buying sportswear or
            booking PS5 time, the goal is to make the next step clear and quick.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -6 }}
              className="group rounded-[1.35rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-xl shadow-black/20 transition hover:border-itouch-orange/40 hover:bg-itouch-surface-2 hover:shadow-glow"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-itouch-orange/10 transition group-hover:scale-110 group-hover:bg-itouch-orange">
                <p.icon className="text-itouch-orange transition group-hover:text-black" size={28} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-itouch-white/60">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-10 grid gap-5 overflow-hidden rounded-[1.5rem] border border-itouch-orange/20 bg-gradient-to-r from-itouch-orange/15 via-itouch-surface to-itouch-blue/10 p-6 shadow-2xl sm:grid-cols-3 sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-itouch-orange/20 blur-3xl" />
        {[
          ["Sports", "Gear and apparel"],
          ["Gaming", "PS5 sessions"],
          ["Mobile", "Phones and accessories"],
        ].map(([title, text]) => (
          <div key={title} className="relative">
            <p className="font-display text-2xl font-bold text-itouch-orange">{title}</p>
            <p className="mt-1 text-sm text-itouch-white/60">{text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  </div>
);

export default About;
