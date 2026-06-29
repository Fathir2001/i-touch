import { Crosshair, Gauge, Joystick, Timer, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import BookingForm from "../components/BookingForm";
import GamingPackageCard from "../components/GamingPackageCard";
import PageHero from "../components/PageHero";

const packages = [
  { icon: Crosshair, title: "Shooting Games", description: "Intense FPS action, solo or squad up with friends.", glow: "orange" },
  { icon: Users, title: "Multiplayer Games", description: "Couch co-op and online multiplayer battles.", glow: "blue" },
  { icon: Gauge, title: "Racing Games", description: "High-speed racing across iconic tracks.", glow: "green" },
  { icon: Joystick, title: "Driving Wheel Mode", description: "Full immersion with our racing wheel rig.", glow: "orange" },
  { icon: Trophy, title: "FIFA / Football", description: "Go head-to-head in the latest football titles.", glow: "blue" },
  { icon: Timer, title: "Gaming Tournaments", description: "Join weekend tournaments and group challenges.", glow: "green" },
];

const hourlyPackages = [
  { duration: "1 Hour", price: "Rs. 500", note: "Single player or 2-player split screen" },
  { duration: "3 Hours", price: "Rs. 1,300", note: "Best for multiplayer sessions" },
  { duration: "Full Day", price: "Rs. 3,500", note: "Tournament-ready, up to 4 players" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const GamingZone = () => (
  <div className="relative overflow-hidden bg-itouch-bg">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(57,255,138,0.1),transparent_28%),radial-gradient(circle_at_85%_62%,rgba(0,194,255,0.1),transparent_26%)]" />
    <PageHero
      eyebrow="PS5 Gaming Zone"
      title="Book your next gaming session"
      subtitle="Shooting, multiplayer, FIFA, racing and steering wheel driving. Pick a package, send a request, and confirm fast through WhatsApp."
      image="/media/ps5-controller-frames/09.png"
      video="/media/ps5-controller-intro.mp4"
      videoLabel="A PlayStation 5 controller assembling from its internal components"
      ctaLabel="Book now"
      ctaTo="#booking"
    />

    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-green">Game modes</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Choose your play style</h2>
          <div className="mt-4 flex gap-2" aria-hidden="true">
            {["△", "○", "×", "□"].map((symbol, index) => (
              <span
                key={symbol}
                className={`grid h-8 w-8 place-items-center rounded-full border bg-black/25 font-display text-sm ${
                  index % 2 === 0
                    ? "border-itouch-blue/35 text-itouch-blue"
                    : "border-itouch-green/35 text-itouch-green"
                }`}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-itouch-white/60">
          Make the page feel like an activity destination, not just a booking form.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <GamingPackageCard {...pkg} />
          </motion.div>
        ))}
      </div>
    </motion.section>

    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="relative z-10 border-y border-white/5 bg-itouch-surface/55 py-16 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">Packages</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Hourly Gaming Packages</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {hourlyPackages.map((pkg) => (
            <motion.div
              key={pkg.duration}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative overflow-hidden rounded-[1.35rem] border border-itouch-green/30 bg-itouch-bg/90 p-6 text-center shadow-xl shadow-black/20 transition hover:border-itouch-green/60 hover:shadow-glow-green"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-itouch-green to-transparent" />
              <p className="font-display text-lg font-bold text-itouch-green">{pkg.duration}</p>
              <p className="mt-2 font-display text-3xl font-extrabold">{pkg.price}</p>
              <p className="mt-3 text-sm leading-6 text-itouch-white/60">{pkg.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    <motion.section
      id="booking"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
    >
      <div className="rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-2xl shadow-black/20 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-green">How booking works</p>
        <h2 className="mt-3 font-display text-3xl font-bold">Request a slot in one minute</h2>
        <div className="mt-6 space-y-4">
          {["Choose game type", "Pick date and time", "Confirm on WhatsApp"].map((step, index) => (
            <motion.div
              key={step}
              whileHover={{ x: 4 }}
              className="flex gap-4 rounded-xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-green/35"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-itouch-green font-display font-bold text-black">
                {index + 1}
              </span>
              <div>
                <p className="font-display font-bold">{step}</p>
                <p className="mt-1 text-sm text-itouch-white/55">
                  {index === 2 ? "The final confirmation happens through WhatsApp." : "Fill the form with your preferred details."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <BookingForm />
      </div>
    </motion.section>
  </div>
);

export default GamingZone;
