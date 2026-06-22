import { useEffect, useState } from "react";
import { Package, Tags, BadgePercent, Gamepad2, MessageSquare, Star } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchDashboardSummary } from "../services/resources";

const cards = [
  { key: "totalProducts", label: "Total Products", icon: Package, color: "text-itouch-orange" },
  { key: "totalCategories", label: "Total Categories", icon: Tags, color: "text-itouch-blue" },
  { key: "activeOffers", label: "Active Offers", icon: BadgePercent, color: "text-itouch-green" },
  { key: "newGamingBookings", label: "New Gaming Bookings", icon: Gamepad2, color: "text-itouch-orange" },
  { key: "contactMessages", label: "Contact Messages", icon: MessageSquare, color: "text-itouch-blue" },
  { key: "featuredProducts", label: "Featured Products", icon: Star, color: "text-itouch-green" },
];

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardSummary()
      .then(({ data }) => setSummary(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <div key={c.key} className="rounded-2xl border border-white/10 bg-itouch-surface p-5">
                <c.icon className={c.color} size={26} />
                <p className="mt-3 font-display text-3xl font-extrabold">{summary?.[c.key] ?? 0}</p>
                <p className="text-sm text-itouch-white/60">{c.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
