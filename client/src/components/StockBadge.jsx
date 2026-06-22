const styles = {
  "in-stock": "bg-itouch-green/15 text-itouch-green border-itouch-green/30",
  "out-of-stock": "bg-red-500/15 text-red-400 border-red-500/30",
  limited: "bg-itouch-orange/15 text-itouch-orange border-itouch-orange/30",
};

const labels = {
  "in-stock": "In Stock",
  "out-of-stock": "Out of Stock",
  limited: "Limited Stock",
};

const StockBadge = ({ status = "in-stock" }) => (
  <span
    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status] || styles["in-stock"]}`}
  >
    {labels[status] || "In Stock"}
  </span>
);

export default StockBadge;
