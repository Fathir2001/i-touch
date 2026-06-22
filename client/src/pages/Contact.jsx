import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
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
  <div className="bg-itouch-bg">
    <PageHero
      eyebrow="Contact"
      title="Talk to i-Touch"
      subtitle="Ask about product availability, PS5 bookings, offers or mobile accessories. WhatsApp is the fastest way to reach the shop."
      image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85"
    />

    <section className="mx-auto -mt-10 grid max-w-7xl gap-8 px-4 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-itouch-surface/95 p-6 shadow-2xl backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
            Shop details
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">Reach us quickly</h2>
          <p className="mt-3 text-sm leading-6 text-itouch-white/60">
            Send a message for prices, stock availability, product photos or PS5 booking times.
          </p>

          <div className="mt-6 space-y-3">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3 rounded-xl bg-itouch-bg p-4">
                <Icon size={20} className="mt-0.5 shrink-0 text-itouch-orange" />
                <div>
                  <p className="font-display text-sm font-bold">{label}</p>
                  <p className="mt-1 text-sm text-itouch-white/65">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <WhatsAppButton url={buildGeneralWhatsAppUrl()} label="Chat on WhatsApp" full className="mt-5" />
          <div className="mt-4 flex gap-3">
            <a href="#" className="rounded-lg bg-white/5 p-2 transition hover:text-itouch-blue" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="rounded-lg bg-white/5 p-2 transition hover:text-itouch-orange" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-itouch-surface-2">
          <iframe
            title="i-Touch Location Map"
            className="h-80 w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Colombo,Sri Lanka&output=embed"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-itouch-surface p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-itouch-orange/10 p-3 text-itouch-orange">
            <MessageCircle size={22} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Send a message</h2>
            <p className="text-sm text-itouch-white/55">We will get back to you soon.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  </div>
);

export default Contact;
