import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X, Upload } from "lucide-react";
import { createOffer, updateOffer, uploadImages } from "../services/resources";

const emptyOffer = {
  title: "",
  description: "",
  discountText: "",
  image: "",
  startDate: "",
  endDate: "",
  isActive: true,
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-itouch-bg px-3 py-2.5 text-sm outline-none focus:border-itouch-orange";

const AdminOfferForm = ({ offer, onClose, onSaved }) => {
  const [form, setForm] = useState(emptyOffer);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (offer) {
      setForm({
        ...emptyOffer,
        ...offer,
        startDate: offer.startDate ? offer.startDate.substring(0, 10) : "",
        endDate: offer.endDate ? offer.endDate.substring(0, 10) : "",
      });
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("images", files[0]);
      const { data } = await uploadImages(formData);
      setForm((f) => ({ ...f, image: data.urls[0] }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (offer?._id) {
        await updateOffer(offer._id, form);
        toast.success("Offer updated");
      } else {
        await createOffer(form);
        toast.success("Offer created");
      }
      onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not save offer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-itouch-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">{offer?._id ? "Edit Offer" : "Add Offer"}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required name="title" value={form.title} onChange={handleChange} placeholder="Offer Title" className={inputClass} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className={inputClass} />
          <input name="discountText" value={form.discountText} onChange={handleChange} placeholder="Discount Text (e.g. 20% OFF)" className={inputClass} />

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-itouch-white/70"><Upload size={16}/> Offer Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
            {uploading && <p className="mt-1 text-xs text-itouch-orange">Uploading...</p>}
            {form.image && <img src={form.image} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover" />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputClass} />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputClass} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
          </label>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-itouch-orange px-4 py-2.5 font-semibold text-black hover:shadow-glow disabled:opacity-50">
              {saving ? "Saving..." : "Save Offer"}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminOfferForm;
