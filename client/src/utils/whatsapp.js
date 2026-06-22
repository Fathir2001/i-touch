const ADMIN_NUMBER = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || "94000000000";

export const buildProductOrderUrl = (product) => {
  const productLink = `${window.location.origin}/products/${product.slug}`;
  const message = `Hello i-Touch, I am interested in this product.

Product Name: ${product.name}
Price: Rs. ${product.price}
Category: ${product.category}
Product Link: ${productLink}

Please send me more details and availability.`;

  return `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const buildGamingBookingUrl = (booking) => {
  const message = `Hello i-Touch, I want to book a PS5 gaming session.

Name: ${booking.customerName}
Phone: ${booking.phone}
Game Type: ${booking.gameType}
Date: ${booking.preferredDate}
Time: ${booking.preferredTime}
Players: ${booking.numberOfPlayers}

Please confirm availability.`;

  return `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const buildGeneralWhatsAppUrl = (customMessage) => {
  const message =
    customMessage ||
    "Hello i-Touch, I would like to know more about your products and services.";
  return `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const buildOfferInquiryUrl = (offer) => {
  const message = `Hello i-Touch, I am interested in this offer.

Offer: ${offer.title}
Discount: ${offer.discountText}

Please share more details.`;
  return `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (url) => {
  window.open(url, "_blank");
};
