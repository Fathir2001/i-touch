import { Search } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "sports", label: "Sports Items" },
  { value: "sportswear", label: "Sportswear" },
  { value: "gaming", label: "PS5 Gaming" },
  { value: "mobile", label: "Mobile & Accessories" },
];

const ProductFilter = ({ filters, onChange }) => {
  const handle = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-itouch-surface/90 p-4 shadow-xl shadow-black/20 backdrop-blur sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40 transition peer-focus:text-itouch-orange" />
        <input
          value={filters.search || ""}
          onChange={(e) => handle("search", e.target.value)}
          placeholder="Search products..."
          className="peer w-full rounded-xl border border-white/10 bg-itouch-bg/90 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-itouch-orange focus:shadow-glow"
        />
      </div>

      <select
        value={filters.category || ""}
        onChange={(e) => handle("category", e.target.value)}
        className="rounded-xl border border-white/10 bg-itouch-bg/90 px-3 py-2.5 text-sm outline-none transition focus:border-itouch-orange focus:shadow-glow"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
