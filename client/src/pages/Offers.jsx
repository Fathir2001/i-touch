import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="relative overflow-hidden bg-itouch-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(255,106,26,0.12),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(0,194,255,0.08),transparent_26%)]" />
      <PageHero
        eyebrow="Current promotions"
        title="Latest Offers"
        subtitle="Check current deals before you order. Offers can cover sports gear, sportswear, mobile accessories, and gaming sessions."
        image="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1800&q=85"
      />

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-16 lg:px-8"
      >
        <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-3">
          {[
            ["Fresh deals", "Active offers appear here automatically.", Gift],
            ["WhatsApp orders", "Ask about offer availability instantly.", MessageCircle],
            ["Limited time", "Update promotions from the admin panel.", Tag],
          ].map(([title, text, Icon]) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-white/10 bg-itouch-bg/90 p-4 transition hover:border-itouch-orange/40 hover:shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-itouch-orange/10 transition group-hover:scale-110 group-hover:bg-itouch-orange">
                <Icon className="text-itouch-orange transition group-hover:text-black" size={24} />
              </div>
              <p className="mt-3 font-display font-bold">{title}</p>
              <p className="mt-1 text-sm leading-6 text-itouch-white/55">{text}</p>
            </motion.div>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner label="Loading offers..." />
        ) : offers.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-itouch-surface/90 p-8 text-center shadow-2xl">
            <EmptyState title="No active offers right now" subtitle="Check back soon for new deals!" />
            <button
              onClick={() => openWhatsApp(buildGeneralWhatsAppUrl())}
              className="shine-button mt-6 inline-flex items-center gap-2 rounded-xl bg-itouch-orange px-5 py-3 font-display font-bold text-black transition hover:-translate-y-1 hover:shadow-glow"
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
      </motion.section>
    </div>
  );
};

export default Offers;
