import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X, Upload } from "lucide-react";
import { createProduct, updateProduct, uploadImages } from "../services/resources";

const CATEGORIES = [
  { value: "sports", label: "Sports Items" },
  { value: "sportswear", label: "Sportswear" },
  { value: "gaming", label: "PS5 Gaming" },
  { value: "mobile", label: "Mobile & Accessories" },
];

const emptyProduct = {
  name: "",
  category: "sports",
  subCategory: "",
  price: "",
  shortDescription: "",
  description: "",
  images: [],
  stockStatus: "in-stock",
  isFeatured: false,
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-itouch-bg px-3 py-2.5 text-sm outline-none focus:border-itouch-orange";

const AdminProductForm = ({ product, onClose, onSaved }) => {
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) setForm({ ...emptyProduct, ...product });
  }, [product]);

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
      Array.from(files).forEach((file) => formData.append("images", file));
      const { data } = await uploadImages(formData);
      setForm((f) => ({ ...f, images: [...f.images, ...data.urls] }));
      toast.success("Images uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (product?._id) {
        await updateProduct(product._id, payload);
        toast.success("Product updated");
      } else {
        await createProduct(payload);
        toast.success("Product created");
      }
      onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-itouch-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">
            {product?._id ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input required name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className={`${inputClass} sm:col-span-2`} />

          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <input required name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="Sub Category (e.g. Cricket Items)" className={inputClass} />

          <input required type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price (Rs.)" className={inputClass} />

          <select name="stockStatus" value={form.stockStatus} onChange={handleChange} className={inputClass}>
            <option value="in-stock">In Stock</option>
            <option value="limited">Limited Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className={`${inputClass} sm:col-span-2`} />

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Full Description" rows={3} className={`${inputClass} sm:col-span-2`} />

          <div className="sm:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm text-itouch-white/70">
              <Upload size={16} /> Product Images
            </label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="text-sm" />
            {uploading && <p className="mt-1 text-xs text-itouch-orange">Uploading...</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute right-0 top-0 bg-black/70 px-1 text-xs text-red-400">×</button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            Mark as Featured Product
          </label>

          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-itouch-orange px-4 py-2.5 font-semibold text-black hover:shadow-glow disabled:opacity-50">
              {saving ? "Saving..." : "Save Product"}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
