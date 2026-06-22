import { useEffect, useState } from "react";
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

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">{title || "All Products"}</h1>
        {subtitle && <p className="mt-2 text-itouch-white/60">{subtitle}</p>}
      </div>

      <div className="mb-6">
        <ProductFilter
          filters={filters}
          onChange={(f) => setFilters(fixedCategory ? { ...f, category: fixedCategory } : f)}
        />
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default ProductsPage;
