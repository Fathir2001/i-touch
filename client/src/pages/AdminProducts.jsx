import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import AdminProductForm from "../components/AdminProductForm";
import StockBadge from "../components/StockBadge";
import { fetchProducts, deleteProduct } from "../services/resources";

const columns = [
  {
    key: "name",
    label: "Product",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.images?.[0] || "https://placehold.co/60x60"} alt="" className="h-10 w-10 rounded-lg object-cover" />
        <span>{row.name}</span>
      </div>
    ),
  },
  { key: "category", label: "Category" },
  { key: "subCategory", label: "Sub Category" },
  { key: "price", label: "Price", render: (row) => `Rs. ${Number(row.price).toLocaleString()}` },
  { key: "stockStatus", label: "Stock", render: (row) => <StockBadge status={row.stockStatus} /> },
  { key: "isFeatured", label: "Featured", render: (row) => (row.isFeatured ? "Yes" : "No") },
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    fetchProducts()
      .then(({ data }) => setProducts(data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <AdminHeader title="Products" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 rounded-xl bg-itouch-orange px-4 py-2.5 text-sm font-semibold text-black hover:shadow-glow"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        <AdminTable
          columns={columns}
          rows={products}
          loading={loading}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => { setEditing(row); setShowForm(true); }} className="rounded-lg bg-white/5 p-2 hover:text-itouch-blue"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(row._id)} className="rounded-lg bg-white/5 p-2 hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          )}
        />
      </div>

      {showForm && (
        <AdminProductForm
          product={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
