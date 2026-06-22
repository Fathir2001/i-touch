import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { buildOfferInquiryUrl } from "../utils/whatsapp";

const OfferBanner = ({ offer }) => {
  const url = buildOfferInquiryUrl(offer);
  const validText = offer.endDate
    ? `Valid until ${new Date(offer.endDate).toLocaleDateString()}`
    : "Limited time offer";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-itouch-orange/30 bg-itouch-surface"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-itouch-surface-2">
        <img
          src={offer.image || "https://placehold.co/800x450?text=i-Touch+Offer"}
          alt={offer.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-itouch-orange px-3 py-1 text-xs font-bold text-black">
          <Tag size={12} /> {offer.discountText}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold">{offer.title}</h3>
        <p className="text-sm text-itouch-white/60">{offer.description}</p>
        <p className="text-xs text-itouch-white/40">{validText}</p>
        <WhatsAppButton url={url} label="Inquire on WhatsApp" full className="mt-2" />
      </div>
    </motion.div>
  );
};

export default OfferBanner;
