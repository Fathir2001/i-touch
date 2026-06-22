const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-itouch-surface-2 border-t-itouch-orange" />
    <p className="text-sm text-itouch-white/60">{label}</p>
  </div>
);

export default LoadingSpinner;
