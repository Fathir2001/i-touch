import { Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import ContactForm from "../components/ContactForm";
import WhatsAppButton from "../components/WhatsAppButton";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

const Contact = () => (
  <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
    <div className="mb-10 text-center">
      <h1 className="font-display text-3xl font-bold">Contact i-Touch</h1>
      <p className="mt-2 text-itouch-white/60">We're happy to help — reach out anytime.</p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-white/10 bg-itouch-surface p-6">
          <h2 className="font-display text-lg font-bold">Shop Details</h2>
          <ul className="mt-4 space-y-3 text-sm text-itouch-white/70">
            <li className="flex items-center gap-3"><Phone size={18} className="text-itouch-orange" /> +94 77 123 4567</li>
            <li className="flex items-center gap-3"><MapPin size={18} className="text-itouch-orange" /> No. 123, Main Street, Colombo, Sri Lanka</li>
            <li className="flex items-center gap-3"><Clock size={18} className="text-itouch-orange" /> Mon - Sat: 9:00 AM - 8:00 PM</li>
          </ul>
          <WhatsAppButton url={buildGeneralWhatsAppUrl()} label="Chat on WhatsApp" full className="mt-5" />
          <div className="mt-4 flex gap-3">
            <a href="#" className="rounded-lg bg-white/5 p-2 hover:text-itouch-blue"><Facebook size={18} /></a>
            <a href="#" className="rounded-lg bg-white/5 p-2 hover:text-itouch-orange"><Instagram size={18} /></a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-itouch-surface-2">
          <iframe
            title="i-Touch Location Map"
            className="h-72 w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Colombo,Sri Lanka&output=embed"
          />
        </div>
      </div>

      <ContactForm />
    </div>
  </div>
);

export default Contact;
