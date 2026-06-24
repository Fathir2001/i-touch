import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-4 overflow-hidden px-4 text-center">
    <div className="absolute h-72 w-72 rounded-full bg-itouch-orange/15 blur-3xl" />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-8 shadow-2xl backdrop-blur"
    >
      <h1 className="gradient-text font-display text-7xl font-extrabold">404</h1>
      <p className="mt-3 text-itouch-white/60">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="shine-button mt-6 inline-flex rounded-xl bg-itouch-orange px-6 py-2.5 font-semibold text-black transition hover:-translate-y-1 hover:shadow-glow"
      >
      Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
