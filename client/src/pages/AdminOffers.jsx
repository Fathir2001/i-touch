import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import AdminOfferForm from "../components/AdminOfferForm";
import { fetchAllOffers, deleteOffer } from "../services/resources";

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    fetchAllOffers().then(({ data }) => setOffers(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this offer?")) return;
    await deleteOffer(id);
    toast.success("Offer deleted");
    load();
  };

  return (
    <div>
      <AdminHeader title="Offers" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 rounded-xl bg-itouch-orange px-4 py-2.5 text-sm font-semibold text-black hover:shadow-glow"
          >
            <Plus size={16} /> Add Offer
          </button>
        </div>

        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "discountText", label: "Discount" },
            { key: "isActive", label: "Active", render: (row) => (row.isActive ? "Yes" : "No") },
            { key: "endDate", label: "Valid Until", render: (row) => (row.endDate ? new Date(row.endDate).toLocaleDateString() : "-") },
          ]}
          rows={offers}
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
        <AdminOfferForm
          offer={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
};

export default AdminOffers;
