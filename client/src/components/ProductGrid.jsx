import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

const ProductGrid = ({ products, loading }) => {
  if (loading) return <LoadingSpinner label="Loading products..." />;
  if (!products || products.length === 0)
    return <EmptyState title="No products found" subtitle="Try a different category or search term." />;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
