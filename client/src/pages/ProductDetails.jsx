import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import StockBadge from "../components/StockBadge";
import WhatsAppButton from "../components/WhatsAppButton";
import ProductCard from "../components/ProductCard";
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
  if (!data) return <EmptyState title="Product not found" subtitle="It may have been removed or the link is incorrect." />;

  const { product, related } = data;
  const orderUrl = buildProductOrderUrl(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex items-center gap-1 text-sm text-itouch-white/50">
        <Link to="/products" className="hover:text-itouch-orange">Products</Link>
        <ChevronRight size={14} />
        <span className="capitalize">{product.category}</span>
        <ChevronRight size={14} />
        <span className="text-itouch-white/80">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-itouch-surface-2">
            <img
              src={product.images?.[activeImage] || "https://placehold.co/600x600?text=i-Touch"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border ${
                    idx === activeImage ? "border-itouch-orange" : "border-white/10"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-itouch-orange/10 px-3 py-1 text-xs font-semibold uppercase text-itouch-orange">
            {product.subCategory}
          </span>
          <h1 className="font-display text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-itouch-orange">
              Rs. {Number(product.price).toLocaleString()}
            </span>
            <StockBadge status={product.stockStatus} />
          </div>
          <p className="text-itouch-white/70">{product.description || product.shortDescription}</p>

          <div className="mt-2 rounded-2xl border border-white/10 bg-itouch-surface p-4 text-sm text-itouch-white/60">
            <p><span className="text-itouch-white">Category:</span> <span className="capitalize">{product.category}</span></p>
            <p><span className="text-itouch-white">Sub Category:</span> {product.subCategory}</p>
          </div>

          <WhatsAppButton url={orderUrl} full className="mt-2 py-3.5 text-base" />
        </div>
      </div>

      {related?.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
