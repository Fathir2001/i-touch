import { PackageOpen } from "lucide-react";

const EmptyState = ({ title = "Nothing here yet", subtitle = "", icon: Icon = PackageOpen }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-itouch-surface py-16 text-center">
    <Icon size={42} className="text-itouch-white/30" />
    <p className="font-display text-lg font-semibold text-itouch-white/80">{title}</p>
    {subtitle && <p className="max-w-sm text-sm text-itouch-white/50">{subtitle}</p>}
  </div>
);

export default EmptyState;
