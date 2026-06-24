import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ title, subtitle, image, to, accent = "orange" }) => {
  const accentMap = {
    orange: "hover:shadow-glow hover:border-itouch-orange/50",
    blue: "hover:shadow-glow-blue hover:border-itouch-blue/50",
    green: "hover:shadow-glow-green hover:border-itouch-green/50",
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
      <Link
        to={to}
        className={`group relative block overflow-hidden rounded-[1.35rem] border border-white/10 bg-itouch-surface shadow-xl shadow-black/20 transition-all duration-300 ${accentMap[accent]}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-itouch-surface-2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/15 bg-black/35 backdrop-blur transition group-hover:scale-110 group-hover:border-white/35" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-display text-lg font-bold transition group-hover:text-itouch-orange">{title}</h3>
          <p className="text-sm text-itouch-white/70">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
