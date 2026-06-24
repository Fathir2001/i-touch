import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import StockBadge from "../components/StockBadge";
import WhatsAppButton from "../components/WhatsAppButton";
import { fetchProductBySlug } from "../services/resources";
import { buildProductOrderUrl } from "../utils/whatsapp";

const ProductDetails = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProductBySlug(slug)
      .then(({ data }) => {
        setData(data);
        setActiveImage(0);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner label="Loading product..." />;
  if (!data) {
    return <EmptyState title="Product not found" subtitle="It may have been removed or the link is incorrect." />;
  }

  const { product, related } = data;
  const orderUrl = buildProductOrderUrl(product);
  const images = product.images?.length ? product.images : ["https://placehold.co/900x900?text=i-Touch"];

  return (
    <div className="relative overflow-hidden bg-itouch-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,106,26,0.1),transparent_28%),radial-gradient(circle_at_80%_64%,rgba(0,194,255,0.08),transparent_28%)]" />
      <section className="relative z-10 border-b border-white/10 bg-itouch-surface/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-itouch-white/50">
            <Link to="/products" className="hover:text-itouch-orange">
              Products
            </Link>
            <ChevronRight size={14} />
            <span className="capitalize">{product.category}</span>
            <ChevronRight size={14} />
            <span className="text-itouch-white/80">{product.name}</span>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
      >
        <div>
          <div className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface-2 shadow-2xl">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="aspect-square h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square overflow-hidden rounded-xl border transition hover:-translate-y-1 hover:opacity-100 ${
                    idx === activeImage ? "border-itouch-orange opacity-100 shadow-glow" : "border-white/10 opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-itouch-orange/80 to-transparent" />
            <span className="inline-flex rounded-full border border-itouch-orange/20 bg-itouch-orange/10 px-3 py-1 text-xs font-semibold uppercase text-itouch-orange">
              {product.subCategory}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="font-display text-3xl font-bold text-itouch-orange">
                Rs. {Number(product.price).toLocaleString()}
              </span>
              <StockBadge status={product.stockStatus} />
            </div>

            <p className="mt-5 leading-7 text-itouch-white/70">
              {product.description || product.shortDescription}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-green/40">
                <ShieldCheck className="text-itouch-green" size={22} />
                <p className="mt-2 font-display font-bold">Quality checked</p>
                <p className="mt-1 text-xs text-itouch-white/55">Ask for final availability before pickup.</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-blue/40">
                <Truck className="text-itouch-blue" size={22} />
                <p className="mt-2 font-display font-bold">Order by WhatsApp</p>
                <p className="mt-1 text-xs text-itouch-white/55">Fast chat-based ordering with the shop.</p>
              </motion.div>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-itouch-bg/90 p-4 text-sm text-itouch-white/65">
              <p>
                <span className="text-itouch-white">Category:</span>{" "}
                <span className="capitalize">{product.category}</span>
              </p>
              <p className="mt-2">
                <span className="text-itouch-white">Sub category:</span> {product.subCategory}
              </p>
            </div>

            <WhatsAppButton url={orderUrl} full className="mt-6 py-3.5 text-base" />
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-itouch-white/45">
              <MessageCircle size={14} /> Opens WhatsApp with this product pre-filled.
            </p>
          </div>
        </div>
      </motion.section>

      {related?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto max-w-7xl px-4 pb-16 lg:px-8"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-itouch-orange">
                You may also like
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">Related Products</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-itouch-orange hover:underline">
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default ProductDetails;
