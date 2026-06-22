import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  BadgePercent,
  Gamepad2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/offers", label: "Offers", icon: BadgePercent },
  { to: "/admin/bookings", label: "Gaming Bookings", icon: Gamepad2 },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-white/10 bg-itouch-surface p-4">
      <div className="mb-6 px-2 font-display text-xl font-extrabold">
        <span className="text-itouch-orange">i</span>-Touch <span className="text-itouch-white/40 text-sm">Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-itouch-orange/15 text-itouch-orange" : "text-itouch-white/70 hover:bg-white/5"
              }`
            }
          >
            <l.icon size={18} /> {l.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          logout();
          navigate("/admin/login");
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
