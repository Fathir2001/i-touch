import { useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Clock, Gamepad2, Phone, User, Users, MessageSquare } from "lucide-react";
import { createGamingBooking } from "../services/resources";
import { buildGamingBookingUrl, openWhatsApp } from "../utils/whatsapp";
import WhatsAppButton from "./WhatsAppButton";

const GAME_TYPES = [
  "Shooting Games",
  "Multiplayer Games",
  "Racing Games",
  "Driving (Steering Wheel Mode)",
  "FIFA / Football Games",
  "Gaming Tournament",
];

const initialForm = {
  customerName: "",
  phone: "",
  gameType: GAME_TYPES[0],
  preferredDate: "",
  preferredTime: "",
  numberOfPlayers: 1,
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-itouch-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-itouch-green";

const BookingForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await createGamingBooking(form);
      setSubmitted(data);
      toast.success("Booking request sent! We'll confirm shortly.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not submit booking. Try WhatsApp instead.");
      setSubmitted(form);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-itouch-green/30 bg-itouch-surface p-6 text-center">
        <h3 className="font-display text-xl font-bold text-itouch-green">Booking Request Received!</h3>
        <p className="mt-2 text-sm text-itouch-white/60">
          We've noted your request for {submitted.gameType} on {submitted.preferredDate} at{" "}
          {submitted.preferredTime}. Confirm instantly via WhatsApp:
        </p>
        <WhatsAppButton
          url={buildGamingBookingUrl(submitted)}
          label="Confirm Booking on WhatsApp"
          full
          className="mt-4"
        />
        <button
          onClick={() => {
            setSubmitted(null);
            setForm(initialForm);
          }}
          className="mt-3 text-sm text-itouch-white/50 underline"
        >
          Book another session
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-itouch-green/20 bg-itouch-surface p-6 sm:grid-cols-2">
      <div className="relative sm:col-span-1">
        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required name="customerName" value={form.customerName} onChange={handleChange} placeholder="Your Name" className={inputClass} />
      </div>
      <div className="relative sm:col-span-1">
        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
      </div>

      <div className="relative sm:col-span-2">
        <Gamepad2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <select name="gameType" value={form.gameType} onChange={handleChange} className={inputClass}>
          {GAME_TYPES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} className={inputClass} />
      </div>
      <div className="relative">
        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required type="time" name="preferredTime" value={form.preferredTime} onChange={handleChange} className={inputClass} />
      </div>

      <div className="relative sm:col-span-2">
        <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
        <input required type="number" min="1" max="8" name="numberOfPlayers" value={form.numberOfPlayers} onChange={handleChange} placeholder="Number of Players" className={inputClass} />
      </div>

      <div className="relative sm:col-span-2">
        <MessageSquare size={16} className="absolute left-3 top-3 text-itouch-white/40" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any special requests? (optional)" rows={3} className={`${inputClass} pt-2.5`} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 rounded-xl bg-itouch-green px-4 py-3 font-display font-bold text-black transition-all hover:shadow-glow-green disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Book My Gaming Session"}
      </button>
    </form>
  );
};

export default BookingForm;
