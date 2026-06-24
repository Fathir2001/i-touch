import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StockBadge from "./StockBadge";
import WhatsAppButton from "./WhatsAppButton";
import { buildProductOrderUrl } from "../utils/whatsapp";

const categoryColors = {
  sports: "border-itouch-orange/30 hover:shadow-glow",
  sportswear: "border-itouch-blue/30 hover:shadow-glow-blue",
  gaming: "border-itouch-green/30 hover:shadow-glow-green",
  mobile: "border-itouch-blue/30 hover:shadow-glow-blue",
};

const ProductCard = ({ product }) => {
  const orderUrl = buildProductOrderUrl(product);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] border bg-itouch-surface shadow-xl shadow-black/20 transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/8 before:to-transparent before:opacity-0 before:transition before:content-[''] hover:-translate-y-1 hover:bg-itouch-surface-2 hover:before:opacity-100 ${
        categoryColors[product.category] || "border-white/10"
      }`}
    >
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-itouch-surface-2">
        <img
          src={product.images?.[0] || "https://placehold.co/600x600?text=i-Touch"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[11px] uppercase tracking-wide text-itouch-white/80 backdrop-blur">
          {product.subCategory}
        </span>
      </Link>

      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-display text-base font-semibold leading-tight hover:text-itouch-orange">
              {product.name}
            </h3>
          </Link>
          <StockBadge status={product.stockStatus} />
        </div>

        <p className="line-clamp-2 text-sm text-itouch-white/60">{product.shortDescription}</p>

        <div className="mt-1 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-itouch-orange">
            Rs. {Number(product.price).toLocaleString()}
          </span>
        </div>

        <WhatsAppButton url={orderUrl} full className="mt-2" />
      </div>
    </motion.div>
  );
};

export default ProductCard;
