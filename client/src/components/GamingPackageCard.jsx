import { motion } from "framer-motion";

const GamingPackageCard = ({ icon: Icon, title, description, glow = "orange" }) => {
  const glowMap = {
    orange: "hover:shadow-glow hover:border-itouch-orange/50 text-itouch-orange",
    blue: "hover:shadow-glow-blue hover:border-itouch-blue/50 text-itouch-blue",
    green: "hover:shadow-glow-green hover:border-itouch-green/50 text-itouch-green",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-itouch-surface to-itouch-surface-2 p-5 transition-all ${glowMap[glow]}`}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${glowMap[glow].split(" ").pop()}`}>
        <Icon size={24} />
      </div>
      <h3 className="font-display text-base font-bold text-itouch-white">{title}</h3>
      <p className="text-sm text-itouch-white/60">{description}</p>
    </motion.div>
  );
};

export default GamingPackageCard;
