const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full bg-itouch-orange/20 blur-xl" />
      <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-itouch-surface-2 border-t-itouch-orange" />
    </div>
    <p className="text-sm text-itouch-white/60">{label}</p>
  </div>
);

export default LoadingSpinner;
