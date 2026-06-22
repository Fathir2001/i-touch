import { useAuth } from "../hooks/useAuth";

const AdminHeader = ({ title }) => {
  const { admin } = useAuth();
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-itouch-bg px-6 py-4">
      <h1 className="font-display text-xl font-bold">{title}</h1>
      <div className="text-sm text-itouch-white/60">
        Welcome, <span className="text-itouch-white">{admin?.name || "Admin"}</span>
      </div>
    </header>
  );
};

export default AdminHeader;
