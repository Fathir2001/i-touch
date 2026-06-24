import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, ShoppingBag, Smartphone, Trophy } from "lucide-react";
import PageHero from "../components/PageHero";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import { fetchProducts } from "../services/resources";

/**
 * Reusable products listing page.
 * fixedCategory: lock category filter (used by /sports, /sportswear, /mobile pages)
 */
const ProductsPage = ({ fixedCategory, title, subtitle }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: fixedCategory || "", search: "" });

  const pageMeta = {
    sports: {
      eyebrow: "Sports gear",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1800&q=85",
      icon: Trophy,
    },
    sportswear: {
      eyebrow: "Sportswear",
      image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=85",
      icon: ShoppingBag,
    },
    mobile: {
      eyebrow: "Mobile shop",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1800&q=85",
      icon: Smartphone,
    },
  };

  const meta = pageMeta[fixedCategory] || {
    eyebrow: "Product catalogue",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85",
    icon: ShoppingBag,
  };
  const HeroIcon = meta.icon;

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="relative overflow-hidden bg-itouch-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_34%,rgba(255,106,26,0.1),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(0,194,255,0.09),transparent_28%)]" />
      <PageHero
        eyebrow={meta.eyebrow}
        title={title || "All Products"}
        subtitle={subtitle || "Browse our full range of sports, sportswear, gaming and mobile products."}
        image={meta.image}
      />

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-16 lg:px-8"
      >
        <div className="mb-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-4 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px max-w-7xl bg-gradient-to-r from-transparent via-itouch-orange/70 to-transparent" />
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-itouch-orange/10 p-3 text-itouch-orange shadow-glow">
                <HeroIcon size={22} />
              </div>
              <div>
                <p className="font-display text-lg font-bold">Find what you need faster</p>
                <p className="text-sm text-itouch-white/55">
                  Search products or switch categories before ordering on WhatsApp.
                </p>
              </div>
            </div>
            <Link
              to="/gaming"
              className="inline-flex items-center gap-2 rounded-xl border border-itouch-green/30 px-4 py-2 text-sm font-bold text-itouch-green transition hover:-translate-y-1 hover:bg-itouch-green hover:text-black hover:shadow-glow-green"
            >
              <Gamepad2 size={16} /> Gaming zone <ArrowRight size={15} />
            </Link>
          </div>
          <ProductFilter
            filters={filters}
            onChange={(f) => setFilters(fixedCategory ? { ...f, category: fixedCategory } : f)}
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">Available Products</h2>
          <p className="rounded-full border border-white/10 bg-itouch-surface/80 px-3 py-1 text-sm text-itouch-white/60">
            {loading ? "Loading..." : `${products.length} item${products.length === 1 ? "" : "s"} found`}
          </p>
        </div>

        <ProductGrid products={products} loading={loading} />
      </motion.section>
    </div>
  );
};

export default ProductsPage;
