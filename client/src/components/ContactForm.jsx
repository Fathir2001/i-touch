import { useState } from "react";
import toast from "react-hot-toast";
import { User, Phone, Mail, MessageSquare } from "lucide-react";
import { createContactMessage } from "../services/resources";

const initialForm = { name: "", phone: "", email: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-white/10 bg-itouch-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-itouch-blue";

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createContactMessage(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-itouch-blue/20 bg-itouch-surface p-6">
      <div className="relative">
        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className={inputClass} />
      </div>
      <div className="relative">
        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
      </div>
      <div className="relative">
        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className={inputClass} />
      </div>
      <div className="relative">
        <MessageSquare size={16} className="absolute left-3 top-3 text-itouch-white/40" />
        <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={4} className={`${inputClass} pt-2.5`} />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-itouch-blue px-4 py-3 font-display font-bold text-black transition-all hover:shadow-glow-blue disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
