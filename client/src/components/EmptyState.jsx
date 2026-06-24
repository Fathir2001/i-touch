import { PackageOpen } from "lucide-react";

const EmptyState = ({ title = "Nothing here yet", subtitle = "", icon: Icon = PackageOpen }) => (
  <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-itouch-surface/90 py-16 text-center shadow-2xl shadow-black/20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,26,0.16),transparent_35%)]" />
    <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-black/25">
      <Icon size={42} className="text-itouch-orange/70" />
    </div>
    <p className="font-display text-lg font-semibold text-itouch-white/80">{title}</p>
    {subtitle && <p className="max-w-sm text-sm text-itouch-white/50">{subtitle}</p>}
  </div>
);

export default EmptyState;
