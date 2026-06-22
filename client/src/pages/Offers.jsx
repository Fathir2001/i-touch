import { useEffect, useState } from "react";
import { Gift, MessageCircle, Tag } from "lucide-react";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import OfferBanner from "../components/OfferBanner";
import PageHero from "../components/PageHero";
import { fetchActiveOffers } from "../services/resources";
import { buildGeneralWhatsAppUrl, openWhatsApp } from "../utils/whatsapp";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveOffers()
      .then(({ data }) => setOffers(data))
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-itouch-bg">
      <PageHero
        eyebrow="Current promotions"
        title="Latest Offers"
        subtitle="Check current deals before you order. Offers can cover sports gear, sportswear, mobile accessories, and gaming sessions."
        image="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="mx-auto -mt-10 max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-itouch-surface/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-3">
          {[
            ["Fresh deals", "Active offers appear here automatically.", Gift],
            ["WhatsApp orders", "Ask about offer availability instantly.", MessageCircle],
            ["Limited time", "Update promotions from the admin panel.", Tag],
          ].map(([title, text, Icon]) => (
            <div key={title} className="rounded-xl bg-itouch-bg p-4">
              <Icon className="text-itouch-orange" size={24} />
              <p className="mt-3 font-display font-bold">{title}</p>
              <p className="mt-1 text-sm leading-6 text-itouch-white/55">{text}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner label="Loading offers..." />
        ) : offers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-itouch-surface p-8 text-center">
            <EmptyState title="No active offers right now" subtitle="Check back soon for new deals!" />
            <button
              onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-itouch-orange px-5 py-3 font-display font-bold text-black transition hover:shadow-glow"
            >
              <MessageCircle size={18} /> Ask on WhatsApp
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferBanner key={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Offers;
