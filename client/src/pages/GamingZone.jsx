import { Crosshair, Users, Gauge, Trophy, Timer, Joystick } from "lucide-react";
import { motion } from "framer-motion";
import GamingPackageCard from "../components/GamingPackageCard";
import BookingForm from "../components/BookingForm";

const packages = [
  { icon: Crosshair, title: "Shooting Games", description: "Intense FPS action — solo or squad up with friends.", glow: "orange" },
  { icon: Users, title: "Multiplayer Games", description: "Couch co-op and online multiplayer battles.", glow: "blue" },
  { icon: Gauge, title: "Racing Games", description: "High-speed racing across iconic tracks.", glow: "green" },
  { icon: Joystick, title: "Driving (Steering Wheel Mode)", description: "Full immersion with our racing wheel rig.", glow: "orange" },
  { icon: Trophy, title: "FIFA / Football Games", description: "Go head-to-head in the latest football titles.", glow: "blue" },
  { icon: Timer, title: "Gaming Tournaments", description: "Join weekend tournaments with prizes.", glow: "green" },
];

const hourlyPackages = [
  { duration: "1 Hour", price: "Rs. 500", note: "Single player or 2-player split screen" },
  { duration: "3 Hours", price: "Rs. 1,300", note: "Best for multiplayer sessions" },
  { duration: "Full Day", price: "Rs. 3,500", note: "Tournament-ready, up to 4 players" },
];

const GamingZone = () => (
  <div className="bg-itouch-bg">
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-itouch-green/10 via-itouch-bg to-itouch-blue/10 py-16">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-itouch-green/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-itouch-orange/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-extrabold sm:text-5xl"
        >
          <span className="gradient-text">PS5 Gaming Zone</span>
        </motion.h1>
        <p className="mx-auto mt-4 max-w-2xl text-itouch-white/70">
          Shooting, multiplayer, racing and steering wheel driving — book your gaming session at
          i-Touch and experience next-gen gaming.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <h2 className="mb-6 font-display text-2xl font-bold">Game Modes</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <GamingPackageCard key={pkg.title} {...pkg} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <h2 className="mb-6 font-display text-2xl font-bold">Hourly Gaming Packages</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {hourlyPackages.map((pkg) => (
          <div
            key={pkg.duration}
            className="rounded-2xl border border-itouch-green/30 bg-itouch-surface p-6 text-center hover:shadow-glow-green"
          >
            <p className="font-display text-lg font-bold text-itouch-green">{pkg.duration}</p>
            <p className="mt-2 font-display text-2xl font-extrabold">{pkg.price}</p>
            <p className="mt-2 text-sm text-itouch-white/60">{pkg.note}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <h2 className="mb-6 font-display text-2xl font-bold">Book Your Gaming Session</h2>
      <BookingForm />
    </section>
  </div>
);

export default GamingZone;
