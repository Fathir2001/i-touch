import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/sports", label: "Sports" },
  { to: "/sportswear", label: "Sportswear" },
  { to: "/gaming", label: "PS5 Gaming" },
  { to: "/mobile", label: "Mobile" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-itouch-orange" : "text-itouch-white/70 hover:text-itouch-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-itouch-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link
          id="navbar-brand-logo"
          to="/"
          className="relative font-display text-xl font-extrabold"
        >
          <span className="absolute -left-1 -top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-itouch-green shadow-glow-green" />
          <span className="text-itouch-green">i</span>
          <span className="text-itouch-white">-Touch</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
            className="flex items-center gap-2 rounded-xl bg-itouch-green px-4 py-2 text-sm font-semibold text-black hover:shadow-glow-green"
          >
            <MessageCircle size={16} /> WhatsApp
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-itouch-bg px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-itouch-green px-4 py-2.5 text-sm font-semibold text-black"
            >
              <MessageCircle size={16} /> WhatsApp
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
