import { useEffect, useState } from "react";
import OfferBanner from "../components/OfferBanner";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { fetchActiveOffers } from "../services/resources";

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
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold">Latest Offers</h1>
        <p className="mt-2 text-itouch-white/60">Don't miss out on our current promotions and deals.</p>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading offers..." />
      ) : offers.length === 0 ? (
        <EmptyState title="No active offers right now" subtitle="Check back soon for new deals!" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferBanner key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
