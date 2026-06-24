import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
import WhatsAppButton from "../components/WhatsAppButton";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

const details = [
  { icon: Phone, label: "Phone", value: "+94 77 835 3336" },
  { icon: MapPin, label: "Location", value: "Colombo, Sri Lanka" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 9:00 AM - 8:00 PM" },
];

const Contact = () => (
  <div className="relative overflow-hidden bg-itouch-bg">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(0,194,255,0.1),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(255,106,26,0.1),transparent_28%)]" />
    <PageHero
      eyebrow="Contact"
      title="Talk to i-Touch"
      subtitle="Ask about product availability, PS5 bookings, offers or mobile accessories. WhatsApp is the fastest way to reach the shop."
      image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85"
    />

    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="relative z-10 mx-auto -mt-10 grid max-w-7xl gap-8 px-4 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"
    >
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-itouch-orange/80 to-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
            Shop details
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">Reach us quickly</h2>
          <p className="mt-3 text-sm leading-6 text-itouch-white/60">
            Send a message for prices, stock availability, product photos or PS5 booking times.
          </p>

          <div className="mt-6 space-y-3">
            {details.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                className="group flex gap-3 rounded-xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-orange/35"
              >
                <Icon size={20} className="mt-0.5 shrink-0 text-itouch-orange transition group-hover:scale-110" />
                <div>
                  <p className="font-display text-sm font-bold">{label}</p>
                  <p className="mt-1 text-sm text-itouch-white/65">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <WhatsAppButton url={buildGeneralWhatsAppUrl()} label="Chat on WhatsApp" full className="mt-5" />
          <div className="mt-4 flex gap-3">
            <a href="#" className="rounded-lg bg-white/5 p-2 transition hover:-translate-y-1 hover:text-itouch-blue" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="rounded-lg bg-white/5 p-2 transition hover:-translate-y-1 hover:text-itouch-orange" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface-2 shadow-2xl">
          <iframe
            title="i-Touch Location Map"
            className="h-80 w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Colombo,Sri Lanka&output=embed"
          />
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-6 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-itouch-orange/10 p-3 text-itouch-orange shadow-glow">
            <MessageCircle size={22} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Send a message</h2>
            <p className="text-sm text-itouch-white/55">We will get back to you soon.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </motion.section>
  </div>
);

export default Contact;
