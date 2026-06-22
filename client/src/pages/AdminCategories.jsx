import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import { fetchCategories, createCategory, deleteCategory } from "../services/resources";

const TYPES = ["sports", "sportswear", "gaming", "mobile"];

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", type: "sports", description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetchCategories().then(({ data }) => setCategories(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCategory(form);
      toast.success("Category added");
      setForm({ name: "", type: "sports", description: "" });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not add category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    toast.success("Category deleted");
    load();
  };

  return (
    <div>
      <AdminHeader title="Categories" />
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        <form onSubmit={handleAdd} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-itouch-surface p-5 lg:col-span-1">
          <h3 className="font-display font-bold">Add Category</h3>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category Name" className="rounded-xl border border-white/10 bg-itouch-bg px-3 py-2.5 text-sm outline-none focus:border-itouch-orange" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-white/10 bg-itouch-bg px-3 py-2.5 text-sm outline-none focus:border-itouch-orange">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)" className="rounded-xl border border-white/10 bg-itouch-bg px-3 py-2.5 text-sm outline-none focus:border-itouch-orange" />
          <button disabled={saving} className="flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-4 py-2.5 text-sm font-semibold text-black hover:shadow-glow disabled:opacity-50">
            <Plus size={16} /> {saving ? "Saving..." : "Add Category"}
          </button>
        </form>

        <div className="lg:col-span-2">
          <AdminTable
            columns={[
              { key: "name", label: "Name" },
              { key: "type", label: "Type" },
              { key: "description", label: "Description" },
            ]}
            rows={categories}
            loading={loading}
            actions={(row) => (
              <button onClick={() => handleDelete(row._id)} className="rounded-lg bg-white/5 p-2 hover:text-red-400"><Trash2 size={16} /></button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
