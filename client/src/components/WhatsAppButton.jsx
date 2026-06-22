import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";

const WhatsAppButton = ({ url, label = "Order via WhatsApp", className = "", full = false }) => {
  return (
    <button
      onClick={() => openWhatsApp(url)}
      className={`flex items-center justify-center gap-2 rounded-xl bg-itouch-green/90 px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-itouch-green hover:shadow-glow-green active:scale-95 ${
        full ? "w-full" : ""
      } ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </button>
  );
};

export default WhatsAppButton;
