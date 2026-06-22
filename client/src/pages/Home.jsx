import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import OfferBanner from "../components/OfferBanner";
import ContactForm from "../components/ContactForm";
import { fetchFeaturedProducts, fetchActiveOffers } from "../services/resources";
import { featuredCategories, whyChooseUs } from "../data/staticData";

const SectionHeading = ({ title, subtitle, link, linkLabel }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-itouch-white/60">{subtitle}</p>}
    </div>
    {link && (
      <Link to={link} className="text-sm font-semibold text-itouch-orange hover:underline">
        {linkLabel} →
      </Link>
    )}
  </div>
);

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
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading title="Featured Categories" subtitle="Explore everything i-Touch has to offer" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          title="Popular Products"
          subtitle="Customer favorites across sports, gaming and mobile"
          link="/products"
          linkLabel="View All Products"
        />
        <ProductGrid products={featured} loading={loadingFeatured} />
      </section>

      {offers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeading
            title="Latest Offers"
            subtitle="Limited time deals — don't miss out"
            link="/offers"
            linkLabel="View All Offers"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferBanner key={offer._id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-itouch-surface py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="PS5 Gaming Zone"
            subtitle="Shooting • Multiplayer • Racing • Steering Wheel Mode"
            link="/gaming"
            linkLabel="Book a Session"
          />
          <div className="overflow-hidden rounded-2xl border border-itouch-green/30 bg-gradient-to-br from-itouch-green/10 via-itouch-bg to-itouch-blue/10 p-8 text-center">
            <p className="text-itouch-white/70">
              Step into our PS5 gaming zone — multiplayer battles, intense shooting games, FIFA
              showdowns, and immersive racing with our steering wheel rig.
            </p>
            <Link
              to="/gaming"
              className="mt-5 inline-block rounded-xl bg-itouch-green px-6 py-3 font-display font-bold text-black hover:shadow-glow-green"
            >
              Explore Gaming Zone
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading title="Why Choose i-Touch" subtitle="What makes us your go-to shop" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-itouch-surface p-5">
              <ShieldCheck className="text-itouch-orange" size={28} />
              <h3 className="mt-3 font-display font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-itouch-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading title="Contact & Location" subtitle="We'd love to hear from you" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ContactForm />
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-itouch-surface-2">
            <iframe
              title="i-Touch Location"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Colombo,Sri Lanka&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
