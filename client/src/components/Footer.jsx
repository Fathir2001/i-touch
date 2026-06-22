import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/10 bg-itouch-surface">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div>
        <h3 className="font-display text-xl font-extrabold">
          <span className="text-itouch-orange">i</span>-Touch
        </h3>
        <p className="mt-3 text-sm text-itouch-white/60">
          Your one-stop shop for sports gear, sportswear, PS5 gaming, and mobile phones &
          accessories.
        </p>
        <p className="mt-3 text-sm font-semibold text-itouch-blue">Sports • Gaming • Mobile</p>
      </div>

      <div>
        <h4 className="font-display font-semibold text-itouch-white">Quick Links</h4>
        <ul className="mt-3 space-y-2 text-sm text-itouch-white/60">
          <li><Link to="/products" className="hover:text-itouch-orange">Products</Link></li>
          <li><Link to="/gaming" className="hover:text-itouch-orange">PS5 Gaming Zone</Link></li>
          <li><Link to="/offers" className="hover:text-itouch-orange">Offers</Link></li>
          <li><Link to="/about" className="hover:text-itouch-orange">About Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold text-itouch-white">Categories</h4>
        <ul className="mt-3 space-y-2 text-sm text-itouch-white/60">
          <li><Link to="/sports" className="hover:text-itouch-orange">Sports Items</Link></li>
          <li><Link to="/sportswear" className="hover:text-itouch-orange">Sportswear</Link></li>
          <li><Link to="/mobile" className="hover:text-itouch-orange">Mobile & Accessories</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold text-itouch-white">Get in Touch</h4>
        <ul className="mt-3 space-y-2 text-sm text-itouch-white/60">
          <li className="flex items-center gap-2"><Phone size={14} /> +94 77 123 4567</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Colombo, Sri Lanka</li>
          <li className="flex items-center gap-2"><MessageCircle size={14} /> Order via WhatsApp</li>
        </ul>
        <div className="mt-4 flex gap-3">
          <a href="#" aria-label="Facebook" className="rounded-lg bg-white/5 p-2 hover:text-itouch-blue"><Facebook size={18} /></a>
          <a href="#" aria-label="Instagram" className="rounded-lg bg-white/5 p-2 hover:text-itouch-orange"><Instagram size={18} /></a>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10 py-4 text-center text-xs text-itouch-white/40">
      © {new Date().getFullYear()} i-Touch. All rights reserved.
    </div>
  </footer>
);

export default Footer;
