import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Tag,
  Trophy,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import OfferBanner from "../components/OfferBanner";
import { fetchActiveOffers, fetchFeaturedProducts } from "../services/resources";
import { featuredCategories, whyChooseUs } from "../data/staticData";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const SectionHeading = ({ eyebrow, title, subtitle, link, linkLabel }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-itouch-orange">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-itouch-white/60">{subtitle}</p>}
    </div>
    {link && (
      <Link
        to={link}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-itouch-white/80 transition hover:border-itouch-orange hover:text-itouch-orange"
      >
        {linkLabel} <ArrowRight size={16} />
      </Link>
    )}
  </div>
);

const quickLinks = [
  { label: "Sports Items", to: "/sports", icon: Trophy, color: "text-itouch-orange" },
  { label: "PS5 Gaming", to: "/gaming", icon: Gamepad2, color: "text-itouch-green" },
  { label: "Mobile Accessories", to: "/mobile", icon: Smartphone, color: "text-itouch-blue" },
  { label: "Latest Offers", to: "/offers", icon: Tag, color: "text-itouch-orange" },
];

const gamingPackages = [
  { title: "Quick Match", time: "30 min", text: "Fast FIFA, racing or shooting session." },
  { title: "Full Session", time: "1 hour", text: "Best pick for friends and multiplayer games." },
  { title: "Group Play", time: "Custom", text: "Plan longer sessions and group bookings." },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts()
      .then(({ data }) => setFeatured(data))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false));

    fetchActiveOffers()
      .then(({ data }) => setOffers(data.slice(0, 3)))
      .catch(() => setOffers([]));
  }, []);

  return (
    <div className="bg-itouch-bg">
      <HeroSection />

      <section className="mx-auto -mt-12 max-w-7xl px-4 lg:px-8">
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-itouch-surface/95 p-3 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ label, to, icon: Icon, color }) => (
            <Link
              key={label}
              to={to}
              className="group flex items-center justify-between rounded-xl bg-itouch-surface-2 px-4 py-4 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <Icon className={color} size={22} />
                <span className="font-display text-sm font-bold">{label}</span>
              </span>
              <ArrowRight className="text-itouch-white/30 transition group-hover:text-itouch-white" size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Shop by category"
          title="Everything customers visit i-Touch for"
          subtitle="Move quickly between sports gear, sportswear, PS5 gaming sessions, phones and accessories."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </section>

      <section className="bg-itouch-surface/60 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Featured products"
            title="Popular picks from the shop"
            subtitle="A quick look at highlighted products. Customers can open details or order directly through WhatsApp."
            link="/products"
            linkLabel="View all products"
          />
          <ProductGrid products={featured} loading={loadingFeatured} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-2xl border border-itouch-green/20 bg-itouch-surface lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80"
              alt="Console gaming setup"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-itouch-green">
                PS5 Gaming Zone
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Book your next session</h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <p className="max-w-2xl text-sm leading-7 text-itouch-white/65">
              Make the gaming section feel like a real destination: racing, multiplayer, shooting
              games and group sessions, all with fast WhatsApp booking.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {gamingPackages.map((pkg) => (
                <div key={pkg.title} className="rounded-xl border border-white/10 bg-itouch-bg p-4">
                  <p className="font-display text-xl font-bold text-itouch-green">{pkg.time}</p>
                  <h3 className="mt-2 font-display font-bold">{pkg.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-itouch-white/55">{pkg.text}</p>
                </div>
              ))}
            </div>
            <Link
              to="/gaming"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-itouch-green px-5 py-3 font-display font-bold text-black transition hover:shadow-glow-green"
            >
              Book PS5 Session <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-itouch-surface/60 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Latest deals"
            title="Offers worth checking before you order"
            subtitle="Show active promotions here so visitors have a reason to explore deeper."
            link="/offers"
            linkLabel="View offers"
          />
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <OfferBanner key={offer._id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-itouch-bg p-8 text-center">
              <ShoppingBag className="mx-auto text-itouch-orange" size={34} />
              <h3 className="mt-4 font-display text-xl font-bold">No active offers yet</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-itouch-white/60">
                Add offers from the admin panel and they will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Why customers choose us"
          title="Simple service, useful products, fast ordering"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-itouch-surface p-5">
              <ShieldCheck className="text-itouch-orange" size={28} />
              <h3 className="mt-4 font-display font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-itouch-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-itouch-orange/25 bg-gradient-to-r from-itouch-orange/15 via-itouch-surface to-itouch-blue/10 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-itouch-orange">
              Need help choosing?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">Chat with i-Touch on WhatsApp</h2>
            <p className="mt-2 text-sm text-itouch-white/60">
              Ask about product availability, prices, offers or PS5 booking times.
            </p>
          </div>
          <button
            onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-itouch-orange px-6 py-3 font-display font-bold text-black transition hover:shadow-glow"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
