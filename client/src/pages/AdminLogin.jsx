import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-itouch-bg px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-itouch-surface p-8">
        <h1 className="text-center font-display text-2xl font-extrabold">
          <span className="text-itouch-orange">i</span>-Touch Admin
        </h1>
        <p className="mt-1 text-center text-sm text-itouch-white/50">Sign in to manage your shop</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-itouch-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-itouch-orange"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-itouch-white/40" />
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-itouch-bg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-itouch-orange"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-itouch-orange px-4 py-3 font-display font-bold text-black hover:shadow-glow disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
